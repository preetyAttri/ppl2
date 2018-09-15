import React, { Component } from "react";
import { Router, Scene } from "react-native-router-flux";
import Login from "./login.js";
import Register from "./register";
import Header from "./header";
import Footer from "./footer";
import Forget from "./forget";
import Reset from "./reset";
import Timeline from "./timeline";
import styles from "./styleSheet";
import { Container } from "native-base";
export default class Routes extends Component {
  render() {
    return (
      <Container>
        <Header />
        <Router>
          <Scene key="root">
            <Scene
              key="register"
              component={Register}
              hideNavBar={true}
              initial={true}
            />
            <Scene key="login" component={Login} hideNavBar={true} />
            <Scene key="timeline" component={Timeline} hideNavBar={true} />
            <Scene key="resets" component={Reset} hideNavBar={true} />
            <Scene key="forget" component={Forget} hideNavBar={true} />
          </Scene>
        </Router>
        <Footer />
      </Container>
    );
  }
}
