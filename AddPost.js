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
  ScrollView
} from "react-native";
import ShowTimeline from "./showTimeline";
import styles from "./styleSheet";
import ImagePicker from "react-native-image-picker";
import { Dropdown } from "react-native-material-dropdown";
export default class AddPost extends React.Component {
  state = {
    avatarSource: null,
    category: "",
    description: "",
    categoryArr: []
  };
  handleCategory = text => {
    this.setState({ category: text });
  };
  handleDescription = text => {
    this.setState({ description: text });
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

        this.setState({
          avatarSource: source
        });
      }
    });
  }
  componentDidMount() {
    fetch("http://192.168.100.97:4002/category/upload", {
      method: "GET"
    })
      .then(response => response.json())
      .then(responseJ => {
        responseJ.map((x, index) => {
          key = { index };
          this.state.categoryArr.push({ value: x.category });
        });
      })
      .catch(e => console.log(e));
  }
  render() {
    return (
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
              {this.state.avatarSource === null ? (
                <Text>Select a Photo</Text>
              ) : (
                <Image style={styles.avatar} source={this.state.avatarSource} />
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
            data={this.state.categoryArr}
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
            {this.props.uploadMsg}
          </Text>
          <TouchableOpacity
            style={styles.goAddCategory}
            onPress={() =>
              this.props.uploadPost(
                this.state.avatarSource,
                this.state.description,
                this.state.category
              )
            }
          >
            <Text style={styles.textSubmit}>Upload</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}
