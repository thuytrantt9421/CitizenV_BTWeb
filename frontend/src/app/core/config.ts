interface Config {
    [key: string]: string;
    auth: 'session' | 'token';
  }

  // Session auth needs to use the same origin anyway
  export const config: Config = {
    apiUrl: 'localhost:10000/api',
    adminUrl: '/dashboard',
    authUrl: '/auth/login',
    auth: 'session'
  };

  export const auth0 = {
    url: 'https://dev-5qi53ez9.eu.auth0.com/v2',
    clientId: '3GGnK7fa8QXii04i1EBsmVKNvgChLvr4',
    returnUrl: 'http://localhost:8080'
  };
