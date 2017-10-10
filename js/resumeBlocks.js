const resumeFig = {};

resumeFig.experience = [
  {
    title: 'Mentor',
    company: 'Dev Bootcamp',
    bullets: [
      'Help others learn new programming concepts and tech stacks.',
      'Pair program with students to build a more solid foundation for their own learning.',
      'Lead lectures on OOP and a few core concepts of Javascript.'
    ],
    start: 'May 2017',
    end: 'Current'
  }
];

resumeFig.volunteering = [
  {
    title: 'Volunteer Instructor',
    company: 'Living Works',
    bullets: [
      'Help 4-6th graders in CPS  understand the basics of HTML and CSS.',
      "Teach children about computer science before someone tells them that it's only for certain kinds of people."
    ],
    start: 'Oct 2017',
    end: 'Current'
  },
  {
    title: 'Volunteer Instructor',
    company: 'CodeNow',
    bullets: [
      'Taught highschool student the basics of HTML, CSS, jQuery, and Ruby on Rails basics.',
      'Paired with students in groups of 4-6 to strengthen communication skills.'
    ],
    start: 'Jun 2017',
    end: 'Sep 2017'
  }
];

resumeFig.projects = [
  {
    link: 'https://github.com/karl-thomas/automatic-blog',
    title: 'Automatic-blog',
    start: 'Jul 2017',
    end: 'Current',
    description:
      'This blog will write itself using APIs of websites and applications I use most, such as Github, Spotify, and Twitter.',
    bullets: [
      'Ruby on Rails framework  with MongoDB for the back end',
      'Served to a Node front end with React and D3'
    ]
  },
  {
    link: 'https://github.com/karl-thomas/WITNESS-ME',
    title: 'Witness Me',
    start: 'Apr 2017',
    end: 'Apr 2017',
    description:
      'Witness Me allows users to challenge each other to various friendly bets. To make things interesting, bets can range from $1 to $10. A witness must be present to determine the winner. The winner receives the pot of money placed in the initial bet. ',
    bullets: [
      'Challenges initiated and confirmed in real time using a web socket "handshake"',
      'Ruby on Rails, JavaScript, Redis, Postgresql, Dwolla API, Twillio API, Amazon Web Services, Heroku'
    ]
  }
];

export default resumeFig;
