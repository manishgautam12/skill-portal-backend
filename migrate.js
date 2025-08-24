import pool from './db.js';


export async function migrate() {
  const fs = await import('fs/promises');
  const path = await import('path');
  const migrationPath = path.resolve('migrations', '001_init_schema.sql');
  const sql = await fs.readFile(migrationPath, 'utf-8');
  // Split by semicolon, filter out empty statements
  const statements = sql.split(/;\s*\n/).map(s => s.trim()).filter(Boolean);
  for (const stmt of statements) {
    if (stmt.startsWith('--') || stmt === '') continue;
    await pool.query(stmt);
  }
  console.log('Database migrated successfully.');
}

if (process.argv[1].endsWith('migrate.js')) {
  migrate().catch(err => {
    console.error('Migration failed:', err);
    process.exit(1);
  });
}
