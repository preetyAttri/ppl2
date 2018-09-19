import React, { Component } from "react";
import { createStackNavigator } from "react-navigation";
import { View, Text } from "react-native";
import Login from "./login.js";
import Register from "./register";
import Footer from "./footer";
import Forget from "./forget";
import Reset from "./reset";
import Timeline from "./timeline";
import SinglePost from "./singlePost";
import DrawerNavigation from "./drawerNavigation";
import AddCategory from "./AddCategory";
import AddPost from "./AddPost";
import HomeScreen from "./HomeScreen";
import { createStore } from "redux";
import { connect, Provider } from "react-redux";
import Store from './store/Store'
const AppNavigator = createStackNavigator(
  {
    HomeScreen: { screen: HomeScreen },
    Login: { screen: Login },
    Register: { screen: Register },
    Forget: { screen: Forget },
    Reset: { screen: Reset },
    DrawerNavigation: { screen: DrawerNavigation },
    SinglePost: { screen: SinglePost },
    AddCategory: { screen: AddCategory },
    AddPost: { screen: AddPost }
  },
  {
    initialRouteName: "Register"
  }
);

export default class HomeReact extends React.Component {
  render() {
    return (
      <Provider store={Store}>
        <AppNavigator />
      </Provider>
    );
  }
}
