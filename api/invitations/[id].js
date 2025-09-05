// /api/invitations/[id].js
const { getDb } = require("../db");
const { readJson, send } = require("../_utils");

module.exports = async (req, res) => {
  try {
    const db = await getDb();
    const col = db.collection("invitations");

    // URL에서 id 추출
    const id = req.query?.id || req.url.split("/").pop();
    if (!id) return send(res, 400, { error: "id required" });

    const { ObjectId } = require("mongodb");
    let _id;
    try {
      _id = new ObjectId(id);
    } catch {
      return send(res, 400, { error: "invalid id" });
    }

    if (req.method === "GET") {
      const doc = await col.findOne({ _id });
      if (!doc) return send(res, 404, { error: "not found" });
      return send(res, 200, doc);
    }

    if (req.method === "PUT") {
      const body = await readJson(req);
      // 허용 필드만 업데이트
      const patch = {
        ...(body.title != null && { title: body.title }),
        ...(body.price != null && { price: body.price }),
        ...(body.options && { options: body.options }),
        ...(body.cover && { cover: body.cover }),
        ...(body.bg && { bg: body.bg }),
        ...(body.groomName && { groomName: body.groomName }),
        ...(body.brideName && { brideName: body.brideName }),
        ...(body.date && { date: body.date }),
        ...(body.time && { time: body.time }),
        ...(body.content && { content: body.content }),
        ...(body.title1 && { title1: body.title1 }),
      };
      await col.updateOne({ _id }, { $set: patch });
      const after = await col.findOne({ _id });
      return send(res, 200, after);
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
