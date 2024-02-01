import Axios from "axios";

const SET_MYSONGS ="SET_MYSONGS"
const CREATE_MYSONG = "CREATE_MYSONG"
const DELETE_MYSONG = "DELETE_MYSONG"


export const setMysongs = (mysongs) =>{
  return{
    type: SET_MYSONGS,
    mysongs
  }
};

const _createMysong = (mysong) => {
  return {
    type: CREATE_MYSONG,
    mysong,
  };
};

const _deleteMysong = (mysong) => {
  return {
    type: DELETE_MYSONG,
    mysong
  };
};

export const fetchMysongs = () => {
  return async (dispatch) => {
        const {data}= await Axios.get("/api/mysongs");
        dispatch(setMysongs(data));
  };
};

export const createMysong = (mysong) => {
  return async (dispatch) => {
    const { data: created } = await Axios.post("/api/mysongs", mysong);
    dispatch(_createMysong(created));
    // history.push("/mysongs");
  };
};

export const deleteMysong = (id) => {
  return async (dispatch) => {
    const { data: mysong } = await Axios.delete(`/api/mysongs/${id}`);
    dispatch(_deleteMysong(mysong));
    // history.push("/mysongs");
  };
};


const initialState = [];
export default function mysongsReducer(state = initialState, action) {
  switch (action.type) {
    case SET_MYSONGS:
      return action.mysongs;
      case CREATE_MYSONG:
        return [...state, action.mysong];
        case DELETE_MYSONG:
      return state.filter((mysong) => mysong.id !== action.mysong.id)
      ;
      default:
        return state;
    }
  }
