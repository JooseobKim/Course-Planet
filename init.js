import "dotenv/config";
import "./db";
import app from "./server";

const PORT = process.env.PORT || 4250;

app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});
