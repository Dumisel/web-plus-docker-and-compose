export default () => ({
  port: 3000,
  db: {
    type: 'postgres',
    host: process.env.POSTGRES_HOST,
    port: 5432,
    database: process.env.POSTGRES_DB,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRESIN
  }
});
