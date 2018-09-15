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
  ImageBackground,
  AsyncStorage
} from "react-native";
import { Actions } from "react-native-router-flux";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      userNameMsg: "",
      passwordMsg: ""
    };
  }

  handleUsername = text => {
    this.setState({ userNameMsg: "" });
    this.setState({ username: text });
  };
  handlePassword = text => {
    this.setState({ userNameMsg: "" });
    this.setState({ password: text });
    if (this.state.password.length < 7 && this.state.password.length != 0) {
      this.setState({ passwordMsg: "Enter strong password" });
    } else {
      this.setState({ passwordMsg: "" });
    }
  };
  login = () => {
    var isUserName = false,
      isPassword = false;
    if (this.state.username.length === 0) {
      this.setState({ userNameMsg: "Enter User Name" });
      isUserName = false;
    } else {
      for (let i = 0; i < this.state.username.length; i++) {
        if (this.state.username[i] == " ") {
          this.setState({ userNameMsg: "Whitespace not allowed" });
          isUserName = false;
          break;
        } else {
          this.setState({ userNameMsg: "" });
          isUserName = true;
        }
      }
    }
    if (this.state.password.length === 0) {
      this.setState({ passwordMsg: "Enter password" });
      isPassword = false;
    } else if (this.state.passwordMsg === "Enter strong password") {
      this.setState({ passwordMsg: "Enter strong password" });
      isPassword = false;
    } else {
      for (let i = 0; i < this.state.password.length; i++) {
        if (this.state.password[i] == " ") {
          this.setState({ passwordMsg: "Whitespace not allowed" });
          isPassword = false;
          break;
        } else {
          this.setState({ passwordMsg: "" });
          isPassword = true;
        }
      }
    }

    if (isUserName && isPassword) {
      fetch("http://192.168.100.97:4002/login", {
        method: "POST",
        mode: "cors",
        body: JSON.stringify({
          username: this.state.username
        }),
        headers: { "Content-Type": "application/json" }
      })
        .then(response => response.json())
        .then(responseJ => {
          if (Object.keys(responseJ).length !== 0) {
            fetch("http://192.168.100.97:4002/login/verify", {
              method: "POST",
              mode: "cors",
              body: JSON.stringify({
                username: this.state.username
              }),
              headers: { "Content-Type": "application/json" }
            })
              .then(response => response.json())
              .then(responseJ => {
                if (Object.keys(responseJ).length !== 0) {
                  fetch("http://192.168.100.97:4002/login/password", {
                    method: "POST",
                    mode: "cors",
                    body: JSON.stringify({
                      username: this.state.username,
                      password: this.state.password
                    }),
                    headers: { "Content-Type": "application/json" }
                  })
                    .then(response => response.json())
                    .then(responseJ => {
                      if (Object.keys(responseJ).length !== 0) {
                        this.setState({ userNameMsg: "Exist" });
                        this._storeData();
                        Actions.timeline();
                      } else {
                        this.setState({ userNameMsg: "Password incorrect" });
                      }
                    })
                    .catch(e => console.log("err", e));
                } else {
                  this.setState({ userNameMsg: "Not Verified" });
                }
              })
              .catch(e => console.log("err", e));
          } else {
            this.setState({ userNameMsg: "Not Exist" });
          }
        })
        .catch(e => console.log("err", e));
    }
  };
  _storeData = async () => {
    try {
      await AsyncStorage.setItem("username", this.state.username);
    } catch (error) {
      console.warn("errrrrrrr");
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
              style={styles.text}
              underlineColorAndroid="transparent"
              placeholder="Username"
              autoCapitalize="none"
              onChangeText={this.handleUsername}
            />
            <Text style={styles.errorMsg}>{this.state.userNameMsg}</Text>
            <TextInput
              style={styles.text}
              secureTextEntry={true}
              underlineColorAndroid="transparent"
              placeholder="Password"
              autoCapitalize="none"
              onChangeText={this.handlePassword}
            />
            <Text style={styles.errorMsg}>{this.state.passwordMsg}</Text>
            <Text
              style={{ color: "black", padding: 10 }}
              onPress={Actions.forget}
            >
              Forget password
            </Text>
            <TouchableOpacity style={styles.login} onPress={() => this.login()}>
              <Text style={styles.textLogin}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.GoRegister}
              onPress={Actions.register}
            >
              <Text style={styles.textSubmit}>Create New Account </Text>
            </TouchableOpacity>
          </ImageBackground>
        </View>
      </ScrollView>
    );
  }
}
