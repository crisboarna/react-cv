import { SidebarProps } from '../app/components/sidebar';

const sidebar: SidebarProps = {
  name: {
    name: 'Cristian Boarna',
    title: 'Full Stack Senior Developer',
  },
  contact: {
    email: { value: 'contact@crisboarna.com', icon: 'fas fa-envelope' },
    phone: { value: '+40 775 263 532', icon: 'fas fa-phone' },
    website: { value: 'crisboarna.com', icon: 'fas fa-globe' },
    blog: { value: 'blog.engineermindscape.com', icon: 'fas fa-rss' },
    linkedin: { value: 'linkedin.com/in/crisboarna', icon: 'fab fa-linkedin' },
    github: { value: 'github.com/crisboarna', icon: 'fab fa-github' },
  },
  certifications: {
    title: 'Certifications',
    list: [
      {
        name: 'AWS Certified Solutions Architect - Professional',
        icon: 'fab fa-aws',
        description: 'Amazon Web Services - 2021',
      },
      {
        name: 'AWS Certified Big Data - Specialty Certification',
        icon: 'fab fa-aws',
        description: 'Amazon Web Services - 2021',
      },
      {
        name: 'AWS Certified DevOps Engineer - Professional',
        icon: 'fab fa-aws',
        description: 'Amazon Web Services - 2021',
      },
      {
        name: 'Kubernetes Certified Application Developer',
        icon: 'fab fa-docker',
        description: 'Linux Foundation - 2023(Pending)',
      },
      {
        name: 'Corda Certified Blockchain Developer',
        icon: 'fab fa-bitcoin',
        description: 'R3 Corda - 2019',
      },
    ],
  },
  skills: {
    title: 'Skills',
    list: {
      languages: [
        'NodeJS',
        'Typescript',
        'Go',
        'Dart',
        'Python',
        'Java',
        'Kotlin',
        'Rust',
      ],
      frameworks: [
        'ReactJS',
        'Flutter',
        'Kafka',
        'Hadoop',
        'Akka',
        'GatsbyJS',
        'ExpressJS',
        'Spring',
      ],
      databases: [
        'MySQL',
        'PostgreSQL',
        'Cassandra',
        'DynamoDB',
        'CosmosDB',
        'MongoDB',
        'Redshift',
      ],
      clouds: ['AWS', 'Azure', 'Firebase'],
      iaC: ['AWS CDK', 'CloudFormation', 'Terraform', 'ARM(Azure)'],
      configuration: ['HCL', 'Helm', 'Ansible', 'Packer', 'Chef'],
      solutions: ['Docker', 'Kubernetes', 'ELK', 'Electron', 'ReactNative'],
    },
  },
  education: {
    title: 'Education',
    list: [
      {
        icon: 'fas fa-building-columns',
        degree: 'BSc Computer Science (Hons) with Industrial Experience',
        school: 'University of Manchester',
        date: '2011-2015',
        courses: [
          'Distributed Computing',
          'Computer Networks',
          'Chip Multiprocessors',
          'Cryptography & Network Security',
          'Computer Vision',
          'Advanced Graphics',
        ],
      },
    ],
  },
  languages: {
    title: 'Languages',
    list: [
      { name: 'English', level: 'Native - C2' },
      { name: 'Romanian', level: 'Native - C2' },
      { name: 'French', level: 'Beginner - A2' },
    ],
  },
  interests: {
    title: 'Interests',
    list: [
      {
        name: 'Circuitry',
        description:
          'Design & implement DIY Smart Home. Completed TV Ambilight & Audio via Arduino',
      },
      {
        name: 'Drones',
        description: 'Building and flying in 1st person view of light drones',
      },
      {
        name: 'Salsa',
        description: 'Learning Salsa, Tango and Bachata for fun',
      },
      {
        name: 'Kiteboarding',
        description:
          'Extreme sport with satisfying adrenaline punch during windy days',
      },
    ],
  },
};

export default sidebar;
