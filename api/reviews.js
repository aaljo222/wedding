// api/reviews.js
import { getDb } from "./db.js";
import { readJson } from "./_utils.js";

export default async function handler(req, res) {
  try {
    const db = await getDb();
    const col = db.collection("reviews");

    if (req.method === "GET") {
      // ?photoOnly=1 이면 사진 있는 리뷰만
      const photoOnly = /^(1|true)$/i.test(String(req.query?.photoOnly || ""));
      const q = photoOnly
        ? { photos: { $exists: true, $type: "array", $ne: [] } }
        : {};
      const list = await col.find(q).sort({ _id: -1 }).toArray();
      return res.status(200).json(list);
    }

    if (req.method === "POST") {
      const body = await readJson(req);
      const doc = {
        name: body.name || "게스트",
        date: body.date ? new Date(body.date) : new Date(),
        rating: Number(body.rating || 0),
        comment: body.comment || "",
        photos: Array.isArray(body.photos) ? body.photos : [],
        createdAt: new Date(),
      };
      const r = await col.insertOne(doc);
      return res.status(201).json({ _id: r.insertedId, ...doc });
    }

    // id 기반 메소드: PUT/DELETE
    const id = req.query?.id || req.url.split("/").pop();
    if (!id) return res.status(400).json({ error: "id required" });

    const { ObjectId } = await import("mongodb");

    if (req.method === "PUT") {
      const body = await readJson(req);
      const $set = {};
      ["name", "rating", "comment", "photos", "date"].forEach((k) => {
        if (body[k] !== undefined)
          $set[k] = k === "date" ? new Date(body[k]) : body[k];
      });
      await col.updateOne(
        { _id: new ObjectId(id) },
        { $set, $currentDate: { updatedAt: true } }
      );
      return res.status(200).json({ ok: true });
    }

    if (req.method === "DELETE") {
      await col.deleteOne({ _id: new ObjectId(id) });
      return res.status(200).json({ ok: true });
    }

    return res.status(405).json({ error: "Method Not Allowed" });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "server error" });
  }
}
export const config = { api: { bodyParser: false } };
