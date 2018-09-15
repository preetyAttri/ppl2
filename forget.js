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
export default class Forget extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      emailMsg: ""
    };
  }
  handleChange = text => {
    this.setState({ email: text });

    var reg = RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);

    var emailValid = reg.test(text);
    if (!emailValid) {
      this.setState({ emailMsg: "Enter valid mail" });
    } else {
      this.setState({ emailMsg: "" });
    }
  };
  submit = e => {
    let isAgree = false;

    var reg = RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);

    var emailValid = reg.test(this.state.email);
    if (this.state.email.length == 0) {
      this.setState({ emailMsg: "Enter Email" });
    } else if (!emailValid) {
      this.setState({ emailMsg: "Enter valid mail" });
    } else {
      isAgree = true;
      this.setState({ emailMsg: "" });
    }
    if (isAgree) {
      fetch("http://192.168.100.97:4002/forget", {
        method: "POST",
        mode: "cors",
        body: JSON.stringify({
          email: this.state.email
        }),
        headers: { "Content-Type": "application/json" }
      })
        .then(response => response.json())
        .then(responseJ => {
          if (responseJ) {
            this.setState({ emailMsg: "mail sent to your mail" });
          } else {
            this.setState({
              emailMsg: "Not Exist"
            });
          }
        })
        .catch(e => console.log(e));
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
              placeholder="Email"
              autoCapitalize="none"
              onChangeText={this.handleChange}
            />

            <Text style={styles.errorMsg}>{this.state.emailMsg}</Text>
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
