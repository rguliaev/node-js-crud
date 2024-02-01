import pg from "pg";

const config = {
  host: "localhost",
  database: "nodejs",
  user: "user",
  password: "password",
  port: 5433,
  max: 10,
  idleTimeoutMillis: 30000,
};

export const pool = new pg.Pool(config).on("error", (err) => {
  console.error("idle client error", err.message, err.stack);
});

export async function initDb() {
  await pool.query("SELECT $1::int AS number", [1]);

  console.log(
    `Postgres is online using ${config.database} as user ${config.user}\n` +
      `and is listening on ${config.host}`,
  );
}
