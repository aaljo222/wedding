// api/reviews/[id].js
const { getDb } = require("../db");
const { readJson, send } = require("../_utils");
const { ObjectId } = require("mongodb");

module.exports = async function handler(req, res) {
  const id = (req.query && req.query.id) || (req.url || "").split("/").pop();
  if (!id) return send(res, 400, { error: "id required" });

  let _id;
  try {
    _id = new ObjectId(String(id));
  } catch {
    return send(res, 400, { error: "invalid id" });
  }

  try {
    const db = await getDb();
    const col = db.collection("reviews");

    if (req.method === "GET") {
      const doc = await col.findOne({ _id });
      if (!doc) return send(res, 404, { error: "not found" });
      return send(res, 200, doc);
    }

    if (req.method === "PUT") {
      const body = await readJson(req);
      const $set = {};
      if (typeof body.name === "string") $set.name = body.name;
      if (typeof body.comment === "string") $set.comment = body.comment;
      if (body.date) $set.date = new Date(body.date);
      if (body.rating != null) $set.rating = Number(body.rating);
      if (Array.isArray(body.photos)) $set.photos = body.photos.slice(0, 5);

      await col.updateOne({ _id }, { $set });
      const updated = await col.findOne({ _id });
      return send(res, 200, updated);
    }

    if (req.method === "DELETE") {
      await col.deleteOne({ _id });
      return send(res, 200, { ok: true });
    }

    return send(res, 405, { error: "Method Not Allowed" });
  } catch (e) {
    console.error(e);
    return send(res, 500, { error: "Server error" });
  }
};

module.exports.config = { api: { bodyParser: false } };
