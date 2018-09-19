import React, { Component } from "react";
import { Alert, View, Text, Image, AsyncStorage } from "react-native";
import { DrawerNavigator, DrawerItems } from "react-navigation";
import Timeline from "./timeline";
import ShowTimeline from "./showTimeline";
import AddPost from "./AddPost";
import AddCategory from "./AddCategory";
import { Header, Container, Left, Content } from "native-base";

var username = "";

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);
  }
  _retrieveData = async () => {
    username = await AsyncStorage.getItem("username");
  };
  componentDidMount() {
    this._retrieveData();
  }
  render() {
    return <MyDrawer />;
  }
}
const customDrawerContent = props => (
  <Container>
    <Header
      style={{
        backgroundColor: "grey",
        justifyContent: "space-between"
      }}
    >
      <Left>
        <Image
          style={{
            width: 48,
            height: 48,
            borderRadius: 24
          }}
          source={{
            uri:
              "https://pickaface.net/gallery/avatar/unr_hannah_180914_0056_cqgc.png"
          }}
        />
      </Left>
      <Text style={{ fontSize: 25, marginRight: 110, marginTop: 10 }}>
        {username.toUpperCase()}
      </Text>
    </Header>
    <Content style={{ backgroundColor: "#DCDCDC" }}>
      <DrawerItems {...props} />
    </Content>
  </Container>
);
const MyDrawer = DrawerNavigator(
  {
    Timeline: {
      screen: Timeline
    },
    MyUploads: {
      screen: Timeline
    },
    AddPost: {
      screen: AddPost
    },
    AddCategory: {
      screen: AddCategory
    }
  },
  {
    initialRouteName: "Timeline",
    drawerPosition: "left",
    contentComponent: customDrawerContent,
    drawerOpenRoute: "DrawerOpen",
    drawerCloseRoute: "DrawerClose",
    drawerToggleRoute: "DrawerToggle"
  }
);
