import styles from "./styleSheet";
import React, { Component } from "react";
import axios from "axios";
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
export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      email: "",
      firstName: "",
      lastName: "",
      userNameMsg: "",
      passwordMsg: "",
      emailMsg: "",
      firstNameMsg: "",
      lastNameMsg: "",
      isAgree: false
    };
  }

  handleUsername = text => {
    this.setState({ userNameMsg: "" });
    this.setState({ username: text });
  };
  handleFirstName = text => {
    this.setState({ firstNameMsg: "" });
    this.setState({ firstName: text });
  };
  handleLastName = text => {
    this.setState({ lastNameMsg: "" });
    this.setState({ lastName: text });
  };
  handleEmail = text => {
    this.setState({ email: text });
    var reg = RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);

    var emailValid = reg.test(text);
    if (!emailValid) {
      this.setState({ emailMsg: "Enter valid mail" });
    } else {
      this.setState({ emailMsg: "" });
    }
  };
  handlePassword = text => {
    this.setState({ password: text });
    if (this.state.password.length < 7 && this.state.password.length != 0) {
      this.setState({ passwordMsg: "Enter strong password" });
    } else {
      this.setState({ passwordMsg: "" });
    }
  };
  _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem("username");
      if (value !== null) {
        // We have data!!
        Actions.timeline();
      } else {
        Actions.login();
      }
    } catch (error) {
      // Error retrieving data
    }
  };

  submit = () => {
    var isUserName = false,
      isEmail = false,
      isPassword = false,
      isFName = false,
      isLName = false;
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
    if (this.state.email.length === 0) {
      this.setState({ emailMsg: "Enter Email Address" });
      isEmail = false;
    } else if (this.state.emailMsg === "Enter valid mail") {
      this.setState({ emailMsg: "Enter valid mail" });
      isEmail = false;
    } else {
      this.setState({ emailMsg: "" });
      isEmail = true;
    }
    if (this.state.firstName.length === 0) {
      this.setState({ firstNameMsg: "Enter First Name" });
      isFName = false;
    } else {
      for (let i = 0; i < this.state.firstName.length; i++) {
        if (this.state.firstName[i] == " ") {
          this.setState({ firstNameMsg: "Whitespace not allowed" });
          isFName = false;
          break;
        } else {
          this.setState({ firstNameMsg: "" });
          isFName = true;
        }
      }
    }
    if (this.state.lastName.length === 0) {
      this.setState({ lastNameMsg: "Enter Last Name" });
      isLName = false;
    } else {
      for (let i = 0; i < this.state.lastName.length; i++) {
        if (this.state.lastName[i] == " ") {
          this.setState({ lastNameMsg: "Whitespace not allowed" });
          isLName = false;
          break;
        } else {
          this.setState({ lastNameMsg: "" });
          isLName = true;
        }
      }
    }
    if (isUserName && isEmail && isPassword && isFName & isLName) {
      fetch("http://192.168.100.97:4002/signUp", {
        method: "POST",
        mode: "cors",
        body: JSON.stringify({
          username: this.state.username,
          password: this.state.password,
          email: this.state.email,
          firstName: this.state.firstName,
          lastName: this.state.lastName
        }),
        headers: { "Content-Type": "application/json" }
      })
        .then(response => response.json())
        .then(responseJ => {
          if (responseJ == "already there") {
            this.setState({ userNameMsg: "Username Already exist" });
          } else {
            Alert.alert("Mail is sent to your registered Mail plz verify");
          }
        })
        .catch(e => console.log(e));
    }
  };

  render() {
    return (
      <ScrollView>
        <View style={{ backgroundColor: "white" }}>
          <ImageBackground
            style={{ minHeight: 550, width: 400, opacity: 0.7 }}
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
              underlineColorAndroid="transparent"
              placeholder="Email"
              autoCapitalize="none"
              onChangeText={this.handleEmail}
            />
            <Text style={styles.errorMsg}>{this.state.emailMsg}</Text>
            <TextInput
              style={styles.text}
              secureTextEntry={true}
              underlineColorAndroid="transparent"
              placeholder="Password"
              autoCapitalize="none"
              onChangeText={this.handlePassword}
            />
            <Text style={styles.errorMsg}>{this.state.passwordMsg}</Text>
            <TextInput
              style={styles.text}
              underlineColorAndroid="transparent"
              placeholder="FirstName"
              autoCapitalize="none"
              onChangeText={this.handleFirstName}
            />
            <Text style={styles.errorMsg}>{this.state.firstNameMsg}</Text>
            <TextInput
              style={styles.text}
              underlineColorAndroid="transparent"
              placeholder="LastName"
              autoCapitalize="none"
              onChangeText={this.handleLastName}
            />
            <Text style={styles.errorMsg}>{this.state.lastNameMsg}</Text>
            <TouchableOpacity
              style={styles.submit}
              onPress={() => this.submit()}
            >
              <Text style={styles.textSubmit}>Submit</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.GoLogin}
              onPress={this._retrieveData}
            >
              <Text style={styles.textSubmit}> Login </Text>
            </TouchableOpacity>
          </ImageBackground>
        </View>
      </ScrollView>
    );
  }
}
