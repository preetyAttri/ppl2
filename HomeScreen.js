import React, { Component } from "react";
import { View, Text } from "react-native";
import { DrawerNavigator } from "react-navigation";
import Register from "./register";
import Login from "./login";
import { Header } from "native-base";
export default class HomeScreen extends React.Component {
  static navigationOptions = {
    title: "Welcome"
  };
  render() {
    
    return <MyDrawer />;
  }
}
const MyDrawer = DrawerNavigator({
  Register: {
    screen: Register
  },
  Login: {
    screen: Login
  }
});
