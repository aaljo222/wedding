// /api/invitations.js
import { getDb } from "./db.js";

// GET    /api/invitations        -> 목록
// POST   /api/invitations        -> 추가({ title, price, ... })
// PUT    /api/invitations/:id    -> 수정
// DELETE /api/invitations/:id    -> 삭제

export default async function handler(req, res) {
  try {
    const db = await getDb();
    const col = db.collection("invitations");

    if (req.method === "GET") {
      const list = await col.find({}).sort({ _id: -1 }).toArray();
      return res.status(200).json(list);
    }

    if (req.method === "POST") {
      const body = await parseJson(req);
      if (!body?.title)
        return res.status(400).json({ error: "title required" });
      const r = await col.insertOne({
        title: body.title,
        price: body.price ?? 0,
        options: body.options ?? {},
        createdAt: new Date(),
      });
      return res.status(201).json({ _id: r.insertedId });
    }

    // id가 필요한 메소드
    const id = req.query?.id || req.url.split("/").pop();
    if (!id) return res.status(400).json({ error: "id required" });

    const { ObjectId } = await import("mongodb");

    if (req.method === "PUT") {
      const body = await parseJson(req);
      await col.updateOne({ _id: new ObjectId(id) }, { $set: body });
      return res.status(200).json({ ok: true });
    }

    if (req.method === "DELETE") {
      await col.deleteOne({ _id: new ObjectId(id) });
      return res.status(200).json({ ok: true });
    }

    return res.status(405).json({ error: "Method Not Allowed" });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "Server error" });
  }
}

function parseJson(req) {
  return new Promise((resolve, reject) => {
    let data = "";
    req.on("data", (c) => (data += c));
    req.on("end", () => {
      try {
        resolve(data ? JSON.parse(data) : {});
      } catch (e) {
        reject(e);
      }
    });
    req.on("error", reject);
  });
}

export const config = {
  api: {
    bodyParser: false, // 직접 파싱
  },
};
