export const environment = {
  production: false,
  secret: 'a77778b8-0002-47f7-a881-6eece83b0011',
  tokenExipireIn: 3600,
  cors: {
    origin: '*',
    allowedHeaders: '*',
    methods: 'GET,PUT,POST,OPTIONS',
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: false
  }
};
