// express 모듈 세팅
const express = require("express");
const app = express();
app.use(express.json());
app.listen(7777);

let db = new Map();
let id = 1;

const checkFilledObject = (obj) => {
  if (obj.constructor === Object && Object.keys(obj).length === 0) return false;
  return true;
};

// 로그인
app.post("/login", (req, res) => {
  res.json({ message: "환영합니다." });
});

// 회원가입
app.post("/sign-up", (req, res) => {
  if (checkFilledObject(req.body)) {
    db.set(id++, req.body);
    return res
      .status(201)
      .json({ message: `${db.get(id - 1).name}님 환영합니다.` });
  }
  res.status(400).json({ message: "입력 값을 확인해주세요" });
});

app
  .route("/users/:id")
  .get((req, res) => {
    let { id } = req.params;
    id = Number(id);

    const user = db.get(id);

    if (user) {
      return res.status(200).json({
        userId: user.userId,
        name: user.name,
      });
    }
    res.status(404).json({ message: "회원 정보가 없습니다." });
  })
  .delete((req, res) => {
    let { id } = req.params;
    id = Number(id);
    const user = db.get(id);

    if (user) {
      db.delete(id);
      return res.status(200).json({
        message: "회원 탈퇴 완료",
      });
    }
    res.status(404).json({ message: "회원 정보가 없습니다." });
  });

// 회원 개별 조회
app.get("/users/:id");

// 회원 탈퇴
app.delete("/users/:id");
