// 20250709120000-create-dogs-table.cjs

/** @param {import('node-pg-migrate').MigrationBuilder} pgm */
exports.up = async (pgm) => {
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
};

exports.down = async (pgm) => {
  await pgm.dropTable('dogs');
};
