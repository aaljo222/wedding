// /api/invitations/index.js
const { getDb } = require("../db");
const { readJson, send } = require("../_utils");

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
      if (!body?.title) return send(res, 400, { error: "title required" });
      const r = await col.insertOne({
        title: body.title,
        price: body.price ?? 0,
        options: body.options ?? {},
        createdAt: new Date(),
      });
      return send(res, 201, { _id: r.insertedId });
    }

    return send(res, 405, { error: "Method Not Allowed" });
  } catch (e) {
    console.error(e);
    return send(res, 500, { error: "Server error" });
  }
};
