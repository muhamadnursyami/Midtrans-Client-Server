import app from "./app.js";
const PORT = 3000;

app.get("/", (req, res) => {
  res.send(`Server berjalan di port ${PORT}`);
});

app.listen(PORT, (req, res) => {
  console.log(`Running Port ${PORT}`);
});
