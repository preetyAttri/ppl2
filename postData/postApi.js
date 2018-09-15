var post_db = require("./postSchema");

module.exports = {
  addPost: function(data) {
    return new Promise((res, rej) => {
      console.log("data in api", data);
      post_db.create(data, function(err, result) {
        if (err) {
          rej(err);
          console.log(err);
        } else {
          post_db.find({}, function(err, result) {
            if (err) {
              rej(err);
              console.log(err);
            } else {
              res(result);
              console.log(result);
            }
          });
        }
      });
    });
  },
  getPost: function() {
    return new Promise((res, rej) => {
      console.log("data in get upload api");
      post_db.find({}, function(err, result) {
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
  dataForTimeline: function() {
    return new Promise((res, rej) => {
      post_db.find({}, function(err, result) {
        if (err) {
          rej(err);
          console.log(err);
        } else {
          res(result);
          console.log("from database" + result);
        }
      });
    });
  },
  dataCategory: function(data) {
    return new Promise((res, rej) => {
      post_db.find({ category: data.category }, function(err, result) {
        if (err) {
          rej(err);
          console.log(err);
        } else {
          res(result);
          console.log("from database" + result);
        }
      });
    });
  },
  add_Comments: function(data) {
    return new Promise((res, rej) => {
      post_db.update(
        { _id: data._id },
        {
          $push: {
            comments: data.comments
          }
        },
        function(err, result) {
          if (err) {
            rej(err);
            console.log(err);
          } else {
            post_db.find({}, function(err, result) {
              if (err) {
                rej(err);
                console.log(err);
              } else {
                res(result);
                console.log("from database" + result);
              }
            });
          }
        }
      );
    });
  },
  like: function(data) {
    return new Promise((res, rej) => {
      console.log("like api");
      post_db.find(
        { $and: [{ _id: data._id }, { likes: { $in: [data.username] } }] },
        function(err, result) {
          if (err) {
            rej(err);
            console.log(err);
          } else {
            console.log(result);
            if (Object.keys(result).length === 0) {
              post_db.findOneAndUpdate(
                { _id: data._id },
                {
                  $push: {
                    likes: data.username
                  }
                },
                function(err, result) {
                  if (err) {
                    rej(err);
                    console.log(err);
                  } else {
                    console.log("liked");
                    post_db.find({}, function(err, result) {
                      if (err) {
                        rej(err);
                        console.log(err);
                      } else {
                        res(result);
                        console.log("from database" + result + "jffffffffff");
                      }
                    });
                  }
                }
              );
            } else {
              post_db.findOneAndUpdate(
                { _id: data._id },
                {
                  $pull: {
                    likes: data.username
                  }
                },
                function(err, result) {
                  if (err) {
                    rej(err);
                    console.log(err);
                  } else {
                    post_db.find({}, function(err, result) {
                      if (err) {
                        rej(err);
                        console.log(err);
                      } else {
                        res(result);
                        console.log("from database" + result + "jffffffffff");
                      }
                    });
                  }
                }
              );
            }
          }
        }
      );
    });
  },
  unLike: function(data) {
    return new Promise((res, rej) => {
      console.log("like api");
      post_db.find(
        { $and: [{ _id: data._id }, { unLikes: { $in: [data.username] } }] },
        function(err, result) {
          if (err) {
            rej(err);
            console.log(err);
          } else {
            console.log(result);
            if (Object.keys(result).length === 0) {
              post_db.findOneAndUpdate(
                { _id: data._id },
                {
                  $push: {
                    unLikes: data.username
                  }
                },
                function(err, result) {
                  if (err) {
                    rej(err);
                    console.log(err);
                  } else {
                    post_db.find({}, function(err, result) {
                      if (err) {
                        rej(err);
                        console.log(err);
                      } else {
                        res(result);
                      }
                    });
                  }
                }
              );
            } else {
              post_db.findOneAndUpdate(
                { _id: data._id },
                {
                  $pull: {
                    unLikes: data.username
                  }
                },
                function(err, result) {
                  if (err) {
                    rej(err);
                    console.log(err);
                  } else {
                    post_db.find({}, function(err, result) {
                      if (err) {
                        rej(err);
                        console.log(err);
                      } else {
                        res(result);
                        console.log("from database" + result + "jffffffffff");
                      }
                    });
                  }
                }
              );
            }
          }
        }
      );
    });
  }
};
