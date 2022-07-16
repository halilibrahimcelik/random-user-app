export const initialState = {
  person: "",
  title: "name",
  content: "",
  userList: [],
};

export const reducer = (state, action) => {
  switch (action.type) {
    case "setData":
      return { ...state, person: action.payload };
    case "setPerson":
      return {
        ...state,
        title: action.payload.title,
        content: action.payload.content,
      };
    case "setUsers":
      if (
        state.userList.every(
          (element) => element.login.uuid !== state.person.login.uuid
        )
      ) {
        return { ...state, userList: [...state.userList, action.payload] };
      } else return state;

    default:
      break;
  }
};
