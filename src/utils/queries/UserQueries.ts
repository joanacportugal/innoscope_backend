import db from "../../database/connection";

async function getOneUserByEmail<T>(email: string): Promise<T | null> {
  const rows = await db("Users").where("user_email", email);
  return rows.length > 0 ? (rows[0] as T) : null;
}

async function createUser<T>(email: string, name: string): Promise<T | null> {
  const result = await db("Users").insert({
    user_email: email,
    user_name: name,
  });
  return result.length > 0 ? (result as T) : null;
}

export { getOneUserByEmail, createUser };
