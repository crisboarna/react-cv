const sidebar = {
  name: {
    title: 'Full Stack Cloud Developer',
    name: 'Cristian Boarna'
  },
  contact: {
    email: { value: 'cristian.boarna@gmail.com', icon: 'far fa-envelope'},
    phone: { value: '+44 778 4333 706', icon: 'fas fa-phone'},
    website: { value: 'crisboarna.com', icon: 'fas fa-globe'},
    linkedin: { value: 'linkedin.com/crisboarna', icon: 'fab fa-linkedin'},
    github: { value: 'github.com/crisboarna', icon: 'fab fa-github'},
    npm: { value: 'npmjs.com/~crisboarna', icon: 'fab fa-npm'}
  },
  certifications: {
    title: 'Certifications',
    list: [
      {name:'AWS Certified Solutions Architect', icon: 'fab fa-aws', description:'Amazon Web Services - 2018'},
      {name: 'Cambridge English: Proficiency', icon: 'fab fa-aws', description: 'University of Cambridge - 2010'}
      ]
  },
  education: {
    title: 'Education',
    list: [
      {
        degree: 'BSc Computer Science w/IE',
        school: 'University of Manchester',
        date: '2011-2015',
        courses: 'Distributed Computing, Computer Networks, Chip Multiprocessors, Cryptography & Network Security, Computer Vision, Advanced Graphics'},
    ]
  },
  skills:{
    title: 'Skills',
    list: {
      languages: [
        'Java',
        'Javascript',
        'C#',
        'Python',
        'HTML5',
        'Bash',
        'Scala'
      ],
      frameworks: [
        'NodeJS',
        'ReactJS',
        'Spring',
        'Akka',
        'OpenCV',
        'ReactNative'
      ],
      solutions: [
        'AWS',
        'Docker',
        'ELK',
        'Git',
        'Kubernetes',
        'Electron',
        'MongoDB'
      ]
    }
  },
  languages: {
    title: 'Languages',
    list: [{ name: 'English', level: 'Native' }, { name: 'Romanian', level: 'Native' }, { name: 'French', level: 'Beginner' }]
  },
  interests: {
    title: 'Interests',
    list: [
      {
        name:'Circuitry',
        description:'Design and implement DIY Smart Home. Completed TV Ambilight & room audio via Arduino'
      },
      {
        name: 'Drones',
        description: 'Building and flying in 1st person view of light drones'
      },
      {
        name: 'Salsa',
        description:'Learning Salsa & Tango for gracefulness of the art of dancing'
      }]
  }
};

export default sidebar;
