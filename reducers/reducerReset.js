import initialStates from "../store/states";
console.log("in reducer Reset");
const ReducerReset = (state = initialStates.reset, action) => {
  console.log("in reducerReset func");
  let msg;
  switch (action.type) {
    case "ChangePasswordMsg":
      msg = typeof action.value === "string" ? action.value : "";
      return {
        ...state,
        passwordMsg: msg
      };
    case "ChangeConfirmPasswordMsg":
      msg = typeof action.value === "string" ? action.value : "";
      return {
        ...state,
        confirmPasswordMsg: msg
      };
    case "confirmPassword":
      return {
        ...state,
        confirmPassword: action.value
      };
    case "password":
      return {
        ...state,
        password: action.value
      };
  }
  return state;
};
export default ReducerReset;
