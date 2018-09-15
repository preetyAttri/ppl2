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
export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ""
    };
  }

  render() {
    return (
      <View style={styles.header}>
        <Image source={require("./public/images/logo.png")} />
      </View>
    );
  }
}
