module.exports = {
	connectionString: process.env.DATABASE_URL,
	migrationsDir: "migrations/deploy",
	migrationTableName: "init_tables.sql",
};
  