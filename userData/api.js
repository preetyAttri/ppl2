var user_db = require("./schema");
var transporter = require("../nodemailer");
module.exports = {
  createNewUser: function(data) {
    return new Promise((res, rej) => {
      console.log("data in new user api ", data);
      user_db.create(data, function(err, result) {
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
  checkUsername: function(data) {
    return new Promise((res, rej) => {
      user_db.find({ username: data.username }, function(err, result) {
        if (err) {
          rej(err);
        } else {
          res(result);
        }
      });
    });
  },
  verifyNewUser: function(data) {
    return new Promise((res, rej) => {
      console.log("data in verify api", data);
      user_db.updateOne(
        { username: data.username },
        { $set: { verified: true } },
        function(err, result) {
          if (err) {
            rej(err);
          } else {
            console.log(result);
            res(result);
          }
        }
      );
    });
  },
  loginUser: function(data) {
    return new Promise((res, rej) => {
      console.log("data in api loginUser", data);
      user_db.find({ username: data.username }, function(err, result) {
        if (err) {
          rej(err);
        } else {
          if (Object.keys(result).length === 0) {
            res(result);
            console.log("Not exist");
          } else {
            console.log("Exist");

            res(result);
          }
        }
      });
    });
  },

  loginUserPassword: function(data) {
    return new Promise((res, rej) => {
      console.log("data in api loginUser", data);
      user_db.find(
        { username: data.username, password: data.password },
        function(err, result) {
          if (err) {
            rej(err);
          } else {
            if (Object.keys(result).length === 0) {
              res(result);
              console.log("Not exist");
            } else {
              console.log("Exist");

              res(result);
            }
          }
        }
      );
    });
  },
  loginUserVerification: function(data) {
    return new Promise((res, rej) => {
      console.log("data in api loginUser", data);
      user_db.find({ username: data.username, verified: true }, function(
        err,
        result
      ) {
        if (err) {
          rej(err);
        } else {
          if (Object.keys(result).length === 0) {
            res(result);
            console.log("Not verified");
          } else {
            console.log("verified");
            res(result);
          }
        }
      });
    });
  },
  forgetPassword: function(data, mailOptions) {
    return new Promise((res, rej) => {
      console.log("data in api forgetPassword", data);
      user_db.find({ email: data.email }, function(err, result) {
        if (err) {
          rej(err);
        } else {
          if (Object.keys(result).length === 0) {
            res(result);
          } else {
            console.log(result);
            console.log("Exist");
            var mailOptions = {
              from: "Preety",
              to: data.email,
              subject: "Sending Email using Node.js",
              text: "Verify",
              html:
                '<a href="http://localhost:3000/reset/' +
                result[0].email +
                '">Click here to reset  </a>'
            };
            var mailOption = transporter.sendMail(mailOptions, function(
              error,
              info
            ) {
              if (error) {
                console.log(error);
              } else {
                console.log("Email sent: " + info.response);
              }
            });
            res(result);
          }
        }
      });
    });
  },
  send_mail: function(mailOptions) {
    var mailOption = transporter.sendMail(mailOptions, function(error, info) {
      if (error) {
        console.log("error here" + error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
  }
};
