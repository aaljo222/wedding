// api/reviews/index.js
const { getDb } = require("../db");
const { readJson, send } = require("../_utils");

module.exports = async function handler(req, res) {
  try {
    const db = await getDb();
    const col = db.collection("reviews");

    if (req.method === "GET") {
      const list = await col.find({}).sort({ createdAt: -1 }).toArray();
      return send(res, 200, list);
    }

    if (req.method === "POST") {
      const body = await readJson(req);
      const doc = {
        name: body.name ?? "",
        date: body.date ? new Date(body.date) : new Date(),
        rating: Number(body.rating ?? 0),
        comment: body.comment ?? "",
        photos: Array.isArray(body.photos) ? body.photos.slice(0, 5) : [],
        createdAt: new Date(),
      };
      const r = await col.insertOne(doc);
      doc._id = r.insertedId;
      return send(res, 201, doc);
    }

    return send(res, 405, { error: "Method Not Allowed" });
  } catch (e) {
    console.error(e);
    return send(res, 500, { error: "Server error" });
  }
};

module.exports.config = { api: { bodyParser: false } };
