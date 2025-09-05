// /api/invitations/[id].js
const { getDb } = require("../../db");
const { readJson, send } = require("../../_utils");
const { ObjectId } = require("mongodb");

module.exports = async (req, res) => {
  try {
    const db = await getDb();
    const col = db.collection("invitations");

    // Vercel Node 함수의 동적 파라미터는 req.query.id 로 들어옵니다.
    const id = (req.query && req.query.id) || req.url.split("/").pop();
    if (!id) return send(res, 400, { error: "id required" });

    const _id = new ObjectId(String(id));

    if (req.method === "PUT") {
      const body = await readJson(req);
      await col.updateOne({ _id }, { $set: body });
      return send(res, 200, { ok: true });
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
