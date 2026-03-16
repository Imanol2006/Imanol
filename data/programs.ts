export type Program = {
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  eyebrow: string;
  image: string;
  href: string;
  ctaLabel: string;
  audience: string;
  duration: string;
  highlight: string;
  details: string[];
};

export const programs: Program[] = [
  {
    slug: "dinotracks",
    title: "DinoTracks Tours & Field Trips",
    shortTitle: "DinoTracks",
    description: "Step into a living prehistoric classroom with guided tours, field lessons, and fossil-rich storytelling near El Paso.",
    eyebrow: "Featured Experience",
    image: "https://images.unsplash.com/photo-1518152006812-edab29b069ac?auto=format&fit=crop&w=1400&q=80",
    href: "/programs/dinotracks",
    ctaLabel: "Book a Tour",
    audience: "Families, schools, field researchers",
    duration: "Half-day and full-day experiences",
    highlight: "Walk among 98 million year old footprints with expert-led interpretation and place-based science learning.",
    details: [
      "On-site guided tours through the trackways",
      "Curriculum-aligned field trip planning for teachers",
      "Interpretive science stations focused on geology and paleontology"
    ]
  },
  {
    slug: "teacher-pd",
    title: "Teacher Professional Development",
    shortTitle: "Teacher PD",
    description: "Empower educators with hands-on STEAM strategies, classroom-ready resources, and culturally rooted science instruction.",
    eyebrow: "Educator Growth",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1400&q=80",
    href: "/programs/teacher-pd",
    ctaLabel: "Learn More",
    audience: "K-12 educators and district teams",
    duration: "Single-session and multi-week cohorts",
    highlight: "Workshop tracks blend inquiry design, engineering thinking, and bilingual community engagement.",
    details: [
      "Workshop facilitation by science education specialists",
      "Standards-aligned lesson planning sessions",
      "Coaching support for classroom implementation"
    ]
  },
  {
    slug: "summer-camps",
    title: "Summer Camps",
    shortTitle: "Summer Camps",
    description: "Immersive camp adventures where students build, test, explore, and create through science, technology, engineering, art, and math.",
    eyebrow: "Seasonal Learning",
    image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1400&q=80",
    href: "/programs/summer-camps",
    ctaLabel: "Learn More",
    audience: "Elementary through high school students",
    duration: "Weeklong and themed camp series",
    highlight: "Campers rotate through maker labs, outdoor investigations, and creative problem-solving challenges.",
    details: [
      "Age-banded cohorts for tailored learning",
      "Project-based learning showcases",
      "Flexible programming for families and partner sites"
    ]
  },
  {
    slug: "birthday-parties",
    title: "Birthday Parties",
    shortTitle: "Birthday Parties",
    description: "Celebrate with high-energy science demos, hands-on experiments, and unforgettable STEAM party experiences.",
    eyebrow: "Celebrations",
    image: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?auto=format&fit=crop&w=1400&q=80",
    href: "/programs/birthday-parties",
    ctaLabel: "Learn More",
    audience: "Children, families, community groups",
    duration: "Custom event packages",
    highlight: "Private experiences combine playful spectacle with real scientific discovery.",
    details: [
      "Interactive experiment menus for different age groups",
      "Add-on options for themes and take-home activities",
      "Facilitator-led experiences that keep guests engaged"
    ]
  },
  {
    slug: "science-fair",
    title: "Sun Country Regional Science & Engineering Fair",
    shortTitle: "Science Fair",
    description: "A regional platform for student innovators to showcase research, engineering prototypes, and scientific thinking.",
    eyebrow: "Research Showcase",
    image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=1400&q=80",
    href: "/programs/science-fair",
    ctaLabel: "Learn More",
    audience: "Middle and high school researchers",
    duration: "Annual competition cycle",
    highlight: "From mentorship to judging-day logistics, INSIGHTS helps young scientists move from curiosity to presentation.",
    details: [
      "Student support resources and timeline guidance",
      "Volunteer and sponsor engagement opportunities",
      "Regional celebration of youth-led research"
    ]
  },
  {
    slug: "women-who-rocket",
    title: "Women Who ROCKet",
    shortTitle: "Women Who ROCKet",
    description: "A bold leadership and STEM inspiration program connecting girls and young women with role models, mentors, and aerospace imagination.",
    eyebrow: "Equity in STEM",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1400&q=80",
    href: "/programs/women-who-rocket",
    ctaLabel: "Learn More",
    audience: "Girls, teens, mentors, STEM advocates",
    duration: "Event series and cohort activations",
    highlight: "Programs center confidence-building, representation, and future-facing STEAM pathways.",
    details: [
      "Mentor panels and interactive career sessions",
      "Hands-on engineering and design activities",
      "Community-building experiences for future innovators"
    ]
  },
  {
    slug: "pop-ups",
    title: "Pop-Ups & Mobile STEAM Experiences",
    shortTitle: "Pop-Ups",
    description: "Bring science wherever your community gathers with mobile activations designed for festivals, schools, libraries, and neighborhood events.",
    eyebrow: "Community Reach",
    image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1400&q=80",
    href: "/programs/pop-ups",
    ctaLabel: "Learn More",
    audience: "Community partners, schools, family audiences",
    duration: "Single-day and recurring deployments",
    highlight: "Flexible, scalable experiences keep access at the center while delivering tactile, high-energy learning.",
    details: [
      "Portable activity stations and demos",
      "Custom packages for neighborhood outreach",
      "Bilingual facilitation and adaptable footprint"
    ]
  },
  {
    slug: "school-services",
    title: "Other School Services",
    shortTitle: "School Services",
    description: "Custom school partnerships spanning assemblies, maker days, curriculum support, and special science engagement opportunities.",
    eyebrow: "Custom Partnerships",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1400&q=80",
    href: "/programs/school-services",
    ctaLabel: "Learn More",
    audience: "Schools, districts, after-school programs",
    duration: "Flexible formats based on need",
    highlight: "INSIGHTS collaborates with schools to shape programs that fit local goals, age groups, and scheduling realities.",
    details: [
      "Assemblies, enrichment days, and campus events",
      "Tailored support for schoolwide STEAM goals",
      "Planning partnership from concept through delivery"
    ]
  }
];

export const featuredProgram = programs[0];

export const sponsorLogos = [
  "Borderland Innovation Fund",
  "El Paso Community Labs",
  "Frontera Futures",
  "STEM Access Alliance",
  "Desert Research Network",
  "Paso del Norte Partners"
];
