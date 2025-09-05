const { getDb } = require("../db");
const { readJson, send } = require("../_utils");

const ALLOW = [
  "ino",
  "groomName",
  "brideName",
  "date",
  "time",
  "cover",
  "bg",
  "title1",
  "content",
  "title",
  "price",
  "options",
];

module.exports = async (req, res) => {
  try {
    const db = await getDb();
    const col = db.collection("invitations");

    if (req.method === "GET") {
      const list = await col.find({}).sort({ _id: -1 }).toArray();
      return send(res, 200, list);
    }

    if (req.method === "POST") {
      const body = await readJson(req);
      if (!body?.title && !body?.title1) {
        return send(res, 400, { error: "title or title1 is required" });
      }
      const doc = Object.fromEntries(
        ALLOW.map((k) => [k, body[k] ?? (k === "options" ? {} : null)])
      );
      doc.createdAt = new Date();
      const r = await col.insertOne(doc);
      return send(res, 201, { _id: r.insertedId, ...doc });
    }

    return send(res, 405, { error: "Method Not Allowed" });
  } catch (e) {
    console.error(e);
    return send(res, 500, { error: "Server error" });
  }
};
