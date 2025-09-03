/** @param {import('node-pg-migrate').MigrationBuilder} pgm */
export async function up(pgm) {
	await pgm.createTable("owners", {
		id: {
			type: "uuid",
			primaryKey: true,
			default: pgm.func("gen_random_uuid()"),
		},
		name: { type: "text", notNull: true },
		email: { type: "text", unique: true },
		phone: { type: "text" },
	});
}

export async function down(pgm) {
	await pgm.dropTable("owners");
}
