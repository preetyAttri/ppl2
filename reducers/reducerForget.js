import initialStates from "../store/states";
console.log("in reducerForget");
const ReducerForget = (state = initialStates.forget, action) => {
  console.log("in reducerForget func");
  let msg;
  switch (action.type) {
    case "ChangeEmailMsg":
      msg = typeof action.value === "string" ? action.value : "";
      return {
        ...state,
        emailMsg: msg
      };
    case "email":
      return {
        ...state,
        email: action.value
      };
  }
  return state;
};
export default ReducerForget;
