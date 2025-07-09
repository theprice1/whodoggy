/* eslint-env node */

exports.up = (pgm) => {
  pgm.createTable('dogs', {
    id: { type: 'serial', primaryKey: true },
    microchip_id: { type: 'varchar(255)', notNull: true, unique: true },
    name: { type: 'varchar(255)', notNull: true },
    breed: { type: 'varchar(255)' },
    owner_name: { type: 'varchar(255)' },
    created_at: { type: 'timestamp', default: pgm.func('current_timestamp'), notNull: true },
  });
};

exports.down = (pgm) => {
  pgm.dropTable('dogs');
};
