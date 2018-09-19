export const ChangeUserNameMsg = value => {
  return {
    type: "ChangeUserNameMsg",
    value: value
  };
};
export const ChangePasswordMsg = value => {
  return {
    type: "ChangePasswordMsg",
    value: value
  };
};
export const ChangeConfirmPasswordMsg = value => {
  return {
    type: "ChangeConfirmPasswordMsg",
    value: value
  };
};
export const ChangeEmailMsg = value => {
  return {
    type: "ChangeEmailMsg",
    value: value
  };
};
export const ChangeFirstNameMsg = value => {
  return {
    type: "ChangeFirstNameMsg",
    value: value
  };
};
export const ChangeLastNameMsg = value => {
  return {
    type: "ChangeLastNameMsg",
    value: value
  };
};

export const inputChange = (stateName, value) => {
  return {
    type: stateName,
    value: value
  };
};
export const ChangeUserName = value => {
  return {
    type: "ChangeUserName",
    value: value
  };
};
export const ChangeFile = value => {
  return {
    type: "ChangeFile",
    value: value
  };
};

export const ChangeDescription = value => {
  return {
    type: "ChangeDescription",
    value: value
  };
};
export const ChangeCategory = value => {
  return {
    type: "ChangeCategory",
    value: value
  };
};

export const UpdateArray = value => {
  return {
    type: "UpdateArray",
    value: value
  };
};
export const UpdateCategoryArray = value => {
  return {
    type: "UpdateCategoryArray",
    value: value
  };
};

export const ChangeSinglePost = value => {
  return {
    type: "ChangeSinglePost",
    value: value
  };
};

export const ChangeCategoryMsg = value => {
  return {
    type: "ChangeCategoryMsg",
    value: value
  };
};
export const ChangeCommentArray = value => {
  return {
    type: "ChangeCommentArray",
    value: value
  };
};
export const ChangeComment = value => {
  return {
    type: "ChangeComment",
    value: value
  };
};
export const ChangeUploadMsg = value => {
  return {
    type: "UploadMsg",
    value: value
  };
};
export const ChangeLatestFirst = value => {
  return {
    type: "isLatestFirst",
    value: value
  };
};
export const ChangeMostCommented = value => {
  return {
    type: "isMostCommented",
    value: value
  };
};
