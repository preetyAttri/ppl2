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
import Store from "./store/Store";
import { connect } from "react-redux";
import * as actionCreators from "./actions";
class Forget extends Component {
  constructor(props) {
    super(props);
  }
  handleChange = text => {
    Store.dispatch(actionCreators.inputChange("email", text));
    var reg = RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
    var emailValid = reg.test(text);
    if (!emailValid) {
      Store.dispatch(actionCreators.ChangeEmailMsg("Enter valid mail"));
    } else {
      Store.dispatch(actionCreators.ChangeEmailMsg());
    }
  };
  submit = e => {
    let isAgree = false;

    var reg = RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);

    var emailValid = reg.test(this.props.data.email);
    if (this.props.data.email.length == 0) {
      Store.dispatch(actionCreators.ChangeEmailMsg("Enter mail"));
    } else if (!emailValid) {
      Store.dispatch(actionCreators.ChangeEmailMsg("Enter valid mail"));
    } else {
      isAgree = true;
      Store.dispatch(actionCreators.ChangeEmailMsg(""));
    }
    if (isAgree) {
      fetch("http://192.168.100.97:4002/forget", {
        method: "POST",
        mode: "cors",
        body: JSON.stringify({
          email: this.props.data.email
        }),
        headers: { "Content-Type": "application/json" }
      })
        .then(response => response.json())
        .then(responseJ => {
          if (responseJ) {
            Store.dispatch(
              actionCreators.ChangeEmailMsg("mail sent to your mail")
            );
          } else {
            Store.dispatch(actionCreators.ChangeEmailMsg("Not Exist"));
          }
        })
        .catch(e => console.log(e));
    }
  };
  static navigationOptions = {
    title: "Forget",
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
              placeholder="Email"
              autoCapitalize="none"
              onChangeText={this.handleChange}
            />

            <Text style={styles.errorMsg}>{this.props.data.emailMsg}</Text>
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
    data: state.ReducerForget
  };
};
export default connect(mapStateToProps)(Forget);
