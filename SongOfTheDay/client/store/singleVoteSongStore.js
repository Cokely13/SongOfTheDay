import axios from "axios";

// Action Types
const SET_SINGLE_VOTESONG = "SET_SINGLE_VOTESONG";
const UPDATE_SINGLE_VOTESONG = "UPDATE_SINGLE_VOTESONG";
const TOKEN = "token";

// Action creators
export const _setSingleVoteSong= (votesongdata) => {
  return {
    type: SET_SINGLE_VOTESONG,
    votesongdata,
  };
};

const _updateSingleVoteSong = (votesongdata) => {
  return {
    type: UPDATE_SINGLE_VOTESONG,
    votesongdata,
  };
};

//Thunks
export const fetchVoteSong = (id) => {
  return async (dispatch) => {
    const { data } = await axios.get(`/api/votesongs/${id}`);
    dispatch(_setSingleVoteSong(data));
  };
};

export const updateSingleVoteSong = (votesong, history) => {
  return async (dispatch) => {
    try {
        await axios.put(`/api/votesongs/${votesong.id}`, votesong);
        const { data: votesongData } = await axios.get(`/api/votesongs/${votesong.id}`);
        dispatch(_updateSingleVoteSong(votesongData));
        history.push(`/votesongs/${votesong.id}`)
      }
     catch (error) {
      console.log("VOTESONG", votesong)
    }
  };
};

// reducer
const initialState = [];
const singleVoteSongReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SINGLE_VOTESONG:
      return action.votesongdata;
    case UPDATE_SINGLE_VOTESONG:
      return action.votesongdata;
    default:
      return state;
  }
};

export default singleVoteSongReducer;
