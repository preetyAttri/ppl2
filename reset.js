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
export default class Reset extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: "",
      confirmPassword: "",
      passwordMsg: "",
      confirmPasswordMsg: ""
    };
  }
  handlePassword = text => {
    this.setState({ password: text });
    if (this.state.password.length < 7) {
      this.setState({ passwordMsg: "minimum 8 character" });
    } else {
      this.setState({ passwordMsg: "" });
    }
  };
  handleConfirmPassword = text => {
    this.setState({ confirmPassword: text });
    if (this.state.confirmPassword.length < 7) {
      this.setState({ confirmPasswordMsg: "minimum 8 character" });
    } else {
      this.setState({ confirmPasswordMsg: "" });
    }
  };
  submit = e => {
    let isAgree = false;
    if (this.state.password.length < 7) {
      this.setState({ passwordMsg: "minimum 8 character" });
    } else {
      this.setState({ passwordMsg: "" });
    }
    if (this.state.confirmPassword.length < 7) {
      this.setState({ confirmPasswordMsg: "minimum 8 character" });
    } else if (this.state.password !== this.state.confirmPassword) {
      this.setState({ confirmPasswordMsg: "should match above password" });
    } else {
      this.setState({ confirmPasswordMsg: "" });
      isAgree = true;
    }

    if (isAgree) {
      Actions.login();
    }
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
            <Text style={styles.errorMsg}>{this.state.passwordMsg}</Text>
            <TextInput
              style={styles.textForget}
              underlineColorAndroid="transparent"
              placeholder="Confirm Password"
              autoCapitalize="none"
              onChangeText={this.handleConfirmPassword}
            />
            <Text style={styles.errorMsg}>{this.state.confirmPasswordMsg}</Text>
            <TouchableOpacity
              style={styles.login}
              onPress={() => this.submit()}
            >
              <Text style={styles.textLogin}>Submit</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.GoRegister} onPress={Actions.login}>
              <Text style={styles.textSubmit}>Login </Text>
            </TouchableOpacity>
          </ImageBackground>
        </View>
      </ScrollView>
    );
  }
}
