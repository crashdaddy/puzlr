export const addUser = (newUser) => {
    return {
      type: "ADD_USER",
      value: newUser,
    };
  };

export const addPuzzle = (newPuzzle) => {
    return {
        type: "ADD_PUZZLE",
        value: newPuzzle,
    };
}

export const clearPuzzle = () => {
  return {
        type: "CLEAR_PUZZLE",
        value: null,
  }
}