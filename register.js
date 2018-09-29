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
import Header from "./header";
import Store from "./store/Store";
import { connect } from "react-redux";
import * as actionCreators from "./actions";
import ZendeskSupport from "react-native-zendesk-support";
class Register extends Component {
  constructor(props) {
    super(props);
  }

  handleUsername = text => {
    Store.dispatch(actionCreators.ChangeUserNameMsg(""));
    Store.dispatch(actionCreators.inputChange("username", text));
  };
  handleFirstName = text => {
    Store.dispatch(actionCreators.ChangeFirstNameMsg(""));
    Store.dispatch(actionCreators.inputChange("firstName", text));
  };
  handleLastName = text => {
    Store.dispatch(actionCreators.ChangeLastNameMsg(""));
    Store.dispatch(actionCreators.inputChange("lastName", text));
  };
  handleEmail = text => {
    Store.dispatch(actionCreators.inputChange("email", text));

    var reg = RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);

    var emailValid = reg.test(text);
    if (!emailValid) {
      Store.dispatch(actionCreators.ChangeEmailMsg("Enter valid mail"));
    } else {
      Store.dispatch(actionCreators.ChangeEmailMsg(""));
    }
  };
  handlePassword = text => {
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
  _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem("username");
      if (value !== null) {
        // We have data!!
        this.props.navigation.navigate("DrawerNavigation");
      } else {
        this.props.navigation.navigate("Login");
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
    if (this.props.data.username.length === 0) {
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
    if (this.props.data.email.length === 0) {
      Store.dispatch(actionCreators.ChangeEmailMsg("Enter Email Address"));
      isEmail = false;
    } else if (this.props.data.emailMsg === "Enter valid mail") {
      Store.dispatch(actionCreators.ChangeEmailMsg("Enter valid mail"));
      isEmail = false;
    } else {
      Store.dispatch(actionCreators.ChangeEmailMsg(""));
      isEmail = true;
    }
    if (this.props.data.firstName.length === 0) {
      Store.dispatch(actionCreators.ChangeFirstNameMsg("Enter First Name"));
      isFName = false;
    } else {
      for (let i = 0; i < this.props.data.firstName.length; i++) {
        if (this.props.data.firstName[i] == " ") {
          Store.dispatch(
            actionCreators.ChangeFirstNameMsg("Whitespace not allowed")
          );
          isFName = false;
          break;
        } else {
          Store.dispatch(actionCreators.ChangeFirstNameMsg(""));
          isFName = true;
        }
      }
    }
    if (this.props.data.lastName.length === 0) {
      Store.dispatch(actionCreators.ChangeLastNameMsg("Enter Last Name"));
      isLName = false;
    } else {
      for (let i = 0; i < this.props.data.lastName.length; i++) {
        if (this.props.data.lastName[i] == " ") {
          Store.dispatch(
            actionCreators.ChangeLastNameMsg("Whitespace not allowed")
          );
          isLName = false;
          break;
        } else {
          Store.dispatch(actionCreators.ChangeLastNameMsg(""));
          isLName = true;
        }
      }
    }
    if (isUserName && isEmail && isPassword && isFName & isLName) {
      fetch("http://192.168.100.97:4002/signUp", {
        method: "POST",
        mode: "cors",
        body: JSON.stringify({
          username: this.props.data.username,
          password: this.props.data.password,
          email: this.props.data.email,
          firstName: this.props.data.firstName,
          lastName: this.props.data.lastName
        }),
        headers: { "Content-Type": "application/json" }
      })
        .then(response => response.json())
        .then(responseJ => {
          if (responseJ == "already there") {
            Store.dispatch(
              actionCreators.ChangeUserNameMsg("Username Already exist")
            );
          } else {
            Alert.alert("Mail is sent to your registered Mail plz verify");
          }
        })
        .catch(e => console.log(e));
    }
  };
  componentDidMount() {
    const config = {
      appId: "b5eec924e48780c607350184f3e4126021be49f03a8c0b3e",
      zendeskUrl: "https://daffodilswsupport.zendesk.com",
      clientId: "mobile_sdk_client_7c6882ac1c60b512c12f"
    };
    ZendeskSupport.initialize(config);
    const identity = {
      customerEmail: "sharmapreety537@gmail.com",
      customerName: "Preety",
      customerPassword: "poiuytrewq"
    };
    ZendeskSupport.setupIdentity(identity);
    // const customFields = {
    //   customFieldId: "360011148232"
    // };
    // ZendeskSupport.callSupport(customFields);
    ZendeskSupport.supportHistory();
    ZendeskSupport.showHelpCenter();
  }
  static navigationOptions = {
    title: "Register",
    headerRight: <Image source={require("./public/images/logo.png")} />,
    headerStyle: {
      backgroundColor: "grey"
    },

    headerTintColor: "#fff"
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
            <Text style={styles.errorMsg}>{this.props.data.userNameMsg}</Text>
            <TextInput
              style={styles.text}
              underlineColorAndroid="transparent"
              placeholder="Email"
              autoCapitalize="none"
              onChangeText={this.handleEmail}
            />
            <Text style={styles.errorMsg}>{this.props.data.emailMsg}</Text>
            <TextInput
              style={styles.text}
              secureTextEntry={true}
              underlineColorAndroid="transparent"
              placeholder="Password"
              autoCapitalize="none"
              onChangeText={this.handlePassword}
            />
            <Text style={styles.errorMsg}>{this.props.data.passwordMsg}</Text>
            <TextInput
              style={styles.text}
              underlineColorAndroid="transparent"
              placeholder="FirstName"
              autoCapitalize="none"
              onChangeText={this.handleFirstName}
            />
            <Text style={styles.errorMsg}>{this.props.data.firstNameMsg}</Text>
            <TextInput
              style={styles.text}
              underlineColorAndroid="transparent"
              placeholder="LastName"
              autoCapitalize="none"
              onChangeText={this.handleLastName}
            />
            <Text style={styles.errorMsg}>{this.props.data.lastNameMsg}</Text>

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
const mapStateToProps = state => {
  return {
    data: state.ReducerRegister
  };
};
export default connect(mapStateToProps)(Register);
