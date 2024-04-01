import express from "express";
import { connection } from "../mariadb.js";

const router = express.Router();

const sendResponse = (res, statusCode, content) => {
  const body = typeof content === "object" ? content : { message: content };
  return res.status(statusCode).json(body);
};

// 로그인
router.post("/login", (req, res) => {
  const { email, password } = req.body;
  let loginUser = {};
  const sql = `SELECT * FROM users WHERE email = ?`;
  const values = email;

  connection.query(sql, values, (err, results) => {
    loginUser = results[0];
    if (loginUser || loginUser.password !== password)
      return sendResponse(res, 404, "회원정보가 올바르지 않습니다..");
    sendResponse(res, 200, "loginUser.name님 로그인 되었습니다");
  });
});

// 회원가입
router.post("/", (req, res) => {
  const { email, name, password, contact } = req.body;

  const sql =
    "INSERT INTO users (email, name, password, contact) VALUES(?, ?, ?, ?)";
  const values = [email, name, password, contact];

  connection.query(sql, values, (err, results) => {
    sendResponse(res, 201, results);
  });
});

// 회원 개별 조회
router.get("/", (req, res) => {
  const { email } = req.body;

  const sql = "SELECT * FROM users WHERE email = ?";
  const values = email;

  connection.query(sql, values, (err, results) => {
    if (results.length) return sendResponse(res, 200, results);
    sendResponse(res, 404, "회원 정보가 없습니다.");
  });
});

// 회원 탈퇴
router.delete("/", (req, res) => {
  const { email } = req.body;

  const sql = "DELETE FROM users WHERE email = ?";
  const values = email;

  connection.query(sql, values, (err, results) => {
    sendResponse(res, 200, results);
  });
});

export { router };
