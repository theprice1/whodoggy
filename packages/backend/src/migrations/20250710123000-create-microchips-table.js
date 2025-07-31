/** @param {import('node-pg-migrate').MigrationBuilder} pgm */
export async function up(pgm) {
  await pgm.createTable('microchips', {
    id: {
      type: 'uuid',
      primaryKey: true,
      default: pgm.func('gen_random_uuid()'),
    },
    microchip_id: { type: 'varchar(20)', notNull: true, unique: true },
    dog_id: {
      type: 'uuid',
      notNull: true,
      references: 'dogs(id)',
      onDelete: 'CASCADE',
    },
    registry_name: { type: 'text', notNull: true },
    registered_at: { type: 'timestamp', default: pgm.func('current_timestamp') },
  });
}

export async function down(pgm) {
  await pgm.dropTable('microchips');
}
