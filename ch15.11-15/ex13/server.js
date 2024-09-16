import express from "express";
import axios from "axios";

const app = express();
const port = 3000;

app.use(express.static("contents"));
app.use(express.json());

app.post("/chat", async (req, res) => {
  try {
    const response = await axios.post(
      "http://localhost:11400/v1/completions",
      {
        model: "gemma2:2b",
        prompt: req.body.prompt,
        stream: true,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    response.data.on("data", (chunk) => {
      res.write(chunk);
    });

    response.data.on("end", () => {
      res.end();
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error");
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
