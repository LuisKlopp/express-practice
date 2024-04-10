import express from "express";
import { connection } from "../mariadb.js";

const router = express.Router();

const sendResponse = (res, statusCode, content) => {
  const body = typeof content === "object" ? content : { message: content };
  return res.status(statusCode).json(body);
};

//todo 전체조회
router.get("/", (req, res) => {
  const sql = `SELECT * FROM Board.todos`;

  connection.query(sql, (err, results) => {
    console.log(results);
    sendResponse(res, 200, results);
  });
});

//todo 생성
router.post("/", (req, res) => {
  const { content } = req.body;
  const sql = `INSERT INTO Board.todos (content) VALUES (?)`;
  const values = content;

  connection.query(sql, values, (err, results) => {
    if (!content) return sendResponse(res, 404, "todo를 채워주세요");
    sendResponse(res, 200, "추가되었습니다.");
  });
});

//todo 삭제
router.delete("/:id", (req, res) => {
  const id = Number(req.params.id);
  const values = id;

  const sql = "DELETE FROM Board.todos WHERE id = ?";

  connection.query(sql, values, (err, results) => {
    if (!results.affectedRows)
      return sendResponse(res, 404, "데이터가 없습니다.");
    sendResponse(res, 200, results);
  });
});

// todo 수정
router.put("/:id", (req, res) => {
  const id = Number(req.params.id);
  const content = req.body.content;

  const sql = "UPDATE Board.todos SET content = ? WHERE id = ?";
  const values = [content, id];

  console.log(content, id);

  connection.query(sql, values, (err, results) => {
    if (results.affectedRows === 0) {
      return sendResponse(res, 404, "해당 ID의 데이터가 없습니다.");
    }
    sendResponse(res, 200, "성공적으로 수정되었습니다.");
  });
});

export { router };
