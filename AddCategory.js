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
import styles from "./styleSheet";
import ImagePicker from "react-native-image-picker";

export default class App extends React.Component {
  state = {
    avatarSource: null,
    addCategory: ""
  };
  handleCategory = text => {
    this.setState({ addCategory: text });
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

  render() {
    return (
      <ScrollView>
        <View style={[styles.addPostContainer]}>
          <Text style={{ fontSize: 30, color: "black" }}>Add Category</Text>

          <View style={{ alignItems: "center" }}>
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
                  <Image
                    style={styles.avatar}
                    source={this.state.avatarSource}
                  />
                )}
              </View>
            </TouchableOpacity>
            <TextInput
              style={styles.CategoryName}
              underlineColorAndroid="transparent"
              placeholder="categoryName"
              autoCapitalize="none"
              onChangeText={this.handleCategory}
            />
            <Text style={[styles.errorMsg, { fontSize: 20 }]}>
              {this.props.categoryMsg}
            </Text>
            <TouchableOpacity
              style={[styles.goAddCategory]}
              onPress={() =>
                this.props.uploadCategory(
                  this.state.avatarSource,
                  this.state.addCategory
                )
              }
            >
              <Text style={styles.textSubmit}>Upload Category</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    );
  }
}
