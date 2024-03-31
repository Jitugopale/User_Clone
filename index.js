import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";

const app = express();
const port = 3000;
const _dirname = dirname(fileURLToPath(import.meta.url));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(_dirname + "/public/index.html");
});

const registeredUsers = [];

app.post("/register", (req, res) => {
  const { username, password } = req.body;
  registeredUsers.push({ username, password });
  res.send("You have successfully registered");
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const user = registeredUsers.find(
    (user) => user.username === username && user.password === password
  );
  if (user) {
    res.redirect("/success");
  } else {
    res.send("Invalid username or password");
  }
});

app.get("/success", (req, res) => {
  res.send("You have successfully logged in!" + " " + `<a href='/'>logout</a>`);
});

// Route to handle the callback after social media authentication
app.get("/auth/callback", (req, res) => {
  // Handle the callback logic here, e.g., store user data, set session, etc.
  res.redirect("/success"); // Redirect to success page after authentication
});

app.listen(port, () => {
  console.log(`Server is up and running on port number ${port}`);
});
