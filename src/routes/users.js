import express from "express";

const router = express.Router();

let db = new Map();

const checkFilledObject = (obj) => {
  if (obj.constructor === Object && !Object.keys(obj).length) return false;
  return true;
};

// sendResponse 함수 정의
const sendResponse = (res, statusCode, content) => {
  const body = typeof content === "object" ? content : { message: content };
  return res.status(statusCode).json(body);
};

// 로그인
router.post("/login", (req, res) => {
  const { userId, password } = req.body;
  const dbArray = [...db.values()];

  const loginUser = dbArray.find(
    (user) => user.userId === userId && user.password === password
  );

  if (loginUser) {
    return sendResponse(res, 200, "로그인 성공");
  }

  sendResponse(res, 400, "로그인 실패");
});

// 회원가입
router.post("/", (req, res) => {
  const { userId } = req.body;

  if (checkFilledObject(req.body)) {
    db.set(userId, req.body);
    return sendResponse(res, 201, `${db.get(userId).name}님 환영합니다.`);
  }

  sendResponse(res, 400, "입력 값을 확인해주세요");
});

// 회원 개별 조회
router.get("/", (req, res) => {
  let { userId } = req.body;

  const user = db.get(userId);

  if (user) {
    return sendResponse(res, 200, {
      userId: user.userId,
      name: user.name,
    });
  }

  sendResponse(res, 404, "회원 정보가 없습니다.");
});

// 회원 탈퇴
router.delete("/", (req, res) => {
  let { userId } = req.body;
  const user = db.get(userId);

  if (user) {
    db.delete(userId);
    return sendResponse(res, 200, "회원 탈퇴 완료");
  }

  sendResponse(res, 404, "회원 정보가 없습니다.");
});

export { router };
