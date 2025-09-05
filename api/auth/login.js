// /api/auth/login.js
const { getDb } = require("../db");
const { readJson, send } = require("../_utils");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    return send(res, 405, { error: "Method Not Allowed" });
  }

  try {
    const { email, password } = await readJson(req);
    if (!email || !password) {
      return send(res, 400, { error: "email and password required" });
    }

    const db = await getDb();
    const users = db.collection("users");

    const user = await users.findOne({ email });
    // 이메일 미존재
    if (!user) return send(res, 401, { error: "invalid credentials" });

    // 비밀번호 비교
    const ok = await bcrypt.compare(password, user.password || "");
    if (!ok) return send(res, 401, { error: "invalid credentials" });

    const JWT_SECRET = process.env.JWT_SECRET;
    if (!JWT_SECRET) {
      return send(res, 500, { error: "JWT_SECRET not configured" });
    }

    // 토큰 생성 (7일 만료)
    const token = jwt.sign(
      { uid: String(user._id), email: user.email },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    // 비밀번호 키 제거 후 반환
    const { password: _drop, ...safeUser } = user;

    return send(res, 200, { token, user: safeUser });
  } catch (e) {
    console.error(e);
    return send(res, 500, { error: "Server error" });
  }
};
