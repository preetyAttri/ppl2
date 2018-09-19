import styles from "./styleSheet";
import React, { Component } from "react";
import {
  Platform,
  TouchableOpacity,
  TextInput,
  View,
  Text,
  StyleSheet,
  Alert,
  ScrollView,
  Image,
  WebView,
  ImageBackground
} from "react-native";
import { Actions } from "react-native-router-flux";

import Store from "./store/Store";
import { connect } from "react-redux";
import * as actionCreators from "./actions";
class Reset extends Component {
  constructor(props) {
    super(props);
  }
  handlePassword = text => {
    Store.dispatch(actionCreators.inputChange("password", text));

    if (this.props.data.password.length < 7) {
      Store.dispatch(actionCreators.ChangePasswordMsg("minimum 8 character"));
    } else {
      Store.dispatch(actionCreators.ChangePasswordMsg(""));
    }
  };
  handleConfirmPassword = text => {
    Store.dispatch(actionCreators.inputChange("confirmPassword", text));
    if (this.props.data.confirmPassword.length < 7) {
      Store.dispatch(
        actionCreators.ChangeConfirmPasswordMsg("minimum 8 character")
      );
    } else {
      Store.dispatch(actionCreators.ChangeConfirmPasswordMsg(""));
    }
  };
  submit = e => {
    let isAgree = false;
    if (this.props.data.password.length < 7) {
      Store.dispatch(actionCreators.ChangepasswordMsg("minimum 8 character"));
    } else {
      this.setState({ passwordMsg: "" });
    }
    if (this.props.data.confirmPassword.length < 7) {
      Store.dispatch(
        actionCreators.ChangeConfirmPasswordMsg("minimum 8 character")
      );
    } else if (this.props.data.password !== this.props.data.confirmPassword) {
      Store.dispatch(
        actionCreators.ChangeConfirmPasswordMsg("should match above password")
      );
    } else {
      Store.dispatch(actionCreators.ChangeConfirmPasswordMsg(""));
      isAgree = true;
    }

    if (isAgree) {
      this.props.navigation.navigate("Login");
    }
  };

  static navigationOptions = {
    title: "Reset",
    headerRight: <Image source={require("./public/images/logo.png")} />,
    headerStyle: {
      backgroundColor: "grey"
    },

    headerTintColor: "#fff"
  };
  render() {
    return (
      <ScrollView>
        <View>
          <ImageBackground
            style={{ height: 500, width: 400, opacity: 0.7 }}
            source={require("./public/images/img_9.png")}
          >
            <TextInput
              style={styles.textForget}
              underlineColorAndroid="transparent"
              placeholder="Password"
              autoCapitalize="none"
              onChangeText={this.handlePassword}
            />
            <Text style={styles.errorMsg}>{this.props.data.passwordMsg}</Text>
            <TextInput
              style={styles.textForget}
              underlineColorAndroid="transparent"
              placeholder="Confirm Password"
              autoCapitalize="none"
              onChangeText={this.handleConfirmPassword}
            />
            <Text style={styles.errorMsg}>
              {this.props.data.confirmPasswordMsg}
            </Text>
            <TouchableOpacity
              style={styles.login}
              onPress={() => this.submit()}
            >
              <Text style={styles.textLogin}>Submit</Text>
            </TouchableOpacity>
          </ImageBackground>
        </View>
      </ScrollView>
    );
  }
}
const mapStateToProps = state => {
  return {
    data: state.ReducerReset
  };
};
export default connect(mapStateToProps)(Reset);
