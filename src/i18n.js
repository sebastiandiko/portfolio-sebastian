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
              "jobTitle": "Co-fundador",
              "company": "SFT DEVELOPMENT",
              "date": "Diciembre 2025 - Presente",
              "description": "Desarrollo y gestiono proyectos TI.",
              "link": "https://sftdevelopment.com/"
            },
            {
              "jobTitle": "Soporte Técnico y Desarrollador",
              "company": "Calificadas SRL",
              "date": "Septiembre 2024 - Marzo 2026",
              "description": "Brindé soporte técnico a los usuarios y participé del desarrollo y mantenimiento de una PWA, utilizando Angular y C#.",
              "link": "https://calificadas.com/"
            },
            {
              "jobTitle": "Desarrollador de Integraciones e IA",
              "company": "Dotscom Agency",
              "date": "Junio 2025 - Noviembre 2025",
              "description": "Implementé integraciones de diversas plataformas en Kommo CRM, automaticé flujos con n8n y desarrollé chatbots de IA con n8n, OpenAI, Gemini, etc.",
              "link": "https://dotscomagency.com/"
            },
            {
              "jobTitle": "Adscripto",
              "company": "Universidad de la Cuenca del Plata",
              "date": "Marzo 2025 - Julio 2025",
              "description": "Di clases de diversos temas de desarrollo de producto como adscripto en la cátedra 'Introducción a la informática'.",
              "link": "https://www.ucp.edu.ar/"
            },
            {
              "jobTitle": "Desarrollador Web",
              "company": "JUFEC S.A",
              "date": "Julio 2023 - Agosto 2024",
              "description": "Desarrollé aplicaciones web con PHP (Laravel), desarrollé consultas e integraciones con SQL. Participé en la gestión de proyectos con un enfoque de ingeniería de software.",
              "link": "https://www.jufecsa.com/"
            }
          ],
          "projects": [
            {
              "title": "GetPass",
              "description": "Ticketera que facilita la compra y venta de entradas online. Desarrollamos una plataforma integral, rápida y segura diseñada para simplificar el acceso a tus eventos favoritos y potenciar el alcance de los organizadores."
            },
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
              "jobTitle": "Co-founder",
              "company": "SFT DEVELOPMENT",
              "date": "December 2025 - Present",
              "description": "Develop and manage IT projects.",
              "link": "https://sftdevelopment.com/"
            },
            {
              "jobTitle": "Technical Support and Developer",
              "company": "Calificadas SRL",
              "date": "September 2024 - March 2026",
              "description": "Provided technical support to users and participated in the development and maintenance of a PWA, using Angular and C#.",
              "link": "https://calificadas.com/"
            },
            {
              "jobTitle": "Integration and AI Developer",
              "company": "Dotscom Agency",
              "date": "June 2025 - November 2025",
              "description": "Implemented integrations of various platforms into Kommo CRM, automated workflows with n8n, and developed AI chatbots with n8n, OpenAI, Gemini, etc.",
              "link": "https://dotscomagency.com/"
            },
            {
              "jobTitle": "Teaching Assistant",
              "company": "Universidad de la Cuenca del Plata",
              "date": "March 2025 - July 2025",
              "description": "Taught various topics on product development as a teaching assistant for the 'Introduction to Computer Science' course.",
              "link": "https://www.ucp.edu.ar/"
            },
            {
              "jobTitle": "Web Developer",
              "company": "JUFEC S.A",
              "date": "July 2023 - August 2024",
              "description": "Developed web applications with PHP (Laravel), developed queries and integrations with SQL. Participated in project management with a software engineering approach.",
              "link": "https://www.jufecsa.com/"
            }
          ],
          "projects": [
            {
              "title": "GetPass",
              "description": "Ticketing platform that facilitates buying and selling tickets online. We developed a comprehensive, fast, and secure platform designed to simplify access to your favorite events and boost organizers' reach."
            },
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
