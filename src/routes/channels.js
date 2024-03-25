import express from "express";
const router = express.Router();

const db = new Map();
let dataIndex = db.size;

// 채널 전체 조회
router.get("/", (req, res) => {
  if (db.size) {
    return res.status(200).json(Object.values(Object.fromEntries(db)));
  }
  res.status(400).json({ message: "데이터가 없습니다." });
});

// 채널 생성
router.post("/", (req, res) => {
  const { channelTitle } = req.body;
  if (channelTitle) {
    db.set(dataIndex + 1, req.body);
    dataIndex++;

    return res.status(201).json({
      message: `${db.get(dataIndex).channelTitle}님, 채널을 응원합니다`,
    });
  }
  res.status(400).json({
    message: "channelTitle을 확인해주세요.",
  });
});

// 채널 조회
router.get("/:id", (req, res) => {
  const id = Number(req.params.id);
  const channel = db.get(id);

  if (channel) return res.status(200).json(channel);
  res.status(404).json({ message: "채널 정보를 찾을 수 없습니다." });
});

// 채널 수정
router.put("/:id", (req, res) => {
  const id = Number(req.params.id);
  const channel = db.get(id);
  const oldTitle = channel.channelTitle;
  const newTitle = req.body.channelTitle;
  console.log(db);

  if (channel) {
    db.set(id, {
      ...channel,
      channelTitle: newTitle,
    });
    return res.json({
      message: `${oldTitle}님, 채널명이 ${newTitle}로 변경됐습니다.`,
    });
  }

  res.status(404).json({ message: "채널 정보를 찾을 수 없습니다." });
});

// 채널 삭제
router.delete("/:id", (req, res) => {
  const id = Number(req.params.id);
  const channel = db.get(id);

  if (channel) {
    db.delete(id);
    return res.status(200).json({
      message: `${channel.channelTitle}이 삭제되었습니다.`,
    });
  }
  res.status(404).json({ message: "채널 정보를 찾을 수 없습니다." });
});

export default router;
