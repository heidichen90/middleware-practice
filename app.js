// app.js
const express = require("express");
const app = express();
const port = 3000;

app.use((req, res, next) => {
  let startTime = new Date();
  let endTime = new Date();

  const afterResponse = () => {
    endTime = Date.now();
    console.log(
      new Date(startTime).toLocaleString(),
      " | ",
      req.method,
      " from ",
      req.originalUrl,
      " | ",
      "total time: ",
      endTime - startTime,
      "ms"
    );
    next();
  };

  startTime = Date.now();
  next();

  //can listen on 'close' or 'finish'
  res.on("close", afterResponse);
});

app.get("/", (req, res, next) => {
  res.send("列出全部 Todo");
  next();
});

app.get("/new", (req, res) => {
  res.send("新增 Todo 頁面");
});

app.get("/:id", (req, res) => {
  res.send("顯示一筆 Todo");
});

app.post("/", (req, res) => {
  res.send("新增一筆  Todo");
});

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
