/* eslint-env node */

module.exports = {
  databaseUrl:
    process.env.DATABASE_URL ||
    'postgres://postgres:yourpassword@localhost:5432/whodoggy',
  migrationsTable: 'pgmigrations',
  dir: 'migrations',
  migrationFileExtension: '.js', // <-- ADD THIS LINE
};
