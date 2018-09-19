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
const uri =
  "https://pickaface.net/gallery/avatar/unr_hannah_180914_0056_cqgc.png";
// import { Input } from 'react-native-elements';
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}
  render() {
    return (
      <ScrollView>
        {this.props.singlePostCheck ? null : (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              backgroundColor: "#DCDCDC",
              height: 30
            }}
          >
            {this.props.latest_firstCheck ? (
              <Text
                style={{
                  backgroundColor: "#A9A9A9",
                  borderRadius: 1,
                  width: 100,
                  textAlign: "center"
                }}
                onPress={this.props.latest_first}
              >
                Latest First
              </Text>
            ) : (
              <Text
                onPress={this.props.latest_first}
                style={{
                  borderRadius: 1,
                  width: 100,
                  textAlign: "center"
                }}
              >
                Latest First
              </Text>
            )}
            {!this.props.latest_firstCheck &&
            !this.props.most_commentedCheck ? (
              <Text
                style={{
                  backgroundColor: "#A9A9A9",
                  borderRadius: 1,
                  width: 100,
                  textAlign: "center"
                }}
                onPress={this.props.oldest_first}
              >
                Oldest First
              </Text>
            ) : (
              <Text
                onPress={this.props.oldest_first}
                style={{
                  borderRadius: 1,
                  width: 100,
                  textAlign: "center"
                }}
              >
                Oldest First
              </Text>
            )}
            {this.props.most_commentedCheck ? (
              <Text
                style={{
                  backgroundColor: "#A9A9A9",
                  borderRadius: 1,
                  width: 130,
                  textAlign: "center"
                }}
                onPress={this.props.most_commented}
              >
                Most Commented
              </Text>
            ) : (
              <Text
                onPress={this.props.most_commented}
                style={{
                  borderRadius: 1,
                  width: 130,
                  textAlign: "center"
                }}
              >
                Most Commented
              </Text>
            )}
          </View>
        )}
        <View style={styles.addPostContainer}>
          {this.props.arr.map((x, index) => (
            <View key={index}>
              <View
                style={[
                  {
                    borderColor: "#9B9B9B",
                    borderWidth: 1 / PixelRatio.get(),
                    justifyContent: "center",

                    height: 350,
                    width: 380,
                    backgroundColor: "#FFE4E1"
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
                {this.props.singlePostCheck ? (
                  <Image
                    style={[styles.avatar, { width: 380 }]}
                    source={{ uri: x.img }}
                  />
                ) : (
                  <TouchableOpacity
                    onPress={() => {
                      this.props.singlePost(x._id);
                    }}
                  >
                    <Image
                      style={{ width: 375, height: 250 }}
                      source={{ uri: x.img }}
                    />
                  </TouchableOpacity>
                )}
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
                      style={{ padding: 2, paddingLeft: 15 }}
                      onPress={() => this.props.toggle_like(x._id)}
                    >
                      <Image
                        style={{ height: 40, width: 40 }}
                        source={require("./public/images/aalike.png")}
                      />
                    </TouchableOpacity>
                    {x.likes.length == 0 || x.likes.length == 1 ? (
                      <Text style={{ paddingTop: 15, paddingLeft: 4 }}>
                        {x.likes.length} Like
                      </Text>
                    ) : (
                      <Text style={{ paddingTop: 15, paddingLeft: 4 }}>
                        {x.likes.length} Likes
                      </Text>
                    )}
                  </View>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: "row"
                    }}
                  >
                    <TouchableOpacity
                      style={{ paddingTop: 5, paddingLeft: 35 }}
                      onPress={() => this.props.toggle_unLike(x._id)}
                    >
                      <Image
                        style={{ height: 40, width: 40 }}
                        source={require("./public/images/aaunlike.png")}
                      />
                    </TouchableOpacity>
                    {x.unLikes.length == 0 || x.unLikes.length == 1 ? (
                      <Text style={{ paddingTop: 15, paddingLeft: 4 }}>
                        {x.unLikes.length} Dislike
                      </Text>
                    ) : (
                      <Text style={{ paddingTop: 15, paddingLeft: 4 }}>
                        {x.unLikes.length} Dislikes
                      </Text>
                    )}
                  </View>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: "row",
                      paddingLeft: 80
                    }}
                  >
                    <Image
                      style={{
                        height: 30,
                        width: 30,
                        marginTop: 12
                      }}
                      source={require("./public/images/commentsss.png")}
                    />
                    <Text
                      style={{
                        padding: 15,
                        paddingLeft: 8
                      }}
                    >
                      {x.comments.length}
                    </Text>
                  </View>
                </View>
              </View>

              {this.props.singlePostCheck ? (
                <View style={{ paddingTop: 1 }}>
                  {x.comments.map((i, indexc) => (
                    <View
                      key={indexc}
                      style={{
                        flexDirection: "row",
                        borderColor: "#DCDCDC",
                        borderWidth: 1,
                        backgroundColor: "#DCDCDC"
                      }}
                    >
                      <View
                        style={{ flexDirection: "column", paddingLeft: 10 }}
                      >
                        <Image
                          style={{ height: 50, width: 50, borderRadius: 70 }}
                          source={{ uri }}
                        />
                        <Text
                          style={{
                            color: "black",
                            fontSize: 12,
                            paddingLeft: 5
                          }}
                        >
                          {i.commentBy.toUpperCase()}
                        </Text>
                      </View>
                      <Text key={indexc} style={{ margin: 20 }}>
                        {i.comment}
                      </Text>
                    </View>
                  ))}
                  <TextInput
                    style={[
                      styles.CategoryName,
                      { marginLeft: 15, width: 310 }
                    ]}
                    underlineColorAndroid="transparent"
                    placeholder="add comments"
                    autoCapitalize="none"
                    onChangeText={this.props.handleComment}
                  />
                  <TouchableOpacity
                    style={[
                      styles.goAddCategory,
                      { marginLeft: 220, width: 100, marginTop: 10 }
                    ]}
                    onPress={() => this.props.uploadComment(x._id)}
                  >
                    <Text style={styles.textSubmit}>Submit</Text>
                  </TouchableOpacity>
                </View>
              ) : null}
            </View>
          ))}
        </View>
      </ScrollView>
    );
  }
}
