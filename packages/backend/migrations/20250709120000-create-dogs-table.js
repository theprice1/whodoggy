/** @param {import('node-pg-migrate').MigrationBuilder} pgm */
export async function up(pgm) {
  await pgm.createTable('dogs', {
    id: {
      type: 'uuid',
      primaryKey: true,
      default: pgm.func('gen_random_uuid()'),
    },
    name: {
      type: 'text',
      notNull: true,
    },
    microchip_id: {
      type: 'varchar(20)',
      notNull: true,
      unique: true,
    },
    breed: {
      type: 'text',
    },
    age: {
      type: 'integer',
    },
    owner_name: {
      type: 'text',
    },
    registered_at: {
      type: 'timestamp',
      default: pgm.func('current_timestamp'),
    },
  });
}

/** @param {import('node-pg-migrate').MigrationBuilder} pgm */
export async function down(pgm) {
  await pgm.dropTable('dogs');
}
