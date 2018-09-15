import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  AsyncStorage
} from "react-native";
import SideMenu from "react-native-side-menu";
import Menu from "./menu";
import AddPost from "./AddPost";
import ShowTimeline from "./showTimeline";
import AddCategory from "./AddCategory";
import SinglePost from "./singlePost";
const image = require("./public/images/menu.png");
import { Actions } from "react-native-router-flux";
const styles = StyleSheet.create({
  button: {
    position: "absolute",
    top: 10
  },
  caption: {
    fontSize: 20,
    fontWeight: "bold",
    alignItems: "center"
  },
  container: {
    flex: 1,

    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  }
});

export default class Basic extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);

    this.state = {
      isOpen: false,
      selectedItem: "",
      username: "",
      categoryArr: [],
      categoryMsg: "",
      arr: [],
      singlePost: false,
      uploadMsg: "",
      commentArr: [],
      commentAdded: "",
      latest_first: false,
      most_commented: false
    };
  }
  handleComment = text => {
    this.setState({ commentAdded: text });
  };
  latest_first = () => {
    this.setState({ latest_first: true });
    this.setState({ most_commented: false });
    this.state.arr.sort(function(a, b) {
      a = new Date(a.date);
      b = new Date(b.date);
      return a > b ? -1 : a < b ? 1 : 0;
    });
    this.setState({ arr: this.state.arr });
  };
  //sort all post according to oldest first
  oldest_first = () => {
    this.setState({ latest_first: false });
    this.setState({ most_commented: false });
    this.state.arr.sort(function(a, b) {
      a = new Date(a.date);
      b = new Date(b.date);
      return a < b ? -1 : a > b ? 1 : 0;
    });
    this.setState({ arr: this.state.arr });
  };
  //sort all post according to most commented
  most_commented = () => {
    this.setState({ latest_first: false });
    this.setState({ most_commented: true });
    this.state.arr.sort((a, b) => {
      var x = a.comments.length;
      var y = b.comments.length;
      return y - x;
    });
    this.setState({ arr: this.state.arr });
  };
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen,
      uploadMsg: ""
    });
  }

  updateMenuState(isOpen) {
    console.log("in timeline");
    this.setState({ isOpen });
  }

  onMenuItemSelected = item => {
    this.setState({
      isOpen: false,
      selectedItem: item,
      singlePost: false,
      singlePostId: ""
    });
  };
  _retrieveData = async () => {
    this.setState({ username: await AsyncStorage.getItem("username") });
  };
  toggle_like = id => {
    var data = {
      _id: id,
      username: this.state.username
    };

    fetch("http://192.168.100.97:4002/post/likes", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(responseJ => {
        this.setState({ arr: responseJ });
        if (this.state.latest_first) {
          this.latest_first();
        } else if (this.state.most_commented) {
          this.most_commented();
        }
      })

      .catch(e => console.log(e));
  };
  toggle_unLike = id => {
    var data = {
      _id: id,
      username: this.state.username
    };

    fetch("http://192.168.100.97:4002/post/unLikes", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(responseJ => {
        this.setState({ arr: responseJ });
        if (this.state.latest_first) {
          this.latest_first();
        } else if (this.state.most_commented) {
          this.most_commented();
        }
      })

      .catch(e => console.log(e));
  };

  singlePost = id => {
    this.setState({ singlePost: true, singlePostId: id });
    this.setState({ commentAdded: "" });
  };
  uploadCategory = (file, category) => {
    var data = new FormData();
    data.append("files", file);
    data.append("category", category);

    if (file !== null && category !== "") {
      fetch("http://192.168.100.97:4002/category/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      })
        .then(response => response.json())
        .then(responseJ => {
          if (responseJ == "already there") {
            this.setState({ categoryMsg: "category name already exist" });
          } else {
            this.setState({ categoryArr: responseJ });
            this.setState({ categoryMsg: "category uploaded" });
          }
        })
        .catch(e => console.log(e));
    }
  };
  uploadPost = (file, description, category) => {
    var data = new FormData();
    data.append("username", this.state.username);
    data.append("files", file);
    data.append("description", description);
    data.append("category", category);
    // console.warn(data);
    if (file !== null && description !== "" && category !== "") {
      fetch("http://192.168.100.97:4002/post/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      })
        .then(response => response.json())
        .then(responseJ => {
          this.setState({ arr: responseJ });
          this.setState({ uploadMsg: "Post Uploaded" });
        })
        .catch(e => console.log(e));
    }
  };
  uploadComment = (id, comment) => {
    var data = {
      _id: id,
      comments: this.state.commentAdded,
      commentBy: this.state.username
    };
    if (this.state.commentAdded.length != 0) {
      fetch("http://192.168.100.97:4002/post/addComment", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json"
        },
        body: JSON.stringify(data)
      })
        .then(response => response.json())
        .then(responseJ => {
          this.setState({ arr: responseJ });
        })
        .catch(e => console.log(e));
    }
  };
  componentDidMount() {
    this._retrieveData();

    fetch("http://192.168.100.97:4002/category/upload", {
      method: "GET"
    })
      .then(response => response.json())
      .then(responseJ => {
        this.setState({ categoryArr: responseJ });
      })
      .catch(e => console.log(e));
    fetch("http://192.168.100.97:4002/post/upload", {
      method: "GET"
    })
      .then(response => response.json())
      .then(responseJ => {
        this.setState({ arr: responseJ });
      })
      .catch(e => console.log(e));
  }
  render() {
    const menu = (
      <Menu
        onItemSelected={this.onMenuItemSelected}
        username={this.state.username}
        categoryArr={this.state.categoryArr}
      />
    );

    return (
      <SideMenu
        menu={menu}
        isOpen={this.state.isOpen}
        onChange={isOpen => this.updateMenuState(isOpen)}
      >
        <View style={{ flexDirection: "row" }}>
          <View
            style={{
              width: 40,
              backgroundColor: "#FFA07A"
            }}
          />
          <View>
            {this.state.singlePost ? (
              <ShowTimeline
                currentUser={this.state.username}
                arr={this.state.arr.filter(x => {
                  return x._id === this.state.singlePostId;
                })}
                toggle_like={this.toggle_like}
                toggle_unLike={this.toggle_unLike}
                singlePostCheck={this.state.singlePost}
                uploadComment={this.uploadComment}
                commentAdded={this.state.commentAdded}
                handleComment={this.handleComment}
              />
            ) : this.state.selectedItem === "" ||
            this.state.selectedItem === "YourTimeline" ? (
              <ShowTimeline
                currentUser={this.state.username}
                arr={this.state.arr}
                toggle_like={this.toggle_like}
                toggle_unLike={this.toggle_unLike}
                singlePost={this.singlePost}
                singlePostCheck={this.state.singlePost}
                latest_first={this.latest_first}
                oldest_first={this.oldest_first}
                most_commented={this.most_commented}
                latest_firstCheck={this.state.latest_first}
                most_commentedCheck={this.state.most_commented}
              />
            ) : this.state.selectedItem === "MyUploades" ? (
              <ShowTimeline
                currentUser={this.state.username}
                arr={this.state.arr.filter(x => {
                  return x.username === this.state.username;
                })}
                toggle_like={this.toggle_like}
                toggle_unLike={this.toggle_unLike}
                singlePost={this.singlePost}
                singlePostCheck={this.state.singlePost}
                latest_first={this.latest_first}
                oldest_first={this.oldest_first}
                most_commented={this.most_commented}
                latest_firstCheck={this.state.latest_first}
                most_commentedCheck={this.state.most_commented}
              />
            ) : this.state.selectedItem === "AddPost" ? (
              <AddPost
                uploadPost={this.uploadPost}
                uploadMsg={this.state.uploadMsg}
              />
            ) : this.state.selectedItem === "AddCategory" ? (
              <AddCategory
                categoryMsg={this.state.categoryMsg}
                uploadCategory={this.uploadCategory}
              />
            ) : (
              <ShowTimeline
                currentUser={this.state.username}
                arr={this.state.arr.filter(x => {
                  return x.category === this.state.selectedItem;
                })}
                toggle_like={this.toggle_like}
                toggle_unLike={this.toggle_unLike}
                singlePost={this.singlePost}
                singlePostCheck={this.state.singlePost}
                latest_first={this.latest_first}
                oldest_first={this.oldest_first}
                most_commented={this.most_commented}
                latest_firstCheck={this.state.latest_first}
                most_commentedCheck={this.state.most_commented}
              />
            )}
          </View>
        </View>
        <TouchableOpacity onPress={this.toggle} style={styles.button}>
          <Image source={image} style={{ width: 32, height: 32 }} />
        </TouchableOpacity>
      </SideMenu>
    );
  }
}
