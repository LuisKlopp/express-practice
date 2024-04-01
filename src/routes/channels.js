import express from "express";
import { connection } from "../mariadb.js";

const router = express.Router();

const db = new Map();
let dataIndex = db.size;

const sendResponse = (res, statusCode, content) => {
  const body = typeof content === "object" ? content : { message: content };
  return res.status(statusCode).json(body);
};

// 회원의 채널 전체 조회
router.get("/", (req, res) => {
  const { userId } = req.body;

  const sql = `SELECT * FROM channels WHERE user_id = ?`;
  const values = userId;

  connection.query(sql, values, (err, results) => {
    if (results.length) return sendResponse(res, 200, results);
    sendResponse(res, 404, "채널 정보를 찾을 수 없습니다.");
  });
});

// 채널 생성
router.post("/", (req, res) => {
  const { name, userId } = req.body;

  const sql = `INSERT INTO channels (name, user_id) VALUES (?, ?)`;
  const values = [name, userId];

  connection.query(sql, values, (err, results) => {
    if (name && userId) return sendResponse(res, 201, results);
    sendResponse(res, 400, "요청 값을 제대로 보내주세요. ");
  });
});

// 채널 조회
router.get("/:id", (req, res) => {
  const id = Number(req.params.id);

  const sql = `SELECT * FROM channels WHERE id = ?`;
  const values = id;

  connection.query(sql, [values], (err, results) => {
    if (results.length) return sendResponse(res, 200, results);
    sendResponse(res, 404, "채널 정보를 찾을 수 없습니다.");
  });
});

// 채널 수정
router.put("/:id", (req, res) => {
  const id = Number(req.params.id);
  const channel = db.get(id);
  const oldTitle = channel.channelTitle;
  const newTitle = req.body.channelTitle;

  if (channel) {
    db.set(id, {
      ...channel,
      channelTitle: newTitle,
    });
    return sendResponse(
      res,
      200,
      `${oldTitle}님, 채널명이 ${newTitle}로 변경됐습니다.`
    );
  }

  return sendResponse(res, 404, "채널정보를 찾을 수 없습니다.");
});

// 채널 삭제
router.delete("/:id", (req, res) => {
  const id = Number(req.params.id);
  const channel = db.get(id);

  if (channel) {
    db.delete(id);
    return sendResponse(res, 200, `${channel.channelTitle}이 삭제되었습니다.`);
  }
  return sendResponse(res, 404, "채널정보를 찾을 수 없습니다.");
});

export { router };
