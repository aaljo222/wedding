const { getDb } = require("../db");
const { readJson, send } = require("../_utils");
const { ObjectId } = require("mongodb");

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
    const id = req.query?.id || req.url.split("/").pop();
    if (!id) return send(res, 400, { error: "id required" });

    const db = await getDb();
    const col = db.collection("invitations");
    const _id = new ObjectId(id);

    if (req.method === "GET") {
      const doc = await col.findOne({ _id });
      if (!doc) return send(res, 404, { error: "not found" });
      return send(res, 200, doc);
    }

    if (req.method === "PUT") {
      const body = await readJson(req);
      const patch = {};
      for (const k of ALLOW) if (k in body) patch[k] = body[k];
      await col.updateOne({ _id }, { $set: patch });
      const doc = await col.findOne({ _id });
      return send(res, 200, doc);
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
