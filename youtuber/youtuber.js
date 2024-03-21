const express = require("express");
const app = express();

app.listen(1234);

const db = new Map();
app.use(express.json());

const youtuber1 = {
  channelTitle: "십오야",
  sub: "593만명",
  videoNum: "993개",
};
const youtuber2 = {
  channelTitle: "침착맨",
  sub: "227만명",
  videoNum: "6,600개",
};
const youtuber3 = {
  channelTitle: "테오",
  sub: "54.8만명",
  videoNum: "726개",
};

db.set(1, youtuber1);
db.set(2, youtuber2);
db.set(3, youtuber3);

app.get("/youtubers/:id", (req, res) => {
  let { id } = req.params;
  id = Number(id);
  const youtuber = db.get(id);

  if (!youtuber) return res.json({ message: "없는번호" });

  res.json(youtuber);
});

app.get("/youtubers", (req, res) => {
  const youtubers = Array.from(db.values());
  res.json(youtubers);
});

app.post("/youtubers", (req, res) => {
  const youtuberData = req.body;

  let keyArray = Array.from(db.keys());
  let lastKey = keyArray[keyArray.length - 1];

  db.set(lastKey + 1, youtuberData);

  res.json({
    message: `${youtuberData.channelTitle}님, 유튜버 생활을 응원합니다!`,
  });
});

app.delete("/youtubers/:id", (req, res) => {
  let { id } = req.params;
  id = Number(id);
  const youtuber = db.get(id);

  if (!youtuber) return res.json({ message: "없는 번호입니다." });
  const name = youtuber.channelTitle;

  db.delete(id);
  res.json({
    message: `${name}delete 호출 잘됨`,
  });
});

app.delete("/youtubers", (req, res) => {
  const errorMessage = db.size
    ? { message: "전체 삭제완료" }
    : { message: "삭제할 유튜버가 없습니다." };

  db.clear();

  res.json(errorMessage);
});

app.put("/youtubers/:id", (req, res) => {
  let { id } = req.params;
  id = Number(id);
  const youtuber = db.get(id);

  if (!youtuber) return res.json({ message: "없는 유튜버 입니다." });

  const prevTitle = youtuber.channelTitle;
  const newTitle = req.body.newChannelTitle;

  db.set(id, {
    ...youtuber,
    channelTitle: newTitle,
  });

  res.json({ message: `${prevTitle}님, 채널명이 ${newTitle}로 변경됐습니다.` });
});
