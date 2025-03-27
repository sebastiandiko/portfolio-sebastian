import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      es: {
        translation: {
          "title": "Sebastián Dikowiec",
          "subtitle": "Ingeniero en Sistemas de Información",
          "technologiesTitle": "Tecnologías que Utilizo",
          "experienceTitle": "Experiencia Laboral",
          "contactTitle": "Contacto",
          "emailLabel": "Email",
          "phoneLabel": "Teléfono",
          "downloadCV": "Descargar CV",
          "aboutTitle": "Sobre Mí",
          "aboutDescription": "Soy Ingeniero en Sistemas de Información con experiencia en desarrollo web y análisis de datos. Apasionado por la innovación y el aprendizaje continuo, me especializo en crear soluciones eficientes y escalables. Disfruto resolver problemas, optimizar procesos y trabajar con tecnologías modernas para aportar valor en cada proyecto.",
          "changeLanguageHint": "Adaptalo a tu idioma",
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
          ]
        }
      },
      en: {
        translation: {
          "title": "Sebastián Dikowiec",
          "subtitle": "Information Systems Engineer",
          "technologiesTitle": "Technologies I Use",
          "experienceTitle": "Work Experience",
          "contactTitle": "Contact",
          "emailLabel": "Email",
          "phoneLabel": "Phone",
          "downloadCV": "Download CV",
          "aboutTitle": "About Me",
          "aboutDescription": "I'm an Information Systems Engineer with experience in web development and data analysis. Passionate about innovation and continuous learning, I specialize in creating efficient and scalable solutions. I enjoy solving problems, optimizing processes, and working with modern technologies to deliver value in each project.",
          "changeLanguageHint": "Set your language",
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