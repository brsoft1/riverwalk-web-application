interface AuthConfiguration {
    clientID: string,
    domain: string,
    callbackURL: string
}

export const myConfig: AuthConfiguration = {
    clientID: '09H58kBu9nTVarQZNEaHGqFUi4Np6MtF',
    domain: 'wunoinc.auth0.com',
    // You may need to change this!
    callbackURL: 'http://localhost:3000/dashboard/'
};