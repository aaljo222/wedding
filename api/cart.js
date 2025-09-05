// api/cart.js
import { getDb } from "./db.js";
import { readJson } from "./_utils.js";
import jwt from "jsonwebtoken";
import crypto from "crypto";

function getCartKey(req, res) {
  // 1) JWT 있으면 uid로
  const auth = req.headers.authorization || "";
  if (auth.startsWith("Bearer ")) {
    try {
      const payload = jwt.verify(auth.slice(7), process.env.JWT_SECRET);
      if (payload?.uid) return "u:" + String(payload.uid);
    } catch {}
  }
  // 2) 아니면 cart_id 쿠키
  const cookie = req.headers.cookie || "";
  const m = cookie.match(/(?:^|;\s*)cart_id=([^;]+)/);
  if (m) return "g:" + m[1];

  const id = crypto.randomUUID();
  // 30일
  res.setHeader(
    "Set-Cookie",
    `cart_id=${id}; Path=/; Max-Age=2592000; HttpOnly; SameSite=Lax; Secure`
  );
  return "g:" + id;
}

async function loadCart(col, key) {
  const doc = await col.findOne({ _id: key });
  return doc?.items || [];
}

async function saveCart(col, key, items) {
  await col.updateOne(
    { _id: key },
    { $set: { items, updatedAt: new Date() } },
    { upsert: true }
  );
}

function calcTotals(items) {
  let count = 0,
    amount = 0;
  for (const it of items) {
    count += Number(it.qty || 0);
    amount += Number(it.unitPrice || 0) * Number(it.qty || 0);
  }
  return { count, amount };
}

export default async function handler(req, res) {
  try {
    const db = await getDb();
    const col = db.collection("carts");
    const key = getCartKey(req, res);

    if (req.method === "GET") {
      const items = await loadCart(col, key);
      return res.status(200).json({ items, totals: calcTotals(items) });
    }

    if (req.method === "POST") {
      // item 추가(있으면 수량 업데이트)
      const body = await readJson(req);
      const items = await loadCart(col, key);
      const idx = items.findIndex((x) => x.key === body.key);
      if (idx >= 0) {
        // 단일구매 옵션이면 1 고정
        const singleOnly =
          body?.options?.singleOnly || items[idx]?.options?.singleOnly;
        items[idx].qty = singleOnly ? 1 : Number(body.qty || 1);
        items[idx] = { ...items[idx], ...body };
      } else {
        items.push({
          key: body.key,
          productId: body.productId || body.key,
          title: body.title || "상품",
          unitPrice: Number(body.unitPrice || 0),
          qty: body?.options?.singleOnly ? 1 : Number(body.qty || 1),
          options: body.options || {},
          image: body.image || "",
        });
      }
      await saveCart(col, key, items);
      return res.status(200).json({ items, totals: calcTotals(items) });
    }

    if (req.method === "PATCH") {
      // 수량 변경 { key, qty }
      const body = await readJson(req);
      const items = await loadCart(col, key);
      const idx = items.findIndex((x) => x.key === body.key);
      if (idx < 0) return res.status(404).json({ error: "item not found" });
      const singleOnly = items[idx]?.options?.singleOnly;
      items[idx].qty = singleOnly ? 1 : Math.max(1, Number(body.qty || 1));
      await saveCart(col, key, items);
      return res.status(200).json({ items, totals: calcTotals(items) });
    }

    if (req.method === "DELETE") {
      // ?key=xxx (없으면 전체 비우기)
      const delKey = req.query?.key;
      if (!delKey) {
        await saveCart(col, key, []);
        return res
          .status(200)
          .json({ items: [], totals: { count: 0, amount: 0 } });
      }
      const items = await loadCart(col, key);
      const next = items.filter((x) => x.key !== delKey);
      await saveCart(col, key, next);
      return res.status(200).json({ items: next, totals: calcTotals(next) });
    }

    return res.status(405).json({ error: "Method Not Allowed" });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "server error" });
  }
}
export const config = { api: { bodyParser: false } };
