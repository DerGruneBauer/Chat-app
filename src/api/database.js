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

///Update when user likes a post add post to user's liked posts list
db.put("/users/likedposts/:postid", async (req, res) => {
  const data = req.params;
  const update = await pool.query(
    "UPDATE users SET liked_posts = array_prepend($1 , liked_posts)",
    [data.postid]
  );
  res.json(update.rows);
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
  const data = req.params;
  const post = await pool.query(
    "SELECT * FROM posts WHERE user_id=(select user_id from users where uid = $1)",
    [data.uid]
  );
  res.json(post.rows);
});

//Get posts likes, retweets, comments, and saves
db.get("/posts/:postid/likesretweetscommentssaves", async (req, res) => {
  const data = req.params;
  const post = await pool.query(
    "SELECT comments, retweets, saves, likes FROM posts WHERE post_id=$1",
    [data.postid]
  );
  res.json(post.rows);
});

//Get all posts liked by user

//Update when user likes a post add user to likes column
db.put("/posts/:postid/likes/:uid", async (req, res) => {
  const data  = req.params;
  const update = await pool.query(
    "UPDATE posts SET likes = array_prepend((select user_id from users where uid = $1), likes) WHERE post_id = $2",
    [data.uid, data.postid]
  );
  res.json(update.rows);
});

//Post/add a tweet
db.post("/posts", async (req, res) => {
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
