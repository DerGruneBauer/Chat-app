const express = require("express");
const db = express.Router();
const pool = require("./connection");

db.use(express.json());
db.get("/", (req, res) => {
  res.send({ data: "hello" });
});

//*------------*
// USERS TABLE
//*------------*

//Get all users
db.get("/users", async (req, res) => {
  const users = await pool.query("SELECT * FROM users");
  res.json(users.rows);
});

//Get user by uid
db.get("/users/:uid", async (req, res) => {
  const data = req.params;
  const user = await pool.query("SELECT * FROM users WHERE uid = $1", [data.uid]);
  res.json(user.rows);
});

//Add a user
db.post("/users", async (req, res) => {
  const {
    email,
    uid,
    user_name,
    display_name,
    liked_comments,
    liked_posts,
    saved_posts,
    retweeted_posts,
    commented_on_posts,
  } = req.body;
  const user = await pool.query(
    `INSERT INTO users (
        email,
        uid,
        user_name,
        display_name,
        liked_comments,
        saved_posts,
        retweeted_posts,
        commented_on_posts,
        liked_posts
    ) VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8, $9
    )`,
    [
      email,
      uid,
      user_name,
      display_name,
      liked_comments,
      liked_posts,
      saved_posts,
      retweeted_posts,
      commented_on_posts,
    ]
  );
  res.json(user.rows);
});

//*------------*
// POSTS TABLE
//*------------*

//Get all posts
db.get("/posts", async (req, res) => {
  const posts = await pool.query("SELECT * FROM posts");
  res.json(posts.rows);
});

//Get all posts by user
db.get("/posts/:uid", async (req, res) => {
  const post = await pool.query(
    "SELECT * FROM posts WHERE user_id=(select user_id from postgres.users where uid = $1)",
    [req.params.uid]
  );
  res.json(post.rows);
});

//Add a post
db.post("/posts", async (req, res) => {
    console.log(req.body);
  const { post_text, visible_to_all, date_posted, time_posted, user_id, comments, retweets, saves, likes, photo_url } = req.body;
  const post = await pool.query(
    `INSERT INTO posts (
        post_text,
        visible_to_all,
        date_posted,
        time_posted,
        user_id,
        comments,
        retweets,
        saves,
        likes,
        photo_url
    ) VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8, $9, $10
    );`,
    [
      post_text,
      visible_to_all,
      date_posted,
      time_posted,
      user_id,
      comments,
      retweets,
      saves,
      likes,
      photo_url
    ]
  );
  res.json(post.rows);
});

module.exports = db;
