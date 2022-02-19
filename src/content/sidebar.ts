const sidebar = {
  name: {
    title: "Full Stack Senior Developer",
    name: "Cristian Boarna",
  },
  contact: {
    email: { value: "contact@crisboarna.com", icon: "far fa-envelope" },
    phone: { value: "+40 775 263 532", icon: "fas fa-phone" },
    website: { value: "crisboarna.com", icon: "fas fa-globe" },
    blog: { value: "crisboarna.com/blog", icon: "fas fa-rss" },
    linkedin: { value: "linkedin.com/in/crisboarna", icon: "fab fa-linkedin" },
    github: { value: "github.com/crisboarna", icon: "fab fa-github" },
    npm: { value: "npmjs.com/~crisboarna", icon: "fab fa-npm" },
    terraform: {
      value: "crisboarna.com/terraform",
      icon: "fas fa-cloud",
    },
  },
  certifications: {
    title: "Certifications",
    list: [
      {
        name: "AWS Certified Solutions Architect - Professional",
        icon: "fab fa-aws",
        description: "Amazon Web Services - 2021",
      },
      {
        name: "AWS Certified Big Data - Specialty Certification",
        icon: "fab fa-aws",
        description: "Amazon Web Services - 2021",
      },
      {
        name: "AWS Certified DevOps Engineer - Professional",
        icon: "fab fa-aws",
        description: "Amazon Web Services - 2021",
      },
      {
        name: "Kubernetes Certified Application Developer",
        icon: "fab fa-docker",
        description: "Linux Foundation - 2022(Pending)",
      },
      {
        name: "Corda Certified Blockchain Developer",
        icon: "fab fa-bitcoin",
        description: "R3 Corda - 2019",
      },
      {
        name: "Cambridge English: Proficiency",
        icon: "fal fa-university",
        description: "University of Cambridge - 2010",
      },
    ],
  },
  education: {
    title: "Education",
    list: [
      {
        icon: "fal fa-university",
        degree: "BSc Computer Science w/IE",
        school: "University of Manchester",
        date: "2011-2015",
        courses:
          "Distributed Computing, Computer Networks, Chip Multiprocessors, Cryptography & Network Security, Computer Vision, Advanced Graphics",
      },
    ],
  },
  skills: {
    title: "Skills",
    list: {
      languages: [
        "NodeJs",
        "Typescript",
        "Go",
        "Dart",
        "Rust",
        "Kotlin",
        "Python",
        "PySpark",
        "Java",
        "C#",
      ],
      databases: [
        "DynamoDB",
        "CosmosDB",
        "Cassandra",
        "PostgreSQL",
        "MySQL",
        "Redshift",
      ],
      clouds: ["AWS", "Azure", "Google Cloud(Firebase)"],
      iaC: ["AWS CDK", "CloudFormation", "Terraform", "ARM(Azure)"],
      configuration: ["HCL", "Helm", "Ansible", "Packer", "Chef"],
      frameworks: [
        "ReactJS",
        "Flutter",
        "Kafka",
        "Hadoop",
        "Akka",
        "GatsbyJS",
        "ExpressJS",
        "Spring",
        "OpenCV",
        "ReactNative",
      ],
      solutions: ["Docker", "Kubernetes", "ELK", "Electron", "MongoDB"],
    },
  },
  languages: {
    title: "Languages",
    list: [
      { name: "English", level: "Native" },
      { name: "Romanian", level: "Native" },
      { name: "French", level: "Beginner" },
    ],
  },
  interests: {
    title: "Interests",
    list: [
      {
        name: "Circuitry",
        description:
          "Design & implement DIY Smart Home. Completed TV Ambilight & Audio via Arduino",
      },
      {
        name: "Drones",
        description: "Building and flying in 1st person view of light drones",
      },
      {
        name: "Salsa",
        description: "Learning Salsa, Tango and Bachata for fun",
      },
      {
        name: "Kiteboarding",
        description:
          "Extreme sport with satisfying adrenaline punch during windy days",
      },
    ],
  },
};

export default sidebar;
