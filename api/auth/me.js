import { getDb } from "../db.js";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.status(405).json({ error: "Method Not Allowed" });
    return;
  }
  try {
    const auth = req.headers.authorization || "";
    const token = auth.startsWith("Bearer ") ? auth.slice(7) : null;
    if (!token) return res.status(401).json({ error: "missing token" });

    let payload;
    try {
      payload = jwt.verify(token, JWT_SECRET);
    } catch {
      return res.status(401).json({ error: "invalid token" });
    }

    const db = await getDb();
    const users = db.collection("users");
    const { ObjectId } = await import("mongodb");
    const u = await users.findOne(
      { _id: new ObjectId(payload.uid) },
      { projection: { password: 0 } }
    );
    if (!u) return res.status(404).json({ error: "user not found" });
    res.status(200).json(u);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "server error" });
  }
}
