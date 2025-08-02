// packages/backend/src/migrations/20250709120000-create-dogs-table.js

/** @param {import('node-pg-migrate').MigrationBuilder} pgm */
export async function up(pgm) {
  await pgm.createTable('dogs', {
    id: {
      type: 'uuid',
      primaryKey: true,
      default: pgm.func('gen_random_uuid()'),
    },
    name: { type: 'text', notNull: true },
    microchip_id: { type: 'varchar(20)', notNull: true, unique: true },
    breed: 'text',
    age: 'integer',
    owner_name: 'text',
    registered_at: { type: 'timestamp', default: pgm.func('current_timestamp') },
  });
}

export async function down(pgm) {
  await pgm.dropTable('dogs');
}
