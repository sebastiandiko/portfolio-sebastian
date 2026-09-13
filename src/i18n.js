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
          "playVideo": "Reproducir video",
          "technologiesTitle": "Tecnologías que Utilizo",
          "experienceTitle": "Experiencia Laboral",
          "contactTitle": "Contacto",
          "contactSubtitle": "¿Tienes un proyecto en mente? ¡Hablemos!",
          "contactFormEmailLabel": "Tu email",
          "contactFormSubjectLabel": "Asunto",
          "contactFormMessageLabel": "Mensaje",
          "contactFormButton": "Contactemos",
          "contactFormSending": "Enviando...",
          "contactFormSuccess": "¡Mensaje enviado! Te voy a responder pronto.",
          "contactFormError": "No se pudo enviar el mensaje. Probá de nuevo o escribime directamente.",
          "aboutTitle": "Sobre Mí",
          "aboutDescription": "¡Hola! Soy Sebastian, <strong>Ingeniero en Sistemas de Información</strong> con una mirada que mezcla tecnología, gestión y producto. Antes de escribir código o armar un plan, me gusta entender bien el problema. ¿Cómo lo vive el usuario? ¿Dónde puede romperse algo? ¿Qué es lo que realmente hay que resolver? Esa misma curiosidad la aplico auditando calidad o coordinando un equipo.<br/><br/>Me gusta que las cosas pasen. Ordeno prioridades, acompaño cada etapa y no dejo que un proyecto se quede a mitad de camino, siempre con un enfoque <strong>ágil</strong> que prioriza que la solución funcione en la vida real.<br/><br/>Y sobre todo, me gusta conectar con clientes, con devs, con cualquiera que tenga una idea y no sepa bien cómo hacerla funcionar. ¿Tenés algo así en mente? Hablemos.",
          "changeLanguageHint": "Adaptalo a tu idioma",
          "footerText": "© 2025 Sebastian Dikowiec. Todos los derechos reservados.",
          "projectsTitle": "Mis Proyectos",
          "linkButton": "Enlace",
          "jobs": [
            {
              "jobTitle": "QA Analyst",
              "company": "Capgemini",
              "date": "Junio 2026 - Presente",
              "description": "Garantizo que lo que se construye funcione como se prometió. Diseño y ejecuto casos de prueba, detecto inconsistencias antes de que lleguen a producción y trabajo codo a codo con desarrollo para que el detalle que nadie ve sea, justamente, lo que hace que el producto se sienta sólido.",
              "link": "https://www.capgemini.com/ar-es/"
            },
            {
              "jobTitle": "Project Manager",
              "company": "Jett Labs",
              "date": "Marzo 2026 - Presente",
              "description": "Gestiono proyectos desde la idea del cliente hasta la última instancia de entrega. Trabajo con enfoque ágil: planifico, coordino y acompaño cada etapa para organizar al equipo, reducir fricciones y garantizar que el proyecto llegue en tiempo y forma con el resultado esperado.",
              "link": "https://www.jettlabs.xyz/es"
            },
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
              "title": "estebandiko.com",
              "description": "Sitio web profesional para el Dr. Esteban J. Dikowiec, Médico Psiquiatra y Psicoterapeuta. Especialista en terapia cognitivo-conductual (TCC), con atención presencial en Villa Ángela y consulta online. El sitio fue desarrollado para transmitir confianza y atraer nuevos pacientes."
            },
            {
              "title": "SFT Development",
              "description": "Empresa de software que formamos con mis 3 companeros: Lauta, Tobi y Sebas. Trabajamos en equipo para desarrollar soluciones de software a medida, desde landings y web apps hasta automatizaciones e integraciones, siempre con foco en resolver problemas reales."
            },
            {
              "title": "GetPass",
              "description": "Ticketera que facilita la compra y venta de entradas online. Desarrollamos una plataforma integral, rápida y segura diseñada para simplificar el acceso a tus eventos favoritos y potenciar el alcance de los organizadores."
            },
            {
              "title": "Vencemio",
              "description": "Mi proyecto final de carrera, hecho en conjunto con Mati, mi compañero. Desarrollamos una PWA en Flutter llamada Vencemio para que los establecimientos puedan vender a menor costo productos próximos a vencer, reduciendo desperdicio y aportando a la sociedad y al medio ambiente."
            },
            {
              "title": "ETL con Python y SQL: Integración y Transformación de Datos a Gran Escala",
              "description": "Implementé un pipeline ETL que extrae datos desde una API o un archivo CSV de gran tamaño, los procesa y transforma utilizando Pandas, y finalmente los carga en una base de datos PostgreSQL. La solución automatiza el flujo de datos, lo que resulta ideal para entornos de Big Data y análisis de información."
            },
            {
              "title": "Toqqen - Desarrollo Freelance de Apps y Webs",
              "description": "Toqqen fue uno de mis primeros proyectos: un emprendimiento freelance donde ofrecía desarrollar aplicaciones PWA y sitios web personalizados. Hoy ya no utilizo esa página, pero lo dejo como referencia de cómo arranqué."
            },
            
          ]
        }
      },
      en: {
        translation: {
          "title": "Sebastian Dikowiec",
          "subtitle": "Information Systems Engineer",
          "playVideo": "Play video",
          "technologiesTitle": "Technologies I Use",
          "experienceTitle": "Work Experience",
          "contactTitle": "Contact",
          "contactSubtitle": "Got a project in mind? Let's talk!",
          "contactFormEmailLabel": "Your email",
          "contactFormSubjectLabel": "Subject",
          "contactFormMessageLabel": "Message",
          "contactFormButton": "Let's talk",
          "contactFormSending": "Sending...",
          "contactFormSuccess": "Message sent! I'll get back to you soon.",
          "contactFormError": "Couldn't send the message. Try again or email me directly.",
          "aboutTitle": "About Me",
          "aboutDescription": "Hi! I'm Sebastian, an <strong>Information Systems Engineer</strong> with a perspective that blends technology, management, and product. Before writing code or putting together a plan, I like to really understand the problem. How does the user experience it? Where might something break? What actually needs solving? I bring that same curiosity to auditing quality or coordinating a team.<br/><br/>I like making things happen. I sort out priorities, support every stage, and don't let a project stall halfway through, always with an <strong>agile</strong> approach that puts real-world results first.<br/><br/>And above all, I like connecting with clients, with developers, with anyone who has an idea and isn't quite sure how to make it work. Got something like that in mind? Let's talk.",
          "changeLanguageHint": "Set your language",
          "footerText": "© 2025 Sebastián Dikowiec. All rights reserved.",
          "projectsTitle": "My Projects",
          "linkButton": "Link",
          "jobs": [
            {
              "jobTitle": "QA Analyst",
              "company": "Capgemini",
              "date": "June 2026 - Present",
              "description": "I make sure what gets built works as promised. I design and run test cases, catch inconsistencies before they reach production, and work closely with development so that the detail nobody sees is exactly what makes the product feel solid.",
              "link": "https://www.capgemini.com/ar-es/"
            },
            {
              "jobTitle": "Project Manager",
              "company": "Jett Labs",
              "date": "March 2026 - Present",
              "description": "I manage projects from the client's initial idea through final delivery. I take an agile approach—planning, coordinating, and supporting each stage to keep the team aligned, reduce friction, and make sure we ship on time with the expected outcome.",
              "link": "https://www.jettlabs.xyz/es"
            },
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
              "title": "estebandiko.com",
              "description": "Professional website for Dr. Esteban J. Dikowiec, Psychiatrist and Psychotherapist. Specialist in cognitive-behavioral therapy (CBT), with in-person consultations in Villa Ángela and online appointments. The site was built to convey trust and attract new patients."
            },
            {
              "title": "SFT Development",
              "description": "Software company we formed with my 3 teammates: Lauta, Tobi, and Sebas. We work as a team to build custom software solutions, from landing pages and web apps to automations and integrations, always focused on solving real business problems."
            },
            {
              "title": "GetPass",
              "description": "Ticketing platform that facilitates buying and selling tickets online. We developed a comprehensive, fast, and secure platform designed to simplify access to your favorite events and boost organizers' reach."
            },
            {
              "title": "Vencemio",
              "description": "My capstone project, built together with Mati, my teammate. We developed a Flutter PWA called Vencemio so businesses can sell near-expiry products at a lower price, cutting waste while helping people and the environment."
            },
            {
              "title": "ETL with Python and SQL: Large Scale Data Integration and Transformation",
              "description": "I implemented an ETL pipeline that extracts data from an API or large CSV files, processes and transforms it using Pandas, and finally loads it into a PostgreSQL database. The solution automates data flow, making it ideal for Big Data and information analysis environments."
            },
            {
              "title": "Toqqen - Freelance App & Web Development",
              "description": "Toqqen was one of my first projects: a freelance initiative where I offered custom PWA and website development. I no longer use that site, but I keep it here as a snapshot of how I got started."
            },
            
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
