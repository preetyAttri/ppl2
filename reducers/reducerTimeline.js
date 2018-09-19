import initialStates from "../store/states";
const ReducerTimeline = (state = initialStates.timeline, action) => {
  console.log("in ReducerTimeline func");
  switch (action.type) {
    case "ChangeUserName":
      return {
        ...state,
        username: action.value
      };
    case "ChangeDescription":
      return {
        ...state,
        description: action.value
      };
    case "ChangeCategory":
      return {
        ...state,
        category: action.value
      };

    case "UpdateArray":
      return {
        ...state,
        arr: action.value
      };
    case "UpdateCategoryArray":
      return {
        ...state,
        categoryArr: action.value
      };

    case "ChangeSinglePost":
      return {
        ...state,
        singlePost: action.value
      };
    case "UploadMsg":
      return {
        ...state,
        uploadMsg: action.value
      };
    case "ChangeCategoryMsg":
      let msg = typeof action.value === "string" ? action.value : "";
      return {
        ...state,
        categoryMsg: msg
      };

    case "ChangeComment":
      return {
        ...state,
        comment: action.value
      };
    case "isLatestFirst":
      return {
        ...state,
        latestFirst: action.value
      };
    case "isMostCommented":
      return {
        ...state,
        mostCommented: action.value
      };
    case "ChangeFile":
      return {
        ...state,
        avatarSource: action.value
      };
  }
  return state;
};
export default ReducerTimeline;
