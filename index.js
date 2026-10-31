const express = require("express");
const app = express();
const port = 5000;
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const methodOverride = require("method-override");

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

let posts = [
  {
    id: uuidv4(),
    username: "Tarqueem",
    content: "i love conding",
  },
  {
    id: uuidv4(),
    username: "rahul kumar",
    content: " i am a software engeenir",
  },

  { id: uuidv4(), username: "Arsh khan", content: "Software engineer" },
];
// Home page of Posts
app.get("/posts", (req, res) => {
  res.render("index.ejs", { posts });
});
// Showing NEW user Registration form
app.get("/posts/new", (req, res) => {
  res.render("new.ejs");
});
// Adding new user
app.post("/posts", (req, res) => {
  let { username, content } = req.body;
  let id = uuidv4();
  posts.push({ id, username, content });
  res.redirect("/posts");
});

// show only specific posts
app.get("/posts/:id", (req, res) => {
  let { id } = req.params;
  let post = posts.find((p) => id == p.id);
  res.render("show.ejs", { post });
});

app.patch("/posts/:id", (req, res) => {
  let { id } = req.params;
  let newContent = req.body.content;
  let post = posts.find((p) => id == p.id);
  post.content = newContent;
  console.log(post);
  res.redirect("/posts");
});

// Edit route
app.get("/posts/:id/edit", (req, res) => {
  let { id } = req.params;
  let post = posts.find((p) => id == p.id);
  res.render("edit.ejs", { post });
});

app.listen(port, () => {
  console.log("server is live at ", port);
});
