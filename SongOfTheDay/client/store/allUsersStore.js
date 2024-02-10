import Axios from "axios";

const SET_USERS ="SET_USERS"


export const setUsers = (users) =>{
  return{
    type: SET_USERS,
    users
  }
};

export const fetchUsers = () => {
  return async (dispatch) => {
        const {data}= await Axios.get("/api/users");
        dispatch(setUsers(data));
  };
};


const initialState = [];
export default function usersReducer(state = initialState, action) {
  switch (action.type) {
    case SET_USERS:
      return action.users;
      default:
        return state;
    }
  }
