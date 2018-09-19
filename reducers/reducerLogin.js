import initialStates from "../store/states";
console.log("in reducerLogin");
const ReducerLogin = (state = initialStates.login, action) => {
  console.log("in reducerLogin func");
  let msg;
  switch (action.type) {
    case "ChangePasswordMsg":
      msg = typeof action.value === "string" ? action.value : "";
      return {
        ...state,
        passwordMsg: msg
      };
    case "ChangeUserNameMsg":
      msg = typeof action.value === "string" ? action.value : "";
      return {
        ...state,
        userNameMsg: msg
      };
    case "password":
      return {
        ...state,
        password: action.value
      };
    case "username":
      return {
        ...state,
        username: action.value
      };
  }
  return state;
};
export default ReducerLogin;
