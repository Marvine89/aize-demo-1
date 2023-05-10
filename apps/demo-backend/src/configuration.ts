export default () => ({
  production: process.env.PRODUCTION,
  secret: process.env.SECRET,
  tokenExipireIn: process.env.TOKEN_EXPIRE_IN,
  database: {
    origin: process.env.ORIGIN,
    allowedHeaders: process.env.ALLOWED_HEADERS,
    methods: process.env.METHODS,
    preflightContinue: process.env.PREFLIGHT_CONTINUE,
    optionsSuccessStatus: process.env.ONPTIONS_SUCCESS_STATUS,
    credentials: process.env.CREDENTIALS
  }
});
