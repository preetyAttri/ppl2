import React from "react";
import PropTypes from "prop-types";
import {
  Dimensions,
  StyleSheet,
  ScrollView,
  View,
  Image,
  Text,
  AsyncStorage,
  TouchableOpacity
} from "react-native";
import { Actions } from "react-native-router-flux";
const window = Dimensions.get("window");
const uri =
  "https://pickaface.net/gallery/avatar/unr_hannah_180914_0056_cqgc.png";

const styles = StyleSheet.create({
  menu: {
    flex: 1,
    width: window.width,
    height: window.height,
    backgroundColor: "#DCDCDC",
    padding: 10
  },
  avatarContainer: {
    marginBottom: 10,
    marginTop: 10
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    flex: 1
  },
  name: {
    position: "absolute",
    left: 80,
    top: 4,
    fontSize: 30
  },
  item: {
    fontSize: 20,
    fontWeight: "300",
    paddingTop: 15
  },
  categoryIcon: {
    height: 50,
    width: 50,
    borderRadius: 70
  },
  categoryShow: {
    width: 300,
    paddingLeft: 10,
    flexDirection: "row"
  }
});
_removeData = async () => {
  try {
    await AsyncStorage.removeItem("username");
    Actions.pop({ key: Actions.login() });
    Actions.refresh({ key: Actions.login() });
  } catch (exception) {
    return false;
  }
};

export default function Menu({ onItemSelected, username, categoryArr }) {
  return (
    <ScrollView scrollsToTop={false} style={styles.menu}>
      <View style={styles.avatarContainer}>
        <View style={{ flexDirection: "column", paddingLeft: 10 }}>
          <Image style={styles.avatar} source={{ uri }} />
          <TouchableOpacity style={{ paddingTop: 5 }} onPress={_removeData}>
            <Text>LOGOUT</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.name}>{username}</Text>
      </View>

      <Text onPress={() => onItemSelected("YourTimeline")} style={styles.item}>
        Timeline
      </Text>
      <Text onPress={() => onItemSelected("MyUploades")} style={styles.item}>
        My Uploades
      </Text>
      <Text onPress={() => onItemSelected("AddPost")} style={styles.item}>
        Add Post
      </Text>

      <Text onPress={() => onItemSelected("AddCategory")} style={styles.item}>
        Add Category
      </Text>
      <Text style={{ color: "black", fontSize: 25, padding: 20 }}>
        Uploaded Category
      </Text>
      {categoryArr.map((x, index) => (
        <View key={index} style={styles.categoryShow}>
          <Image style={styles.categoryIcon} source={{ uri: x.img }} />
          <Text
            style={{ color: "black", padding: 15 }}
            onPress={() => onItemSelected(x.category)}
          >
            {x.category.toUpperCase()}
          </Text>
        </View>
      ))}
    </ScrollView>
  );
}

Menu.propTypes = {
  onItemSelected: PropTypes.func.isRequired
};
