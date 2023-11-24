export default () => ({
  otp_secret: process.env.OTP_TOKEN_SECRET,
  refresh_secret: process.env.REFRESH_TOKEN_SECRET,
  refresh_expiresIn: process.env.REFRESH_TOKEN_EXPIRESIN,
  access_secret: process.env.ACCESS_TOKEN_SECRET,
  access_expiresIn: process.env.ACCESS_TOKEN_EXPIRESIN,
  google_client_id: process.env.GOOGLE_CLIENT_ID,
  google_client_secret: process.env.GOOGLE_SECRET,
  mailgun_api_key: process.env.MAILGUN_API_KEY,
  redis_host: process.env.REDIS_HOST,
  redis_port: process.env.REDIS_PORT,
  redis_url: process.env.REDIS_URL,
  http: {
    host: process.env.HTTP_HOST || 'localhost',
    port: parseInt(process.env.HTTP_PORT, 10) || 3000,
  },
  database: {
    dev: {
      username: process.env.HOST_USER,
      password: process.env.HOST_PASSWORD,
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
      db: process.env.DATABASE_NAME || 'smooth_transact_db',
    },
  },
});
