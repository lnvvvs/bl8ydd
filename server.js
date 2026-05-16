import express from "express";
import fetch from "node-fetch";

const app = express();

app.get("/download", async (req, res) => {
  try {
    const fileUrl = "https://gofile.io/d/5JeO5V?download=1";

    const response = await fetch(fileUrl);

    if (!response.ok) {
      return res.status(500).send("Failed to fetch file");
    }

    res.setHeader("Content-Disposition", 'attachment; filename="RepForge.apk"');
    res.setHeader("Content-Type", "application/vnd.android.package-archive");

    response.body.pipe(res);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

app.listen(3000, () => console.log("Server running on port 3000"));