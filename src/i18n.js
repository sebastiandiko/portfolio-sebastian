import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      es: {
        translation: {
          "title": "Sebastian Dikowiec",
          "subtitle": "Ingeniero en Sistemas de Información",
          "technologiesTitle": "Tecnologías que Utilizo",
          "experienceTitle": "Experiencia Laboral",
          "contactTitle": "Contacto",
          "emailLabel": "Email",
          "phoneLabel": "Teléfono",
          "downloadCV": "Descargar CV",
          "aboutTitle": "Sobre Mí",
          "aboutDescription": "Soy Ingeniero en Sistemas de Información con una sólida visión orientada a la gestión de proyectos (Project Management) y a la aplicación estratégica de la Inteligencia Artificial. Mi principal valor diferencial es mi versatilidad: disfruto tanto orquestando equipos y optimizando procesos complejos, como inmerso en el análisis de datos y la arquitectura técnica. Me apasiona construir el puente entre los requerimientos de negocio y las soluciones tecnológicas, garantizando escalabilidad, innovación y un impacto real en cada proyecto.",
          "changeLanguageHint": "Adaptalo a tu idioma",
          "footerText": "© 2025 Sebastián Dikowiec. Todos los derechos reservados.",
          "projectsTitle": "Mis Proyectos",
          "linkButton": "Enlace",
          "jobs": [
            {
              "jobTitle": "Desarrollador de Software",
              "company": "DROGUERÍA JUFEC S.A",
              "description": "Desarrollé software interno con PHP, Laravel y SQL Server en entornos Ubuntu, automatizando tareas con Bash."
            },
            {
              "jobTitle": "Soporte de Aplicación",
              "company": "CALIFICADAS",
              "description": "Mantenimiento y soporte de la app con Angular, TypeScript y SQL Server. Metodología Scrumban. Actualmente trabajo aquí."
            },
            {
              "jobTitle": "Desarrollador Freelance",
              "company": "Proyectos Independientes",
              "description": "Desarrollo de apps con React y Flutter, análisis de datos con SQL. Enfocado en soluciones personalizadas para clientes."
            }
          ],
          "projects": [
            {
              "title": "ETL con Python y SQL: Integración y Transformación de Datos a Gran Escala",
              "description": "Implementé un pipeline ETL que extrae datos desde una API o un archivo CSV de gran tamaño, los procesa y transforma utilizando Pandas, y finalmente los carga en una base de datos PostgreSQL. La solución automatiza el flujo de datos, lo que resulta ideal para entornos de Big Data y análisis de información."
            },
            {
              "title": "Toqqen - Desarrollo Freelance de Apps y Webs",
              "description": "Toqqen es un emprendimiento freelance donde ofrezco desarrollar aplicaciones PWA y sitios web personalizados para negocios, empresas, emprendedores, etc."
            }
          ]
        }
      },
      en: {
        translation: {
          "title": "Sebastian Dikowiec",
          "subtitle": "Information Systems Engineer",
          "technologiesTitle": "Technologies I Use",
          "experienceTitle": "Work Experience",
          "contactTitle": "Contact",
          "emailLabel": "Email",
          "phoneLabel": "Phone",
          "downloadCV": "Download CV",
          "aboutTitle": "About Me",
          "aboutDescription": "I am an Information Systems Engineer with a strong focus on Project Management and the strategic application of Artificial Intelligence. My distinct core value is versatility: I thrive whether I'm orchestrating teams and streamlining complex workflows, or diving deep into data analysis and technical architecture. I am passionate about bridging the gap between business objectives and technological solutions, ensuring scalability, innovation, and measurable impact in every project I undertake.",
          "changeLanguageHint": "Set your language",
          "footerText": "© 2025 Sebastián Dikowiec. All rights reserved.",
          "projectsTitle": "My Projects",
          "linkButton": "Link",
          "jobs": [
            {
              "jobTitle": "Software Developer",
              "company": "JUFEC DRUGSTORE S.A",
              "description": "Developed internal software using PHP, Laravel, and SQL Server on Ubuntu environments, automating tasks with Bash."
            },
            {
              "jobTitle": "Application Support",
              "company": "CALIFICADAS",
              "description": "Maintenance and support of the app using Angular, TypeScript, and SQL Server. Scrumban methodology. Currently working here."
            },
            {
              "jobTitle": "Freelance Developer",
              "company": "Independent Projects",
              "description": "Developed applications using React and Flutter, data analysis with SQL. Focused on customized solutions for clients."
            }
          ],
          "projects": [
            {
              "title": "ETL with Python and SQL: Large Scale Data Integration and Transformation",
              "description": "I implemented an ETL pipeline that extracts data from an API or large CSV files, processes and transforms it using Pandas, and finally loads it into a PostgreSQL database. The solution automates data flow, making it ideal for Big Data and information analysis environments."
            },
            {
              "title": "Toqqen - Freelance App & Web Development",
              "description": "Toqqen is a freelance initiative where I offer custom PWA app and website development for businesses, companies, entrepreneurs, and more."
            }
          ]
        }
      }
    },
    lng: "es",
    fallbackLng: "es",

    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
