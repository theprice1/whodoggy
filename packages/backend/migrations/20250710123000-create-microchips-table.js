/** @param {import('node-pg-migrate').MigrationBuilder} pgm */
export async function up(pgm) {
  await pgm.createTable('microchips', {
    id: {
      type: 'uuid',
      primaryKey: true,
      default: pgm.func('gen_random_uuid()'),
    },
    chip_number: {
      type: 'varchar(50)',
      notNull: true,
      unique: true,
    },
    dog_id: {
      type: 'uuid',
      references: '"dogs"',
      onDelete: 'cascade',
      notNull: true,
    },
    registered_at: {
      type: 'timestamp',
      default: pgm.func('current_timestamp'),
    },
  });
}

export async function down(pgm) {
  await pgm.dropTable('microchips');
}
