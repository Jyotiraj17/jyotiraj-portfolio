/**
 * Verified Default Portfolio Data for Jyotiraj Panda
 * Sourced directly from Jyotiraj_Panda_Portfolio_Details.md
 */

const defaultData = {
  profile: {
    name: "Jyotiraj Panda",
    roleTitles: [
      "Full Stack Developer",
      "AI / ML Enthusiast",
      "Data Science & Analytics Developer"
    ],
    heroTagline: "Building scalable web platforms, accessible AI tools, and predictive data pipelines.",
    summary: "Computer Science & Engineering student at NIST University with a strong foundation in full-stack web development, machine learning, and data analytics. Experienced in building responsive interfaces, RESTful backends, and Firebase/SQL-backed data solutions with hands-on industrial internship experience at Tata Steel SEZ and AiRobosoft.",
    location: "Bakilikona, Odisha, India",
    phone: "+91 9938231922",
    email: "jyotirajpanda17@gmail.com",
    linkedin: "https://linkedin.com/in/jyotiraj-panda-17a9bb36a",
    github: "https://github.com/jyotiraj17",
    resumeUrl: "assets/resume.pdf",
    photo: "assets/images/profilephoto.jpeg",
    stats: {
      projectsCompleted: "5+",
      internships: "3",
      certifications: "5",
      currentCgpa: "7.91"
    }
  },

  education: [
    {
      institution: "NIST University",
      degree: "Bachelor of Technology in Computer Science and Engineering",
      duration: "2023 – 2027",
      score: "CGPA: 7.91",
      location: "Berhampur, Odisha",
      coursework: [
        "Data Science",
        "Data Visualization",
        "Front-end Development",
        "Data Structures & Algorithms",
        "Machine Learning",
        "DBMS",
        "Operating Systems"
      ]
    },
    {
      institution: "Science Higher Secondary School",
      degree: "Higher Secondary (Class 12) — Science",
      duration: "2021 – 2023",
      score: "Percentage: 72.5%",
      location: "Hinjilicut, Odisha",
      coursework: ["Physics", "Chemistry", "Mathematics", "Biology"]
    },
    {
      institution: "Saraswati Sishu Vidya Mandir",
      degree: "Secondary School (Class 10)",
      duration: "2021",
      score: "Percentage: 83.1%",
      location: "Hinjilicut, Odisha",
      coursework: ["General Sciences", "Mathematics", "Language Studies"]
    }
  ],

  experience: [
    {
      id: "tssez",
      organization: "Tata Steel Special Economic Zone (TSSEZ)",
      role: "Software Development Intern",
      duration: "May 2026 – June 2026",
      location: "Bhubaneswar, Odisha",
      type: "Industrial Internship",
      description: "Architected and developed a full-stack Vendor Pass Management System for the TSSEZ security division. Automated the vendor entry permit lifecycle with secure authentication, pass generation, full-text search, company-wise filtering, and real-time pass expiry tracking.",
      technologies: ["HTML", "CSS", "JavaScript", "Firebase Auth", "Cloud Firestore"]
    },
    {
      id: "airobo",
      organization: "AiRobosoft",
      role: "Full Stack Development Intern",
      duration: "May 2026 – June 2026",
      location: "Remote — Bengaluru, Karnataka",
      type: "Internship Training",
      description: "Received intensive hands-on full-stack development experience building responsive web user interfaces in React, state management, REST API integration, and Firebase/SQL database operations.",
      technologies: ["React.js", "JavaScript", "HTML5", "CSS3", "Firebase", "SQL"]
    },
    {
      id: "nist-intern",
      organization: "NIST University",
      role: "Data Science & Data Analysis Intern",
      duration: "May 2025 – June 2025",
      location: "Berhampur, Odisha",
      type: "Research Internship",
      description: "Conducted Exploratory Data Analysis (EDA), automated data cleaning routines, feature engineering (encoding, scaling, selection), correlation matrices, and anomaly identification for predictive machine learning models.",
      technologies: ["Python", "Pandas", "NumPy", "Matplotlib", "scikit-learn"]
    }
  ],

  skills: [
    {
      category: "languages",
      title: "Programming Languages",
      items: ["Python", "JavaScript (ES6+)", "Java", "C", "SQL", "HTML5 / CSS3"]
    },
    {
      category: "web",
      title: "Web Development",
      items: ["React.js", "Node.js", "Express.js", "RESTful API Design", "JWT Authentication", "WCAG / Web Accessibility"]
    },
    {
      category: "dataScience",
      title: "Data Science & ML",
      items: ["Pandas", "NumPy", "Matplotlib & Seaborn", "scikit-learn", "Exploratory Data Analysis", "Feature Engineering"]
    },
    {
      category: "databases",
      title: "Databases & Cloud",
      items: ["MongoDB & Mongoose", "MySQL", "Firebase Firestore"]
    },
    {
      category: "tools",
      title: "Developer Tools",
      items: ["Git & GitHub", "VS Code", "Jupyter Notebook", "Postman", "Firebase Suite"]
    }
  ],

  projects: [
    {
      id: "hostel-mgmt",
      title: "Hostel Management System",
      category: "fullstack",
      icon: "🏢",
      description: "A comprehensive full-stack role-based hostel management platform tailored for university administrative control, warden oversight, and student living operations.",
      features: [
        "Role-based authorization (Admin, Warden, Student)",
        "Automated room allocation & vacancy tracking",
        "Digital leave request & approval workflow",
        "Complaint ticketing system with status alerts",
        "Hostel-wide broadcast announcements",
        "Student & staff profile management",
        "Secure RESTful APIs with JWT"
      ],
      technologies: ["Node.js", "Express.js", "MongoDB", "Mongoose", "JWT Auth", "REST APIs"],
      githubUrl: "https://github.com/jyotiraj17",
      liveUrl: "#"
    },
    {
      id: "biziq",
      title: "BizIQ — Smart Data Visualization and Analytics",
      category: "datascience",
      icon: "📊",
      description: "A Python Flask-powered data analytics and automated business intelligence platform that ingests raw tabular datasets and generates instant statistical charts and narrative insights.",
      features: [
        "Drag-and-drop CSV & Excel dataset parsing",
        "Automated missing value handling & data cleaning",
        "Comprehensive column analysis & distribution metrics",
        "Dynamic chart generation (bar, scatter, heatmap, line)",
        "Custom visualization builder",
        "Automated analytical narrative summary generator",
        "Trend and outlier detection"
      ],
      technologies: ["Python", "Flask", "Pandas", "NumPy", "Matplotlib", "Seaborn"],
      githubUrl: "https://github.com/jyotiraj17",
      liveUrl: "#"
    },
    {
      id: "lawpro",
      title: "LawPro — WCAG-Compliant AI Legal Assistant",
      category: "ai",
      icon: "⚖️",
      description: "A research-grade AI-powered legal assistant designed to synthesize complex constitutional law guidance from natural language case queries, engineered to strict WCAG 2.1 accessibility standards.",
      features: [
        "Constitutional statute guidance from plain case descriptions",
        "Strict WCAG 2.1 AA compliant semantic HTML layout",
        "Full keyboard navigation & screen-reader compatibility",
        "Lighthouse 100 accessibility audit score",
        "Instant contextual citation retrieval",
        "High-contrast reading modes"
      ],
      technologies: ["HTML5", "CSS3", "JavaScript", "AI Integration", "WCAG 2.1", "Lighthouse"],
      githubUrl: "https://github.com/jyotiraj17",
      liveUrl: "#"
    },
    {
      id: "tssez-vendor",
      title: "TSSEZ Vendor Pass Management System",
      category: "fullstack",
      icon: "🛡️",
      description: "A secure digital gate-pass system developed for the Tata Steel Special Economic Zone security operations team to digitize vendor entry, audit trails, and physical asset verification.",
      features: [
        "Role-based Firebase Authentication for security personnel",
        "Real-time pass generation with custom validity windows",
        "Search & instant filtering across thousands of records",
        "Company-wise vendor directory and activity logs",
        "Automated expiry tracking with color alerts",
        "Admin-controlled secure deletion and archiving"
      ],
      technologies: ["HTML5", "CSS3", "JavaScript", "Firebase Auth", "Cloud Firestore"],
      githubUrl: "https://github.com/jyotiraj17",
      liveUrl: "#"
    },
    {
      id: "aadhaar-analytics",
      title: "Aadhaar Data Analysis & Population Prediction",
      category: "datascience",
      icon: "📈",
      description: "A deep-dive data analytics and machine learning forecasting model built for the UIDAI Data Hackathon to predict demographic enrollment growth across Indian regional clusters.",
      features: [
        "Preprocessing and cleaning of high-volume public enrollment datasets",
        "Demographic pattern and age-cohort clustering",
        "Regional state-by-state trend mapping",
        "Linear and polynomial regression forecasting models",
        "Correlation analysis of enrollment penetration vs population growth",
        "Interactive exploratory visualizations"
      ],
      technologies: ["Python", "Pandas", "scikit-learn", "Matplotlib", "Jupyter"],
      githubUrl: "https://github.com/jyotiraj17",
      liveUrl: "#"
    }
  ],

  certifications: [
    {
      name: "Getting Started with Artificial Intelligence",
      issuer: "IBM SkillsBuild",
      year: "2026",
      badge: "AI",
      url: "https://www.credly.com/badges/5d138ad1-2bac-423e-a5ed-0494aa17cecb"
    },
    {
      name: "MLOps Fundamentals: Building, Deploying, and Scaling AI Solutions",
      issuer: "Specialized Industry Certification",
      year: "2025",
      badge: "AI/ML"
    },
    {
      name: "Tata GenAI Powered Data Analytics",
      issuer: "Tata Group",
      year: "2025",
      badge: "Generative AI"
    },
    {
      name: "Tata ESG — Environmental, Social, and Governance",
      issuer: "Tata Group",
      year: "2025",
      badge: "Governance"
    },
    {
      name: "Data Analytics Job Simulation",
      issuer: "Deloitte",
      year: "2025",
      badge: "Analytics"
    },
    {
      name: "TCS iON Career Edge — Young Professional",
      issuer: "TCS iON",
      year: "2024",
      badge: "Professional"
    }
  ]
};

module.exports = defaultData;
