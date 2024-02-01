import axios from "axios";

// Action Types
const SET_SINGLE_MYSONG = "SET_SINGLE_MYSONG";
const UPDATE_SINGLE_MYSONG = "UPDATE_SINGLE_MYSONG";
const TOKEN = "token";

// Action creators
export const _setSingleMySong= (mysongdata) => {
  return {
    type: SET_SINGLE_MYSONG,
    mysongdata,
  };
};

const _updateSingleMySong = (mysongdata) => {
  return {
    type: UPDATE_SINGLE_MYSONG,
    mysongdata,
  };
};

//Thunks
export const fetchMySong = (id) => {
  return async (dispatch) => {
    const { data } = await axios.get(`/api/mysongs/${id}`);
    dispatch(_setSingleMySong(data));
  };
};

export const updateSingleMySong = (mysong, history) => {
  return async (dispatch) => {
    try {
        await axios.put(`/api/mysongs/${mysong.id}`, mysong);
        const { data: mysongData } = await axios.get(`/api/mysongs/${mysong.id}`);
        dispatch(_updateSingleMySong(mysongData));
        history.push(`/mysongs/${mysong.id}`)
      }
     catch (error) {
      console.log("MYSONG", mysong)
    }
  };
};

// reducer
const initialState = [];
const singleMySongReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SINGLE_MYSONG:
      return action.mysongdata;
    case UPDATE_SINGLE_MYSONG:
      return action.mysongdata;
    default:
      return state;
  }
};

export default singleMySongReducer;
