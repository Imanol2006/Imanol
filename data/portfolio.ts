export const profile = {
  name: "Imanol Galvan",
  initials: "IG",
  role: "Computer science, AI, and entrepreneurship",
  location: "El Paso, Texas",
  phone: "(915) 630-3282",
  email: "igalvan6@miners.utep.edu",
  availability:
    "Open to internships, startup opportunities, founder-led teams, freelance web work, and ambitious collaborators building useful technology.",
  primaryCta: "Start the conversation",
  hero: {
    eyebrow: "Personal flagship portfolio",
    title: "Building software, AI, and entrepreneurial momentum through repeated action.",
    subtitle:
      "Computer science student, builder, mentor, and early-stage entrepreneur at UTEP, growing through projects, startup ecosystems, technical communities, public-facing leadership, and real execution.",
    stats: [
      { label: "Education", value: "UTEP Computer Science" },
      { label: "Scholar", value: "NSF S-STEM" },
      { label: "GPA", value: "3.86 / 4.0" }
    ]
  },
  education: {
    school: "The University of Texas at El Paso",
    degree: "B.S. in Computer Science",
    minor: "Entrepreneurship",
    graduation: "Expected May 2029"
  }
};

export const navItems = [
  { id: "hero", label: "Overview" },
  { id: "identity", label: "Identity" },
  { id: "projects", label: "Projects" },
  { id: "journey", label: "Journey" },
  { id: "capabilities", label: "Capabilities" },
  { id: "vision", label: "Vision" },
  { id: "contact", label: "Contact" }
];

export const identityMoments = [
  "I build at the intersection of software engineering, artificial intelligence, entrepreneurship, and human-centered technology, but the deeper pattern is simpler: I move first and learn fast.",
  "A lot of my growth has come from showing up before I feel fully ready, pitching ideas, joining ecosystems, mentoring students, facilitating workshops, and stepping into rooms where I know I will be forced to grow.",
  "I care about technology that helps people learn, build confidence, discover opportunities, and move forward with more clarity, especially students, young builders, and people still figuring out what they are capable of."
];

export const featuredProjects = [
  {
    title: "STAR",
    category: "AI College Companion",
    tagline:
      "An AI-powered platform designed to help college students navigate academic life with more structure, clarity, and direction.",
    description:
      "Built as founder and technical lead, STAR combines AI-generated lesson planning, task scheduling, opportunity discovery, and personalized study support into a single student-centered product. It grew through pitch competitions, founder programs, and repeated iteration rather than staying as just a classroom idea.",
    stack: ["React", "Vite", "JavaScript", "OpenAI API", "CSS", "Context API", "localStorage"],
    role: "Founder and technical lead",
    impact:
      "Won 1st place and a $1000 prize at the Tacos & Tech-ila audience pitch competition sponsored by Microsoft and Nusenda, and helped define my direction as a student founder.",
    accents: ["Students", "AI", "Execution"]
  },
  {
    title: "Black Box",
    category: "AI Acting Practice Platform",
    tagline:
      "A digital acting studio built to help performers rehearse, reflect, and improve when practicing alone.",
    description:
      "Black Box is the current build focus: an AI-powered platform for scene analysis, script breakdown, guided rehearsal, performance recording, AI feedback, and measurable progress tracking. It brings together my interests in software, AI, storytelling, and performance into a product with a clear human problem behind it.",
    stack: ["React", "Vite", "Tailwind", "OpenAI APIs", "MediaPipe", "OpenCV", "Supabase or PostgreSQL"],
    role: "Founder, product direction, full-stack and AI planning",
    impact:
      "Transforms solo acting practice into a structured feedback loop with room for computer vision, performance analysis, and long-term creative technology potential.",
    accents: ["Performance", "Feedback", "Vision"]
  },
  {
    title: "AI Book Boss",
    category: "Hackathon Project",
    tagline:
      "An AI tool that generates curated K-5 book collections and lesson plans for immersive learning environments.",
    description:
      "Built during the Borderland AI Hackathon, the platform uses retrieval, embeddings, and generative AI to help educators quickly create relevant reading collections and companion learning materials. The project was designed around practical classroom use, not just technical novelty.",
    stack: ["Streamlit", "LangChain", "FAISS", "MiniLM embeddings", "OpenAI API"],
    role: "Hackathon builder",
    impact:
      "Won 1st place in the Immersive Learning Track and the Innovator Award, earning recognition from Microsoft, Scholastic, and the STTE Foundation.",
    accents: ["Learning", "Curation", "Impact"]
  },
  {
    title: "Bloomberg Labs",
    category: "Systems and Infrastructure Experience",
    tagline:
      "Hands-on engineering work spanning full-stack application flow and distributed messaging systems.",
    description:
      "Worked with Bloomberg engineers across two technical lab experiences, contributing to a full-stack news feed system in 2025 and a RabbitMQ-based producer-consumer lab in 2026 focused on routing, acknowledgements, debugging, and containerized execution. These experiences pushed my understanding beyond application code into systems behavior.",
    stack: ["React", "Flask", "Redis", "Docker", "Python", "RabbitMQ"],
    role: "Participant and systems builder",
    impact:
      "Deepened real-world understanding of scalable systems, backend optimization, messaging infrastructure, and debugging across distributed environments.",
    accents: ["Scale", "Messaging", "Systems"]
  }
];

export const journey = [
  {
    year: "2026 - Now",
    title: "Leadership through visibility",
    description:
      "Serving as a STEAM Intern at Insights Science Discovery, a mentor with GDG on Campus: UTEP, a Technical Officer and professional development leader in ColorStack at UTEP, and a UTEP Undergraduate Fellow. This stage is defined by helping other students become more visible, more prepared, and more confident while continuing to build my own direction in public.",
    note: "INSIGHTS, GDG on Campus, ColorStack, UTEP Undergraduate Fellows"
  },
  {
    year: "2025 - 2026",
    title: "Systems, logistics, and experience design",
    description:
      "Expanded from software into operations and systems thinking through Bloomberg Tech Lab, Dell Tech Academy, and the Disney College Program. These experiences sharpened how I think about reliability, logistics, service, storytelling, and what it means to design an experience that people can actually feel.",
    note: "Bloomberg, Dell Technologies, Walt Disney World"
  },
  {
    year: "2025",
    title: "Startup ecosystem immersion",
    description:
      "Worked inside Pioneers 21 Business Incubator while participating in Studio G, Tech Frontier, Mike Loya entrepreneurship programming, Dell case challenges, and local founder events. This is where entrepreneurship stopped feeling motivational and started becoming practical: market research, pitch prep, founder resources, pricing, sales thinking, and repeated exposure to people actually building.",
    note: "Pioneers 21, Studio G, Tech Frontier, Mike Loya Center"
  },
  {
    year: "2025",
    title: "Pitching and proving ideas",
    description:
      "Built traction around student-focused AI ideas through STAR, Borderland AI Hackathon, the P21 VMS Pitch Challenge, and Tacos & Tech-ila. Pitching repeatedly taught me that ideas become stronger when they are tested in front of real people, under real constraints, with real feedback.",
    note: "STAR, AI Book Boss, STTE, P21 Pitch Challenge"
  },
  {
    year: "2024 - 2026",
    title: "Service, support, and community trust",
    description:
      "Built trust by solving real problems for students, faculty, and community programs through UTEP technology support, MiniTec coordination, STTE volunteering, FOSS logistics leadership, and outreach work centered on confidence, access, and learning. A lot of my philosophy comes from this: people remember whether you showed up.",
    note: "UTEP, MiniTec, STTE, FOSS Club"
  }
];

export const capabilityGroups = [
  {
    title: "Software engineering",
    description:
      "Full-stack applications with a growing focus on scalable architecture, systems behavior, and products that solve real user problems.",
    items: ["Python", "Java", "JavaScript", "React", "Flask", "APIs", "Docker"]
  },
  {
    title: "AI and emerging tech",
    description:
      "Applied AI tools, retrieval workflows, prompt systems, and product ideas built around usefulness rather than hype.",
    items: ["OpenAI API", "LangChain", "FAISS", "MiniLM embeddings", "Prompt workflows", "AI product thinking"]
  },
  {
    title: "Design and storytelling",
    description:
      "Using product design, communication, and narrative thinking to make software feel clear, motivating, memorable, and human.",
    items: ["Product design", "Human-centered software", "Interface thinking", "Storytelling", "User confidence"]
  },
  {
    title: "Leadership and communication",
    description:
      "Leadership shaped by mentorship, theater, workshops, student organizations, public-facing roles, and repeated experience presenting ideas.",
    items: ["Mentorship", "Workshops", "Presentation", "Team coordination", "Stage presence", "Professional development"]
  },
  {
    title: "Entrepreneurship",
    description:
      "A builder mindset shaped by incubators, accelerators, founder conversations, local startup ecosystems, and repeated pitch experience.",
    items: ["Startup building", "Market research", "Pricing strategy", "Sales funnels", "Grant writing", "Opportunity discovery"]
  },
  {
    title: "Community and momentum",
    description:
      "Showing up repeatedly across student organizations, service work, sports, creative projects, and the El Paso innovation community.",
    items: ["ColorStack", "GDG on Campus", "MiniTec", "FOSS Club", "Soccer captaincy", "DJing"]
  }
];

export const philosophyHighlights = [
  "Try before you feel ready.",
  "Initiative matters more than permission.",
  "Learning happens through building.",
  "Consistency compounds over time.",
  "The process matters as much as the outcome.",
  "Not yet is still progress.",
  "Why not move before the timing feels perfect?"
];

export const philosophyManifesto = [
  "I believe that life rewards movement. Most people wait for certainty before they begin, but readiness usually does not appear before action. People become ready by trying, learning, adjusting, and continuing forward.",
  "A belief that has stayed with me for years is that we are capable of doing more than we initially think. I never saw that as pressure. I saw it as responsibility. If I have the chance to learn something, build something, or step into a bigger room, I should take it.",
  "Because of that, I approach life as experimentation. I build projects, join communities, pitch ideas, mentor others, and place myself in environments where growth can happen. Some things work, many things do not, but every attempt creates information. That information helps you adapt, pivot, and keep moving.",
  "What people call luck is often just repeated action becoming visible. When someone keeps showing up, connecting, and trying, opportunities start to appear. The point is not arriving fully formed. The point is becoming the person capable of building what comes next."
];

export const messageAndImpact = [
  {
    title: "Message",
    body:
      "You do not need permission to begin. You do not need the perfect plan, the perfect timing, or complete confidence before you start. If something genuinely matters to you, build it, test it, learn from it, and keep going."
  },
  {
    title: "Impact",
    body:
      "I want to encourage students, young builders, and creators to explore their potential earlier and with more courage. Through technology, entrepreneurship, and community, I want to build tools and environments that help people discover opportunities they might not have seen otherwise."
  }
];

export const socialLinks = [
  { label: "Email", href: "mailto:igalvan6@miners.utep.edu" },
  { label: "Phone", href: "tel:+19156303282" },
  { label: "GitHub", href: "https://github.com/Imanol2006/Imanol" }
];
