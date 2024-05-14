
export const environment = {
  production: false,
    // The base URL for the AgroConnectAPI
<<<<<<< HEAD
    baseURL: 'https://my-json-server.typicode.com/salvadoorssalinas/api-1', //users, advisors, breeders, resources
    baseURL2: 'https://my-json-server.typicode.com/salvadoorssalinas/api-2', //appointments, expenses, notifications, publications
    baseURL3: 'https://my-json-server.typicode.com/salvadoorssalinas/api-3' //animals, cages, reviews, available_dates
=======
    baseURL: 'http://localhost:3000',

    //urls for the different endpoints
    userURL: '/users/',
    advisorURL: '/advisors/',
    breederURL: '/breeders/',
    resourceURL: '/resources/',
    appointmentURL: '/appointments/',
    expenseURL: '/expenses/',
    notificationURL: '/notifications/',
    publicationURL: '/publications/',
    animalURL: '/animals/',
    cageURL: '/cages/',
    reviewURL: '/reviews/',
    availableDateURL: '/available_dates/'
>>>>>>> feature/publication-view
}
