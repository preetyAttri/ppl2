import { StyleSheet, PixelRatio } from "react-native";
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#E6E6FA",
    height: 640
  },
  addPostContainer: {
    flex: 1,
    minHeight: 600,
    minWidth: 340,
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  avatarContainer: {
    borderColor: "#9B9B9B",
    borderWidth: 1 / PixelRatio.get(),
    justifyContent: "center",
    alignItems: "center"
  },
  avatar: {
    width: 370,
    height: 250
  },
  scene: {
    backgroundColor: "red"
  },
  mainImage: {
    height: 500,
    width: 340
  },
  logo: {
    marginTop: 20
  },
  welcome: {
    fontSize: 30,
    fontStyle: "normal",
    alignSelf: "center"
  },
  header: {
    height: 60,
    flexDirection: "row",
    backgroundColor: "#E9967A",
    justifyContent: "space-between"
  },
  login: {
    position: "absolute",
    marginTop: 180,
    marginLeft: 80,
    width: 200,
    backgroundColor: "#ff8c00",
    borderStyle: "solid",
    borderRadius: 7,
    borderColor: "orange",
    borderWidth: 3,
    height: 50
  },
  textLogin: {
    color: "black",
    marginTop: 7,
    fontSize: 20,
    textAlign: "center"
  },
  icons: {
    flexDirection: "row",
    justifyContent: "space-around"
  },
  footer: {
    backgroundColor: "#E9967A",
    height: 65
  },
  text: {
    position: "relative",
    marginTop: 20,
    opacity: 1,
    height: 40,
    marginLeft: 15,
    width: 330,
    borderBottomColor: "orange",
    borderBottomWidth: 3
  },
  textForget: {
    position: "relative",
    marginTop: 35,
    opacity: 1,
    height: 40,
    marginLeft: 15,
    width: 330,
    borderBottomColor: "orange",
    borderBottomWidth: 3
  },
  submit: {
    position: "absolute",
    marginTop: 400,
    marginLeft: 80,
    width: 200,
    backgroundColor: "#ff8c00",
    borderStyle: "solid",
    borderRadius: 7,
    borderColor: "orange",
    borderWidth: 3,

    height: 50
  },
  textSubmit: {
    color: "black",
    marginTop: 10,
    fontSize: 20,
    textAlign: "center"
  },
  GoLogin: {
    position: "absolute",
    marginTop: 460,
    marginLeft: 80,
    width: 200,
    backgroundColor: "#ff8c00",
    borderStyle: "solid",
    borderRadius: 7,
    borderColor: "orange",
    borderWidth: 3,
    height: 50
  },
  GoRegister: {
    position: "absolute",
    marginTop: 240,
    marginLeft: 80,
    width: 200,
    backgroundColor: "#ff8c00",
    borderStyle: "solid",
    borderRadius: 7,
    borderColor: "orange",
    borderWidth: 3,
    height: 50
  },
  errorMsg: {
    color: "red",
    marginLeft: 15
  },

  CategoryName: {
    position: "relative",
    marginTop: 20,
    opacity: 1,
    height: 40,
    alignItems: "center",
    width: 350,
    // textAlign: "center",
    borderBottomColor: "orange",
    borderBottomWidth: 3
  },
  goAddCategory: {
    marginTop: 70,
    alignItems: "center",
    width: 200,
    backgroundColor: "#ff8c00",
    borderStyle: "solid",
    borderRadius: 7,
    borderColor: "orange",
    borderWidth: 3,
    height: 50
  }
});
export default styles;
