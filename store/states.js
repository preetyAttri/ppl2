let states = {
  register: {
    username: "",
    password: "",
    email: "",
    firstName: "",
    lastName: "",
    userNameMsg: "",
    passwordMsg: "",
    emailMsg: "",
    firstNameMsg: "",
    lastNameMsg: ""
  },
  login: {
    username: "",
    password: "",
    userNameMsg: "",
    passwordMsg: ""
  },
  forget: {
    email: "",
    emailMsg: ""
  },
  reset: {
    password: "",
    confirmPassword: "",
    passwordMsg: "",
    confirmPasswordMsg: ""
  },
  timeline: {
    username: "",
    categoryArr: [],
    categoryMsg: "",
    arr: [],
    singlePost: false,
    uploadMsg: "",
    comment: "",
    latest_first: false,
    most_commented: false,
    avatarSource: null,
    category: "",
    description: "",
  }
};
export default states;
