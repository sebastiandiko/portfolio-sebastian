/*
  Pre-render del build para SEO.

  La app es una SPA: el HTML original está vacío (<div id="root"></div>) y los
  crawlers que no ejecutan JavaScript (la mayoría de los de IA) no ven nada.
  Este script abre el build en un Chrome headless, espera a que React pinte la
  página y guarda ese HTML final en build/index.html. Al cargar, React
  vuelve a renderizar encima como siempre.

  Si Chrome no está disponible (por ejemplo en un hosting sin Chromium), avisa
  y deja el build intacto: nunca rompe el deploy.
*/
const http = require('http');
const fs = require('fs');
const path = require('path');

const BUILD_DIR = path.join(__dirname, '..', 'build');
const TYPES = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css',
  '.json': 'application/json', '.png': 'image/png', '.jpg': 'image/jpeg', '.webp': 'image/webp',
  '.svg': 'image/svg+xml', '.ico': 'image/x-icon', '.mp4': 'video/mp4', '.txt': 'text/plain',
  '.xml': 'application/xml', '.woff2': 'font/woff2', '.pdf': 'application/pdf',
};

const serve = () =>
  new Promise((resolve) => {
    const server = http.createServer((req, res) => {
      const urlPath = decodeURIComponent(req.url.split('?')[0]);
      let file = path.join(BUILD_DIR, urlPath);
      if (!file.startsWith(BUILD_DIR) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) {
        file = path.join(BUILD_DIR, 'index.html');
      }
      res.writeHead(200, { 'Content-Type': TYPES[path.extname(file)] || 'application/octet-stream' });
      fs.createReadStream(file).pipe(res);
    });
    server.listen(0, '127.0.0.1', () => resolve(server));
  });

(async () => {
  // En Vercel (Linux sin librerías de Chrome) se usa un Chromium empaquetado
  // para serverless; en local se usa el Chrome que descarga puppeteer.
  let puppeteer;
  let launchOptions = { headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox'] };
  try {
    if (process.env.VERCEL || process.env.CI) {
      const chromium = (await import('@sparticuz/chromium')).default;
      puppeteer = require('puppeteer-core');
      launchOptions = {
        headless: 'shell',
        args: chromium.args,
        executablePath: await chromium.executablePath(),
      };
    } else {
      puppeteer = require('puppeteer');
    }
  } catch (e) {
    console.warn('[prerender] no hay navegador disponible: se omite el pre-render.', e.message);
    return;
  }

  const server = await serve();
  const { port } = server.address();
  let browser;
  try {
    browser = await puppeteer.launch(launchOptions);
    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900 });
    // El fetch de la fuente de Google no debe bloquear el snapshot si no hay red.
    await page.goto(`http://127.0.0.1:${port}/`, { waitUntil: 'networkidle2', timeout: 60000 });
    await page.waitForFunction(
      () => document.querySelector('#root h1') && document.querySelector('#services h3'),
      { timeout: 20000 }
    );
    await new Promise((r) => setTimeout(r, 800));

    let html = await page.content();
    // Estado efímero que no debe quedar en el HTML estático.
    html = html.replace(/<canvas[^>]*><\/canvas>/g, '');
    html = html.replace(/<html([^>]*?) class="lenis[^"]*"/, '<html$1');
    if (!html.includes('Sebastian Dikowiec') || html.length < 5000) {
      throw new Error('El HTML generado parece incompleto.');
    }
    fs.writeFileSync(path.join(BUILD_DIR, 'index.html'), '<!DOCTYPE html>' + html.replace(/^<!DOCTYPE html>/i, ''));
    console.log(`[prerender] OK: build/index.html (${(html.length / 1024).toFixed(1)} KB)`);
  } catch (err) {
    console.warn('[prerender] No se pudo generar el pre-render, el build queda como estaba:', err.message);
  } finally {
    if (browser) await browser.close();
    server.close();
  }
})();
