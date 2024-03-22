const express = require("express");
const app = express();

app.listen(1234);

const fruits = [
  {
    id: 1,
    name: "apple",
  },
  {
    id: 2,
    name: "orange",
  },
  {
    id: 3,
    name: "strawberry",
  },
  {
    id: 4,
    name: "blueberry",
  },
];

// 과일 전체 조회
app.get("/fruits", (req, res) => {
  res.json(fruits);
});

// 과일 개별 조회
app.get("/fruits/:id", (req, res) => {
  let id = req.params.id;
  id = Number(id);
  const findFruit = fruits.find((item) => id === item.id);

  if (findFruit) return res.json(findFruit);
  res.status(404).json({ message: "과일이 없습니다." });
});
