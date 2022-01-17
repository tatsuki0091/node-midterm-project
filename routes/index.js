var express = require("express");
var router = express.Router();
const Article = require("../models/article");
const Comment = require("../models/comment");
const Like = require("../models/like");

/*  top page. */
router.get("/", function (req, res, next) {
  Article.find(function (err, result) {
    if (!err) {
      res.render("index", { title: "top", result });
    } else {
      res.render("error", { title: "error" });
    }
  });
});

// Register page
router.get("/register", function (req, res, next) {
  res.render("register", { title: "register" });
});

router.post("/register", function (req, res, next) {
  const article = new Article({
    title: req.body.title,
    body: req.body.body,
  });

  article
    .save()
    .then(() => {
      res.redirect("/");
    })
    .catch((err) => {
      res.render("error", { title: "error" });
    });
});

// detail
router.get("/:id", async (req, res) => {
  try {
    const detail = await Article.findById(req.params.id);
    const comments = await Comment.find({ article: req.params.id });
    const likes = await Like.find();
    res.render("detail", { title: "detail", detail, comments, likes });
  } catch (err) {
    res.render("error", { title: "error" });
  }
});

// update
router.put("/update", async (req, res) => {
  try {
    await Article.updateOne(
      { _id: req.body.id },
      { $set: { title: req.body.title, body: req.body.body } }
    );
    res.redirect("/");
  } catch (err) {
    res.render("error", { title: "error" });
  }
});

// delete
router.delete("/delete", async (req, res) => {
  await Article.deleteOne({
    _id: req.body.id,
  })
    .then(() => {
      Comment.remove({ article: req.body.id }).exec();
      res.redirect("/");
    })
    .catch((err) => {
      res.render("error", { title: "error" });
    });
});

//comment
router.post("/comment", function (req, res, next) {
  const comment = new Comment({
    comment: req.body.comment,
    article: req.body.articleId,
  });

  comment
    .save()
    .then((data) => {
      res.redirect("/");
    })
    .catch((err) => {
      res.render("error", { title: "error" });
    });
});

//like
router.post("/like", async function (req, res, next) {
  const likes = await Like.find({ commentId: req.body.commentId });

  if (likes.length === 0) {
    const like = new Like({
      like: true,
      commentId: req.body.commentId,
    });
    like
      .save()
      .then(() => {
        res.redirect("/");
      })
      .catch((err) => {
        res.render("error", { title: "error" });
      });
  } else {
    res.redirect("/");
  }
});

module.exports = router;
