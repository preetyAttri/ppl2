import React from "react";
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  PixelRatio,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
  AsyncStorage
} from "react-native";
import {
  Icon,
  Button,
  Container,
  Header,
  Content,
  Left,
  Right
} from "native-base";
import ShowTimeline from "./showTimeline";
import styles from "./styleSheet";
import ImagePicker from "react-native-image-picker";
import { Dropdown } from "react-native-material-dropdown";
import Store from "./store/Store";
import { connect } from "react-redux";
import * as actionCreators from "./actions";
const image = require("./public/images/menu.png");
let username = "";
class AddPost extends React.Component {
  toggleDrawer = () => {
    this.props.navigation.toggleDrawer();
  };
  handleCategory = text => {
    Store.dispatch(actionCreators.ChangeCategory(text));
  };
  handleDescription = text => {
    Store.dispatch(actionCreators.ChangeDescription(text));
  };
  selectPhotoTapped() {
    const options = {
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500,
      storageOptions: {
        skipBackup: true
      }
    };

    ImagePicker.showImagePicker(options, response => {
      if (response.didCancel) {
      } else if (response.error) {
      } else if (response.customButton) {
      } else {
        let source = { uri: response.uri };

        // You can also display the image using data:
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };
        Store.dispatch(actionCreators.ChangeFile(source));
      }
    });
  }

  _retrieveData = async () => {
    username = await AsyncStorage.getItem("username");
  };
  uploadPost = (file, description, category) => {
    this._retrieveData();
    var data = new FormData();

    data.append("username", username);
    data.append("files", this.props.data.avatarSource);
    data.append("description", this.props.data.description);
    data.append("category", this.props.data.category);
    // console.warn(data);
    if (
      this.props.data.avatarSource !== null &&
      this.props.data.description !== "" &&
      this.props.data.category !== ""
    ) {
      fetch("http://192.168.100.97:4002/post/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      })
        .then(response => response.json())
        .then(responseJ => {
          Store.dispatch(actionCreators.UpdateArray(responseJ));
          Store.dispatch(actionCreators.ChangeUploadMsg("Post Uploaded"));
          this.props.navigation.navigate("DrawerNavigation");
        })
        .catch(e => console.log(e));
    }
  };

  componentDidMount() {
    Store.dispatch(actionCreators.ChangeUploadMsg(""));
    fetch("http://192.168.100.97:4002/category/upload", {
      method: "GET"
    })
      .then(response => response.json())
      .then(responseJ => {
        responseJ.map((x, index) => {
          key = { index };
          this.props.data.categoryArr.push({ value: x.category });
        });
      })
      .catch(e => console.log(e));
  }
  render() {
    return (
      <Container>
        <Header
          style={{ backgroundColor: "grey", justifyContent: "space-between" }}
        >
          <Left>
            <TouchableOpacity onPress={this.toggleDrawer}>
              <Image
                source={image}
                style={{
                  width: 32,
                  height: 32
                }}
              />
            </TouchableOpacity>
          </Left>
          <Right>
            <Image source={require("./public/images/logo.png")} />
          </Right>
        </Header>
        <ScrollView>
          <View style={styles.addPostContainer}>
            <Text style={{ fontSize: 30, color: "black" }}>Add Post</Text>
            <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>
              <View
                style={[
                  styles.avatar,
                  styles.avatarContainer,
                  { marginBottom: 20, marginTop: 20 }
                ]}
              >
                {this.props.data.avatarSource === null ? (
                  <Text>Select a Photo</Text>
                ) : (
                  <Image
                    style={styles.avatar}
                    source={this.props.data.avatarSource}
                  />
                )}
              </View>
            </TouchableOpacity>
            <Dropdown
              containerStyle={{
                width: 350,
                marginTop: 20
              }}
              inputContainerStyle={{
                borderBottomColor: "orange",
                borderBottomWidth: 3
              }}
              label="Category"
              data={this.props.data.categoryArr}
              onChangeText={this.handleCategory}
            />
            <TextInput
              style={styles.CategoryName}
              underlineColorAndroid="transparent"
              placeholder="Description"
              autoCapitalize="none"
              onChangeText={this.handleDescription}
            />
            <Text style={{ paddingTop: 20, color: "green", fontSize: 20 }}>
              {this.props.data.uploadMsg}
            </Text>
            <TouchableOpacity
              style={styles.goAddCategory}
              onPress={this.uploadPost}
            >
              <Text style={styles.textSubmit}>Upload</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </Container>
    );
  }
}
const mapStateToProps = state => {
  return {
    data: state.ReducerTimeline
  };
};
export default connect(mapStateToProps)(AddPost);
