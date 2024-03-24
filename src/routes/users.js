import express from "express";

const router = express.Router();

let db = new Map();
let id = 1;

const checkFilledObject = (obj) => {
  if (obj.constructor === Object && Object.keys(obj).length === 0) return false;
  return true;
};

// 로그인
router.post("/login", (req, res) => {
  res.json({ message: "환영합니다." });
});

// 회원가입
router.post("/", (req, res) => {
  if (checkFilledObject(req.body)) {
    db.set(id++, req.body);
    return res
      .status(201)
      .json({ message: `${db.get(id - 1).name}님 환영합니다.` });
  }
  res.status(400).json({ message: "입력 값을 확인해주세요" });
});

// 회원 개별 조회
router.get("/:id", (req, res) => {
  let { id } = req.params;
  id = Number(id);
  console.log(db);
  const user = db.get(id);

  if (user) {
    return res.status(200).json({
      userId: user.userId,
      name: user.name,
    });
  }
  res.status(404).json({ message: "회원 정보가 없습니다." });
});

// 회원 탈퇴
router.delete("/:id", (req, res) => {
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

export default router;
