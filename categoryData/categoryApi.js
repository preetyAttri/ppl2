var ct_db = require("./categorySchema");

module.exports = {
  addPost: function(data) {
    return new Promise((res, rej) => {
      console.log("data in api add post", data);
      ct_db.create(data, function(err, result) {
        if (err) {
          rej(err);
          console.log(err);
        } else {
          ct_db.find({}, function(err, result) {
            if (err) {
              rej(err);
              console.log(err);
            } else {
              res(result);
              console.log(result);
            }
          });
          console.log(result);
        }
      });
    });
  },
  getPost: function(data) {
    return new Promise((res, rej) => {
      console.log("data in api get cateegory", data);

      ct_db.find({}, function(err, result) {
        if (err) {
          rej(err);
          console.log(err);
        } else {
          res(result);
          console.log(result);
        }
      });
    });
  },
  checkCategoryName: function(data) {
    return new Promise((res, rej) => {
      ct_db.find({ category: data.category }, function(err, result) {
        if (err) {
          rej(err);
        } else {
          res(result);
        }
      });
    });
  }
};
