let express = require("express");
let router = express.Router();
let postApi = require("./postApi");
var multer = require("multer");
var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "/home/sahyogsharma/Desktop/preety/backend/public/uploads");
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname);
  }
});
console.log(storage.destination);
var upload = multer({ storage: storage });
router.post("/post", (req, res) => {
  res.send("router");
});

router.post("/timeline", async (req, res) => {
  try {
    console.log("fgd");
    let loginData = await postApi.dataForTimeline();
    console.log(loginData);
    res.send(loginData);
  } catch (err) {
    res.send(err);
  }
});
router.post("/category", async (req, res) => {
  try {
    console.log("router+++++++++++++++++ ", req.body.category);
    let data = {
      category: req.body.category
    };
    let loginData = await postApi.dataCategory(data);
    console.log(loginData);
    res.send(loginData);
  } catch (err) {
    res.send(err);
  }
});
router.post("/addComment", async (req, res) => {
  try {
    console.log("single post router+++++++++++++++++ ", req.body._id);
    let data = {
      _id: req.body._id,
      comments: {
        comment: req.body.comments,
        commentBy: req.body.commentBy
      }
    };
    console.log(data);
    let loginData = await postApi.add_Comments(data);
    console.log(loginData);
    res.send(loginData);
  } catch (err) {
    res.send(err);
  }
});

router.post("/likes", async (req, res) => {
  try {
    console.log("single post router likes+++++++++++++++++ ", req.body._id);
    let data = {
      _id: req.body._id,
      username: req.body.username
    };
    console.log(data);
    let loginData;
    loginData = await postApi.like(data);
    console.log("liketoggle" + loginData + "fffffffffffffffffffffff");
    res.send(loginData);
  } catch (err) {
    res.send(err);
  }
});

router.post("/unLikes", async (req, res) => {
  try {
    
    let data = {
      _id: req.body._id,
      username: req.body.username
    };
    console.log(data);
    let loginData;
    loginData = await postApi.unLike(data);
        res.send(loginData);
  } catch (err) {
    res.send(err);
  }
});
router.post("/upload", upload.single("files"), async function(req, res) {
  try {
    console.log("in database");
    console.log(req.body._parts[0][1]);

    let data = {
      username: req.body._parts[0][1],
      description: req.body._parts[2][1],
      category: req.body._parts[3][1],
      img: req.body._parts[1][1].uri
    };
    console.log("data", data);
    var result = await postApi.addPost(data);
    res.send(result);
  } catch (err) {
    res.send(err);
  }
});
router.get("/upload", async function(req, res) {
  try {
    console.log("in upload");
    var result = await postApi.getPost();
    res.send(result);
  } catch (err) {
    res.send(err);
  }
});

module.exports = router;
