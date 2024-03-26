import express from "express";
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

  if (!userId) sendResponse(res, 404, "로그인 하세요.");

  const dbArray = Object.values(Object.fromEntries(db));
  const matchedChannels = dbArray.filter(
    (channel) => channel.userId === userId
  );

  if (!matchedChannels.length)
    return sendResponse(res, 400, "데이터가 없습니다.");

  return sendResponse(res, 200, matchedChannels);
});

// 채널 생성
router.post("/", (req, res) => {
  const { channelTitle, userId } = req.body;

  if (channelTitle && userId) {
    db.set(dataIndex + 1, req.body);
    dataIndex++;

    return sendResponse(
      res,
      200,
      `${db.get(dataIndex).channelTitle}님, 채널을 응원합니다`
    );
  }
  sendResponse(res, 400, "채널 타이틀을 입력해주세요.");
});

// 채널 조회
router.get("/:id", (req, res) => {
  const id = Number(req.params.id);
  const channel = db.get(id);

  if (channel) return sendResponse(res, 200, channel);
  sendResponse(res, 404, "채널 정보를 찾을 수 없습니다.");
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
