// Dicionário de Traduções
const translations = {
    pt: {
        pageTitle: "Portfolio Backend | Oséias Farias",
        navHome: "Home",
        navAbout: "Sobre",
        navSkills: "Skills",
        navProjects: "Projetos",
        navExperience: "Experiência",
        navEducation: "Formação",
        navContact: "Contato",
        heroBadge: "Desenvolvedor Backend Full-Stack",
        heroTitle1: "",
        heroDescription: "Mestrando em Engenharia Elétrica pela UFABC, especializado em criar APIs robustas e escaláveis com Java, Python, Spring Boot e FastAPI. Apaixonado por transformar dados em soluções inteligentes que impulsionam negócios. Vamos construir algo incrível juntos?",
        heroBtnPrimary: "Vamos Conversar",
        heroBtnOutline: "Baixar CV",
        aboutTitle: "Sobre Mim",
        aboutSubtitle: "Conheça minha trajetória e paixão por tecnologia",
        aboutDescription: "Como Desenvolvedor Backend com foco em Java e Python, minha carreira é dedicada à criação de APIs REST robustas utilizando frameworks como Spring Boot e FastAPI. Tenho experiência em garantir a segurança de aplicações com Spring Security e em trabalhar com persistência de dados usando JPA, MySQL e PostgreSQL.<br><br>Minha formação no programa ONE - Oracle Next Education solidificou minhas habilidades práticas em integração de sistemas e na implementação e consumo de APIs. Além do desenvolvimento, sou um membro ativo do Comitê AlumniOne, onde contribuo com a criação de conteúdo sobre tecnologia para a newsletter da comunidade.",
        skillsTitle: "Habilidades Técnicas",
        skillsSubtitle: "Tecnologias e ferramentas que domino",
        projectsTitle: "Projetos em Destaque",
        projectsSubtitle: "Alguns dos meus trabalhos mais recentes",
        project1Title: "API RESTful FastAPI",
        project1Desc: "Sistema completo de gerenciamento com Python, FastAPI, SQLAlchemy e PostgreSQL. Alta performance e documentação automática.",
        project2Title: "AWS Lambda Serverless",
        project2Desc: "Aplicação serverless com Python, AWS Lambda, API Gateway e DynamoDB. Arquitetura escalável e econômica.",
        project3Title: "Catálogo de Livros",
        project3Desc: "Sistema de catálogo com integração de API externa, Spring Data JPA e relacionamentos complexos de banco de dados.",
        project4Title: "Hotel Alura",
        project4Desc: "Sistema de gerenciamento hoteleiro com Java Swing, MySQL e padrões de design MVC. Interface intuitiva e funcional.",
        project5Title: "Rede Social One Community",
        project5Desc: "Plataforma de rede social desenvolvida para a comunidade Oracle Next Education com funcionalidades completas.",
        project6Title: "Agente SDR com IA (OpenAI)",
        project6Desc: "Agente SDR automatizado com OpenAI e FastAPI (serverless). Utiliza React para o chat, Redis (Upstash) para sessões e integra com Cal.com e Pipefy.",
        project7Title: "API de Catálogo de Hotéis (Flask)",
        project7Desc: "API RESTful com Python e Flask para gerenciamento de catálogos e reservas de hotéis, usuários e sites. Utiliza Flask-RESTful e Flask-SQLAlchemy.",
        expTitle: "Experiência Profissional",
        expSubtitle: "Minha jornada no mercado de tecnologia",
        exp1Title: "Pesquisador de Mestrado",
        exp1Date: "abr 2025 - presente",
        exp1Desc: "Desenvolvimento em Python, Java e MATLAB para sistemas de controle com Antifragilidade Artificial, integrando simulação HIL, FPAA/FPGA e IA.",
        exp2Title: "Oficial de Manutenção",
        exp2Date: "dez 2024 - mar 2025",
        exp2Desc: "Supervisão de equipes de manutenção, elaboração de procedimentos, gestão de mudanças (MOC) e cotação de materiais via MRO.",
        exp3Title: "Estágio em Manutenção UHT",
        exp3Date: "set 2023 - mar 2024",
        exp3Desc: "Otimização de linhas de produção com análise de dados (Python, Pandas) para reduzir paradas e aumentar a eficiência operacional.",
        eduTitle: "Formação Acadêmica",
        eduSubtitle: "Minha jornada educacional reflete uma base sólida em engenharia e uma especialização crescente em computação e inteligência artificial.",
        edu1Title: "Mestrado em Engenharia Elétrica",
        edu1Date: "Previsão: 04/2025 a 04/2027",
        edu1Desc: "Área de Pesquisa: Atifragilidade Artificial. Cursos em FPGA, IA e Engenharia de Software.",
        edu2Title: "Mestrado em Computação Aplicada",
        edu2Date: "Previsão: 03/2025 a 03/2027",
        edu2Desc: "Ênfase em Inteligência Artificial, com pesquisa em Deep Learning aplicado a Veículos Elétricos.",
        edu3Title: "Bacharelado em Engenharia Elétrica",
        edu3Date: "03/2017 a 06/2024",
        edu3Desc: "Tese: Desenvolvimento de Protótipo e Gêmeo Digital para Laboratório Virtual de Sistemas Dinâmicos.",
        edu4Title: "Formação Backend Java",
        edu4Date: "01/2024 a 06/2024",
        edu4Desc: "Foco em APIs com Spring Boot, Java, Orientação a Objetos, JPA, Spring Security e SQL.",
        edu5Title: "Técnico em Eletrotécnica",
        edu5Date: "02/2012 a 12/2016",
        edu5Desc: "Cursos relevantes em programação de microcontroladores (Arduino, ESP32) com C/C++.",
        contactTitle: "Entre em Contato",
        contactSubtitle: "Vamos conversar sobre seu próximo projeto",
        formAutoresponse: "E-mail recebido, agradeço por entrar em contato. Retorno assim que possível.",
        formName: "Nome Completo",
        formNamePlaceholder: "Seu nome",
        formEmail: "E-mail",
        formEmailPlaceholder: "seu@email.com",
        formMessage: "Mensagem",
        formMessagePlaceholder: "Descreva seu projeto ou dúvida...",
        formBtn: "Enviar Mensagem",
        formBtnLoading: "Enviando...",
        contactLocation: "São Paulo, Brasil",
        footerCopyright: "© 2025 Oséias Farias. Todos os direitos reservados.",
        typedStrings: ["Desenvolvedor Backend", "Engenheiro de Dados", "Apaixonado por Java | Python"],
        formSuccess: "Mensagem enviada com sucesso! Entrarei em contato em breve.",
        formError: "Erro ao enviar mensagem. Tente novamente ou entre em contato diretamente por email."
    },
    en: {
        pageTitle: "Backend Portfolio | Oséias Farias",
        navHome: "Home",
        navAbout: "About",
        navSkills: "Skills",
        navProjects: "Projects",
        navExperience: "Experience",
        navEducation: "Education",
        navContact: "Contact",
        heroBadge: "Full-Stack Backend Developer",
        heroTitle1: "",
        heroDescription: "Master's student in Electrical Engineering at UFABC, specializing in creating robust and scalable APIs with Java, Python, Spring Boot, and FastAPI. Passionate about transforming data into smart solutions that drive business. Let's build something amazing together?",
        heroBtnPrimary: "Let's Talk",
        heroBtnOutline: "Download CV",
        aboutTitle: "About Me",
        aboutSubtitle: "Discover my journey and passion for technology",
        aboutDescription: "As a Backend Developer focused on Java and Python, my career is dedicated to creating robust REST APIs using frameworks like Spring Boot and FastAPI. I have experience in securing applications with Spring Security and working with data persistence using JPA, MySQL, and PostgreSQL.<br><br>My training in the ONE - Oracle Next Education program solidified my practical skills in systems integration and API implementation and consumption. Beyond development, I am an active member of the AlumniOne Committee, where I contribute technology content to the community newsletter.",
        skillsTitle: "Technical Skills",
        skillsSubtitle: "Technologies and tools I master",
        projectsTitle: "Featured Projects",
        projectsSubtitle: "Some of my most recent work",
        project1Title: "FastAPI RESTful API",
        project1Desc: "Complete management system with Python, FastAPI, SQLAlchemy, and PostgreSQL. High performance and automatic documentation.",
        project2Title: "AWS Lambda Serverless",
        project2Desc: "Serverless application with Python, AWS Lambda, API Gateway, and DynamoDB. Scalable and cost-effective architecture.",
        project3Title: "Book Catalog",
        project3Desc: "Catalog system with external API integration, Spring Data JPA, and complex database relationships.",
        project4Title: "Alura Hotel",
        project4Desc: "Hotel management system with Java Swing, MySQL, and MVC design patterns. Intuitive and functional interface.",
        project5Title: "One Community Social Network",
        project5Desc: "Social network platform developed for the Oracle Next Education community with full functionalities.",
        project6Title: "SDR Agent with AI (OpenAI)",
        project6Desc: "Automated SDR agent with OpenAI and FastAPI (serverless). Uses React for the chat, Redis (Upstash) for sessions, and integrates with Cal.com and Pipefy.",
        project7Title: "Hotel Catalog API (Flask)",
        project7Desc: "RESTful API with Python and Flask for managing hotel catalogs, reservations, users, and sites. Uses Flask-RESTful and Flask-SQLAlchemy.",
        expTitle: "Professional Experience",
        expSubtitle: "My journey in the technology market",
        exp1Title: "Master's Researcher",
        exp1Date: "Apr 2025 - Present",
        exp1Desc: "Development in Python, Java, and MATLAB for control systems with Artificial Antifragility, integrating HIL simulation, FPAA/FPGA, and AI.",
        exp2Title: "Maintenance Officer",
        exp2Date: "Dec 2024 - Mar 2025",
        exp2Desc: "Supervision of maintenance teams, procedure development, change management (MOC), and material procurement via MRO.",
        exp3Title: "UHT Maintenance Intern",
        exp3Date: "Sep 2023 - Mar 2024",
        exp3Desc: "Optimization of production lines with data analysis (Python, Pandas) to reduce downtime and increase operational efficiency.",
        eduTitle: "Academic Education",
        eduSubtitle: "My educational journey reflects a solid foundation in engineering and a growing specialization in computing and artificial intelligence.",
        edu1Title: "Master's in Electrical Engineering",
        edu1Date: "Expected: 04/2025 to 04/2027",
        edu1Desc: "Research Area: Artificial Antifragility. Courses in FPGA, AI, and Software Engineering.",
        edu2Title: "Master's in Applied Computing",
        edu2Date: "Expected: 03/2025 to 03/2027",
        edu2Desc: "Emphasis on Artificial Intelligence, with research in Deep Learning applied to Electric Vehicles.",
        edu3Title: "Bachelor's in Electrical Engineering",
        edu3Date: "03/2017 to 06/2024",
        edu3Desc: "Thesis: Development of a Prototype and Digital Twin for a Virtual Laboratory of Dynamic Systems.",
        edu4Title: "Backend Java Specialization",
        edu4Date: "01/2024 to 06/2024",
        edu4Desc: "Focus on APIs with Spring Boot, Java, Object-Oriented Programming, JPA, Spring Security, and SQL.",
        edu5Title: "Technical Degree in Electrotechnics",
        edu5Date: "02/2012 to 12/2016",
        edu5Desc: "Relevant courses in microcontroller programming (Arduino, ESP32) with C/C++.",
        contactTitle: "Get in Touch",
        contactSubtitle: "Let's talk about your next project",
        formAutoresponse: "Email received, thank you for contacting me. I will respond as soon as possible.",
        formName: "Full Name",
        formNamePlaceholder: "Your name",
        formEmail: "E-mail",
        formEmailPlaceholder: "your@email.com",
        formMessage: "Message",
        formMessagePlaceholder: "Describe your project or question...",
        formBtn: "Send Message",
        formBtnLoading: "Sending...",
        contactLocation: "São Paulo, Brazil",
        footerCopyright: "© 2025 Oséias Farias. All rights reserved.",
        typedStrings: ["Backend Developer", "Data Engineer", "Java | Python Enthusiast"],
        formSuccess: "Message sent successfully! I will get in touch soon.",
        formError: "Error sending message. Please try again or contact me directly by email."
    }
};

// Referência global para a instância do Typed.js
let typedInstance = null;

// Função para definir o idioma
function setLanguage(lang) {
    const translation = translations[lang];

    // Traduzir todos os elementos com 'data-key'
    document.querySelectorAll('[data-key]').forEach(element => {
        const key = element.getAttribute('data-key');
        if (translation[key]) {
            element.innerHTML = translation[key]; // Usar innerHTML para renderizar o <br>
        }
    });

    // Traduzir placeholders
    document.querySelectorAll('[data-placeholder-key]').forEach(element => {
        const key = element.getAttribute('data-placeholder-key');
        if (translation[key]) {
            element.setAttribute('placeholder', translation[key]);
        }
    });

    // Atualizar o 'lang' da tag <html>
    document.documentElement.lang = (lang === 'pt') ? 'pt-br' : 'en';

    // Atualizar o 'value' do autoresponse do formulário
    const autoresponseInput = document.querySelector('input[name="_autoresponse"]');
    if (autoresponseInput) {
        autoresponseInput.value = translation.formAutoresponse;
    }

    // ===== LÓGICA DO BOTÃO ATUALIZADA =====
    // Atualizar o texto e o data-atribute do botão de toggle
    const langToggle = document.getElementById('language-toggle');
    if (langToggle) {
        langToggle.textContent = lang.toUpperCase();
        langToggle.setAttribute('data-lang', lang);
    }
    // ======================================

    // Salvar preferência no localStorage
    localStorage.setItem('selectedLanguage', lang);

    // Reiniciar o Typed.js com as strings traduzidas
    // (Verifica se a função initTyped existe, ela está em main.js)
    if (typeof initTyped === 'function') {
        // Destruir a instância anterior, se existir
        if (typedInstance) {
            typedInstance.destroy();
        }
        // Criar a nova instância
        typedInstance = initTyped(translation.typedStrings);
    }
}

// Adicionar listeners aos botões
document.addEventListener('DOMContentLoaded', () => {
    
    // ===== LÓGICA DO LISTENER ATUALIZADA =====
    // Adiciona o listener ao novo botão de toggle
    const langToggle = document.getElementById('language-toggle');
    if (langToggle) {
        langToggle.addEventListener('click', () => {
            // Verifica o idioma atual pelo data-attribute
            const currentLang = langToggle.getAttribute('data-lang');
            // Define o novo idioma como o oposto
            const newLang = (currentLang === 'pt') ? 'en' : 'pt';
            setLanguage(newLang);
        });
    }
    // ==========================================
});