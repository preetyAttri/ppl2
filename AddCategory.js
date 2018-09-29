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
import {
  Icon,
  Button,
  Container,
  Header,
  Content,
  Left,
  Right
} from "native-base";
const image = require("./public/images/menu.png");
import styles from "./styleSheet";
import ImagePicker from "react-native-image-picker";
import Store from "./store/Store";
import { connect } from "react-redux";
import * as actionCreators from "./actions";
class AddCategory extends React.Component {
  toggleDrawer = () => {
    this.props.navigation.toggleDrawer();
  };
  handleCategory = text => {
    Store.dispatch(actionCreators.ChangeCategory("text"));
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
                  {this.props.state.avatarSource === null ? (
                    <Text>Select a Photo</Text>
                  ) : (
                    <Image
                      style={styles.avatar}
                      source={this.props.state.avatarSource}
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
                    this.props.state.avatarSource,
                    this.props.state.addCategory
                  )
                }
              >
                <Text style={styles.textSubmit}>Upload Category</Text>
              </TouchableOpacity>
            </View>
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
export default connect(mapStateToProps)(AddCategory);
