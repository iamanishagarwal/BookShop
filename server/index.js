const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
var cookieSession = require("cookie-session");
const bodyParser = require("body-parser");
const keys = require("./config/keys");
const auth = require("./middleware/auth");
require("./model/User");
require("./model/Book");
require("./services/passport");
const user = require("./routes/user");
const searchBook = require("./routes/searchBook");
const cart = require("./routes/cart");
const app = express();

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(passport.initialize());
app.use(passport.session());

require("./routes/authRoutes")(app);

settingMongoDB = async () => {
  try {
    await mongoose.connect(keys.mongoURL, { useNewUrlParser: true });
    console.log("MongoDB connected......");
  } catch {
    console.log("Error while connecting to mongoDB........");
  }
};
settingMongoDB();

const port = process.env.PORT || 5000;

app.get("/api", auth, (req, res) => {
  res.send("Welcome to BookShop");
});

app.use("/api/user", user);
app.use("/api/book", searchBook);
app.use("/api/user/cart", cart);

app.listen(port, () => console.log(`The server is running on port : ${port}`));
