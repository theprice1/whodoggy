import pgPromise from 'pg-promise';

const pgp = pgPromise();

export const db = pgp({
  host: 'localhost',
  port: 5432,
  database: 'whodoggy',
  user: 'your_username',
  password: 'your_password',
});
