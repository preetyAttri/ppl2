/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import styles from "./styleSheet";

import React, { Component } from "react";
import { View, ScrollView, ImageBackground } from "react-native";

import Routes from "./routes";
export default class App extends Component {
  render() {
    return (
      <Routes />

      /* <View style={{ backgroundColor: "white" }}>
          <ImageBackground
            style={{ height: 500, width: 400, opacity: 0.7 }}
            source={require("./public/images/img_9.png")}
          >
            {this.state.isLogin ? <Login /> : <Register />}
          </ImageBackground>
        </View> */
    );
  }
}
// const RootStack = createStackNavigator(
//   {
//     Register: { screen: Register },
//     Login: { screen: Login }
//   },
//   {
//     initialRouteName: "Register"
//   }
// );
