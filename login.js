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
import Store from "./store/Store";
import { connect } from "react-redux";
import * as actionCreators from "./actions";
class Login extends Component {
  constructor(props) {
    super(props);
  }

  handleUsername = text => {
    Store.dispatch(actionCreators.ChangeUserNameMsg(""));
    Store.dispatch(actionCreators.inputChange("username", text));
  };
  handlePassword = text => {
    Store.dispatch(actionCreators.ChangeUserNameMsg(""));
    Store.dispatch(actionCreators.inputChange("password", text));
    if (
      this.props.data.password.length < 7 &&
      this.props.data.password.length != 0
    ) {
      Store.dispatch(actionCreators.ChangePasswordMsg("Enter strong password"));
    } else {
      Store.dispatch(actionCreators.ChangePasswordMsg(""));
    }
  };
  login = () => {
    var isUserName = false,
      isPassword = false;
    if (this.props.data.username.length === 0) {
      console.warn(this.props.data.username);
      Store.dispatch(actionCreators.ChangeUserNameMsg("Enter User Name"));
      isUserName = false;
    } else {
      for (let i = 0; i < this.props.data.username.length; i++) {
        if (this.props.data.username[i] == " ") {
          Store.dispatch(
            actionCreators.ChangeUserNameMsg("Whitespace not allowed")
          );
          isUserName = false;
          break;
        } else {
          Store.dispatch(actionCreators.ChangeUserNameMsg(""));
          isUserName = true;
        }
      }
    }
    if (this.props.data.password.length === 0) {
      Store.dispatch(actionCreators.ChangePasswordMsg("Enter password"));

      isPassword = false;
    } else if (this.props.data.passwordMsg === "Enter strong password") {
      Store.dispatch(actionCreators.ChangePasswordMsg("Enter strong password"));
      isPassword = false;
    } else {
      for (let i = 0; i < this.props.data.password.length; i++) {
        if (this.props.data.password[i] == " ") {
          Store.dispatch(
            actionCreators.ChangePasswordMsg("Whitespace not allowed")
          );
          isPassword = false;
          break;
        } else {
          Store.dispatch(actionCreators.ChangePasswordMsg(""));
          isPassword = true;
        }
      }
    }

    if (isUserName && isPassword) {
      fetch("http://192.168.100.97:4002/login", {
        method: "POST",
        mode: "cors",
        body: JSON.stringify({
          username: this.props.data.username
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
                username: this.props.data.username
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
                      username: this.props.data.username,
                      password: this.props.data.password
                    }),
                    headers: { "Content-Type": "application/json" }
                  })
                    .then(response => response.json())
                    .then(responseJ => {
                      if (Object.keys(responseJ).length !== 0) {
                        Store.dispatch(
                          actionCreators.ChangeUserNameMsg("Exist")
                        );

                        this._storeData();
                        this.props.navigation.navigate("DrawerNavigation");
                      } else {
                        Store.dispatch(
                          actionCreators.ChangeUserNameMsg("Password incorrect")
                        );
                      }
                    })
                    .catch(e => console.log("err", e));
                } else {
                  Store.dispatch(
                    actionCreators.ChangeUserNameMsg("Not Verified")
                  );
                }
              })
              .catch(e => console.log("err", e));
          } else {
            Store.dispatch(actionCreators.ChangeUserNameMsg("Not Exist"));
          }
        })
        .catch(e => console.log("err", e));
    }
  };
  goRegister = () => {
    this.props.navigation.navigate("Register");
  };
  goForget = () => {
    this.props.navigation.navigate("Forget");
  };
  _storeData = async () => {
    try {
      await AsyncStorage.setItem("username", this.props.data.username);
    } catch (error) {
      console.warn("error");
    }
  };
  static navigationOptions = {
    title: "Login",
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
              style={styles.text}
              underlineColorAndroid="transparent"
              placeholder="Username"
              autoCapitalize="none"
              onChangeText={this.handleUsername}
            />
            <Text style={styles.errorMsg}>{this.props.data.userNameMsg}</Text>
            <TextInput
              style={styles.text}
              secureTextEntry={true}
              underlineColorAndroid="transparent"
              placeholder="Password"
              autoCapitalize="none"
              onChangeText={this.handlePassword}
            />
            <Text style={styles.errorMsg}>{this.props.data.passwordMsg}</Text>
            <Text
              style={{ color: "black", padding: 10 }}
              onPress={this.goForget}
            >
              Forget password
            </Text>
            <TouchableOpacity style={styles.login} onPress={() => this.login()}>
              <Text style={styles.textLogin}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.GoRegister}
              onPress={this.goRegister}
            >
              <Text style={styles.textSubmit}>Create New Account </Text>
            </TouchableOpacity>
          </ImageBackground>
        </View>
      </ScrollView>
    );
  }
}
const mapStateToProps = state => {
  return {
    data: state.ReducerLogin
  };
};
export default connect(mapStateToProps)(Login);
