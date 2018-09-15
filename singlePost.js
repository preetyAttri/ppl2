import React from "react";
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  PixelRatio,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView
} from "react-native";
import moment from "moment";
import styles from "./styleSheet";

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}
  render() {
    return (
      <ScrollView style={{ backgroundColor: "grey" }}>
        <View style={styles.addPostContainer}>
          {this.props.arr.map((x, index) => (
            <View
              key={index}
              style={[
                {
                  borderColor: "#9B9B9B",
                  borderWidth: 1 / PixelRatio.get(),
                  justifyContent: "center",

                  marginTop: 5,
                  height: 350,
                  width: 340,
                  backgroundColor: "orange"
                }
              ]}
            >
              <View
                style={{
                  flex: 1,
                  flexDirection: "column"
                }}
              >
                <View
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    justifyContent: "space-between"
                  }}
                >
                  <Text style={{ fontSize: 16 }}>
                    {x.username.toUpperCase()}
                  </Text>
                  <Text style={{ fontSize: 16 }}>{x.category}</Text>
                </View>
                <View
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    justifyContent: "space-between"
                  }}
                >
                  <Text style={{ fontSize: 16 }}>{x.description}</Text>
                  <Text>
                    {" "}
                    {moment(x.date).format("DD MMM YYYY")}{" "}
                    <Text> {moment(x.date).format("hh:mm a")}</Text>
                  </Text>
                </View>
              </View>
              <TouchableOpacity
                onPress={() => {
                  this.state.singlePost(x._id);
                }}
              >
                <Image style={styles.avatar} source={{ uri: x.img }} />
              </TouchableOpacity>
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  justifyContent: "space-between"
                }}
              >
                <View
                  style={{
                    flex: 1,
                    flexDirection: "row"
                  }}
                >
                  <TouchableOpacity
                    style={{ padding: 5 }}
                    onPress={() => this.props.toggle_like(x._id)}
                  >
                    {x.likes.includes(this.props.currentUser) ? (
                      <Image
                        style={{ height: 40, width: 40 }}
                        source={require("./public/images/aaunlike.png")}
                      />
                    ) : (
                      <Image
                        style={{ height: 40, width: 40 }}
                        source={require("./public/images/aalike.png")}
                      />
                    )}
                  </TouchableOpacity>
                  {x.likes.length == 0 || x.likes.length == 1 ? (
                    <Text style={{ padding: 15 }}>{x.likes.length} Like</Text>
                  ) : (
                    <Text style={{ padding: 15 }}>{x.likes.length} Likes</Text>
                  )}
                </View>
                <View
                  style={{
                    flex: 1,
                    flexDirection: "row"
                  }}
                >
                  <Text
                    style={{
                      padding: 15,
                      paddingLeft: 40
                    }}
                  >
                    COMMENTS
                    {"  "}
                    {x.comments.length}
                  </Text>
                </View>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    );
  }
}
