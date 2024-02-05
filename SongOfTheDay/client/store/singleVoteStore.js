import axios from "axios";

// Action Types
const SET_SINGLE_VOTE = "SET_SINGLE_VOTE";
const UPDATE_SINGLE_VOTE = "UPDATE_SINGLE_VOTE";
const TOKEN = "token";

// Action creators
export const _setSingleVote= (votedata) => {
  return {
    type: SET_SINGLE_VOTE,
    votedata,
  };
};

const _updateSingleVote = (votedata) => {
  return {
    type: UPDATE_SINGLE_VOTE,
    votedata,
  };
};

//Thunks
export const fetchVote = (id) => {
  return async (dispatch) => {
    const { data } = await axios.get(`/api/votes/${id}`);
    dispatch(_setSingleVote(data));
  };
};

export const updateSingleVote = (vote, history) => {
  return async (dispatch) => {
    try {
        await axios.put(`/api/votes/${vote.id}`, vote);
        const { data: voteData } = await axios.get(`/api/votes/${vote.id}`);
        dispatch(_updateSingleVote(voteData));
        history.push(`/votes/${vote.id}`)
      }
     catch (error) {
      console.log("VOTE", vote)
    }
  };
};

// reducer
const initialState = [];
const singleVoteReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SINGLE_VOTE:
      return action.votedata;
    case UPDATE_SINGLE_VOTE:
      return action.votedata;
    default:
      return state;
  }
};

export default singleVoteReducer;
