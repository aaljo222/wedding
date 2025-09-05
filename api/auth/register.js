const { getDb } = require("../db");
const { readJson, send } = require("../_utils");
const bcrypt = require("bcryptjs");

module.exports = async (req, res) => {
  if (req.method !== "POST")
    return send(res, 405, { error: "Method Not Allowed" });

  try {
    const { name, email, password } = await readJson(req);
    if (!name || !email || !password)
      return send(res, 400, { error: "missing fields" });

    const db = await getDb();
    const users = db.collection("users");

    const exists = await users.findOne({ email });
    if (exists) return send(res, 409, { error: "email exists" });

    const hash = await bcrypt.hash(password, 10);
    await users.insertOne({
      name,
      email,
      password: hash,
      createdAt: new Date(),
    });

    return send(res, 201, { ok: true });
  } catch (e) {
    console.error(e);
    return send(res, 500, { error: "Server error" });
  }
};
