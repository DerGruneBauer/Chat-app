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

//Get user by user id
db.get("/users/:userid", async (req, res) => {
  const data = req.params;
  const user = await pool.query("SELECT * FROM users WHERE user_id = $1", [data.userid]);
  res.json(user.rows);
});

//Get array of ids of user's liked posts
db.get("/users/:userid/likedposts", async (req, res) => {
  const data = req.params;
  const post = await pool.query(
    "SELECT liked_posts FROM users WHERE user_id = $1",
    [data.userid]
  );
  res.json(post.rows);
});

//Get array of ids of user's saved posts
db.get("/users/:userid/savedposts", async (req, res) => {
  const data = req.params;
  const post = await pool.query(
    "SELECT saved_posts FROM users WHERE user_id = $1",
    [data.userid]
  );
  res.json(post.rows);
});

//Get array of ids of user's followers
db.get("/users/:userid/followers", async (req, res) => {
  const data = req.params;
  const post = await pool.query(
    "SELECT followers FROM users WHERE user_id = $1",
    [data.userid]
  );
  res.json(post.rows);
});

//Get array of ids of who user is following
db.get("/users/:userid/following", async (req, res) => {
  const data = req.params;
  const post = await pool.query(
    "SELECT following FROM users WHERE user_id = $1",
    [data.userid]
  );
  res.json(post.rows);
});

//Update when current user unfollows another user
db.put("/users/:useridcurrent/following/:useridother/unsave", async (req, res) => {
  const data = req.params;
  let update = await pool.query(
      "UPDATE users SET following = array_remove(following, $2) WHERE user_id = $1",
      [data.useridcurrent, data.useridother]
    );
  res.json(update.rows);
});

//Update when another user unfollows current user
db.put("/users/:useridcurrent/followers/:useridother/unsave", async (req, res) => {
  const data = req.params;
  let update = await pool.query(
      "UPDATE users SET followers = array_remove(followers, $2) WHERE user_id = $1",
      [data.useridcurrent, data.useridother]
    );
  res.json(update.rows);
});

//Update when current user followers another user
db.put("/users/:useridcurrent/following/:useridother/save", async (req, res) => {
  const data = req.params;
   let update = await pool.query(
      "UPDATE users SET following = array_prepend($2 , following) WHERE user_id = $1",
      [data.useridcurrent, data.useridother]
   );
  res.json(update.rows);
});

//Update when another user follows current user
db.put("/users/:useridcurrent/followers/:useridother/save", async (req, res) => {
  const data = req.params;
   let update = await pool.query(
      "UPDATE users SET followers = array_prepend($2 , followers) WHERE user_id = $1",
      [data.useridcurrent, data.useridother]
   );
  res.json(update.rows);
});

//Update when user unsaves a post - delete post to user's saved posts list
db.put("/users/:userid/savedposts/:postid/unsave", async (req, res) => {
  const data = req.params;
  let update = await pool.query(
      "UPDATE users SET saved_posts = array_remove(saved_posts, $2) WHERE user_id = $1",
      [data.userid, data.postid]
    );
  res.json(update.rows);
});

//Update when user saves a post - add post to user's saved posts list
db.put("/users/:userid/savedposts/:postid/save", async (req, res) => {
  const data = req.params;
   let update = await pool.query(
      "UPDATE users SET saved_posts = array_prepend($2 , saved_posts) WHERE user_id = $1",
      [data.userid, data.postid]
   );
  res.json(update.rows);
});

///Update when user unlikes a post - delete post to user's liked posts list
db.put("/users/:userid/likedposts/:postid/unlike", async (req, res) => {
  const data = req.params;
  let update = await pool.query(
      "UPDATE users SET liked_posts = array_remove(liked_posts, $2) WHERE user_id = $1",
      [data.userid, data.postid]
    );
  res.json(update.rows);
});

///Update when user likes a post - add post to user's liked posts list
db.put("/users/:userid/likedposts/:postid/like", async (req, res) => {
  const data = req.params;
   let update = await pool.query(
      "UPDATE users SET liked_posts = array_prepend($2 , liked_posts) WHERE user_id = $1",
      [data.userid, data.postid]
   );
  res.json(update.rows);
});

//Update user display name and photo url from uid
db.put("/users/:uid", async (req,res) => {
  const data = req.params;
  const bodyData = req.body;
  const update = await pool.query("UPDATE users SET display_name=$1, photo_url=$2, bio=$3 WHERE uid=$4",
  [bodyData.displayName, bodyData.photoUrl, bodyData.bio, data.uid]
  );
  res.json(update.rows);
})

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
db.get("/posts/users/:userid", async (req, res) => {
  const data = req.params;
  const post = await pool.query(
    "SELECT posts.*, users.display_name FROM posts INNER JOIN users ON posts.user_id=users.user_id WHERE posts.user_id=$1",
    [data.userid]
  );
  res.json(post.rows.reverse());
});

//Get post by post id
db.get("/posts/:postid", async (req, res) => {
  const data = req.params;
  const post = await pool.query(
    "SELECT posts.*, users.display_name FROM posts INNER JOIN users ON posts.user_id=users.user_id WHERE posts.post_id=$1",
    [data.postid]
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

//Update when user saves a post - add user to saves column
db.put("/posts/:postid/saves/:uid", async (req, res) => {
  const data  = req.params;
   let update = await pool.query(
      "UPDATE posts SET saves = array_prepend((select user_id from users where uid = $1), saves) WHERE post_id = $2",
      [data.uid, data.postid]
    );
  res.json(update.rows);
});

//Update when user unsaves a post - delete user from saves column
db.put("/posts/:postid/saves/:uid/unsave", async (req, res) => {
  const data  = req.params;
   let update = await pool.query(
      "UPDATE posts SET saves = array_remove(saves, (SELECT user_id FROM users WHERE uid = $1)) WHERE post_id = $2",
      [data.uid, data.postid]
    );
  res.json(update.rows);
});

//Update when user likes a post - add user to likes column
db.put("/posts/:postid/likes/:uid", async (req, res) => {
  const data  = req.params;
   let update = await pool.query(
      "UPDATE posts SET likes = array_prepend((select user_id from users where uid = $1), likes) WHERE post_id = $2",
      [data.uid, data.postid]
    );
  res.json(update.rows);
});

//Update when user unlikes a post - delete user from likes column
db.put("/posts/:postid/likes/:uid/unlike", async (req, res) => {
  const data  = req.params;
   let update = await pool.query(
      "UPDATE posts SET likes = array_remove(likes, (SELECT user_id FROM users WHERE uid = $1)) WHERE post_id = $2",
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
