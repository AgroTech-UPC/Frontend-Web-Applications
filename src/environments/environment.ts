
export const environment = {
  production: false,
  firebaseConfig : {
    apiKey: "AIzaSyDkROrKEzexzriGwyg94vvj76NjPqewV9E",
    authDomain: "agroconnect-demo.firebaseapp.com",
    projectId: "agroconnect-demo",
    storageBucket: "agroconnect-demo.appspot.com",
    messagingSenderId: "981172916098",
    appId: "1:981172916098:web:1b8a0e8e722615fe7a499b"
  },
    baseURL: 'https://web-services-18bk.onrender.com/api/v1',

    //urls for the different endpoints
    userURL: '/users',
    authenticationURL: '/authentication',
    advisorURL: '/advisors',
    breederURL: '/breeders',
    resourceURL: '/resources',
    appointmentURL: '/appointments',
    expenseURL: '/expenses',
    notificationURL: '/notifications',
    publicationURL: '/publications',
    animalURL: '/animals',
    cageURL: '/cages',
    reviewURL: '/reviews',
    availableDateURL: '/available-dates'
}
