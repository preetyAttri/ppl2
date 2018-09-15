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
export default class Header extends Component {
  render() {
    return (
      <View style={styles.footer}>
        <Text>
          Copyright © Pet-Socail 2014 All Rights Reserved Privacy Policy | Terms
          &amp; Conditions
        </Text>
        <View style={styles.icons}>
          <Image source={require("./public/images/social_1.png")} />
          <Image source={require("./public/images/social_2.png")} />
          <Image source={require("./public/images/social_3.png")} />
          <Image source={require("./public/images/social_4.png")} />
        </View>
      </View>
    );
  }
}
