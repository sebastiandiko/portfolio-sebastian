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
          "aboutDescription": "Hola! 👋 Soy Sebas, Ingeniero en Sistemas de Información, y me gusta estar en el punto donde las ideas se convierten en proyectos reales. Me interesa la gestión de proyectos, la mejora de procesos y el uso estratégico de la inteligencia artificial para crear soluciones útiles, simples y con impacto. Me destaco por ser versátil, puedo entender tanto el negocio como la parte técnica, conectar equipos y ayudar a que las cosas avancen de verdad. ¿Te interesa hacer que las cosas funcionen? Charlemos...",
          "changeLanguageHint": "Adaptalo a tu idioma",
          "footerText": "© 2025 Sebastian Dikowiec. Todos los derechos reservados.",
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
          "aboutDescription": "Hi! 👋 I'm Sebas, an Information Systems Engineer, and I love being at the point where ideas turn into real projects. I'm interested in project management, process improvement, and the strategic use of artificial intelligence to create useful, simple, and impactful solutions. I stand out for my versatility; I can understand both the business and technical sides, connect teams, and really help things move forward. Interested in making things work? Let's chat...",
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
