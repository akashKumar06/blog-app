import app from "./app.js";
import connectDB from "./db/index.js";

connectDB()
  .then(() => {
    app.on("error", (err) => {
      console.log(err);
      throw new Error(err);
    });

    app.listen(process.env.PORT, () => {
      console.log(`Server is listening at port ${process.env.PORT} 🌟`);
    });
  })
  .catch((err) => {
    console.log("Database connection error: ", err);
    process.exit(1);
  });
