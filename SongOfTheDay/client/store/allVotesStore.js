import Axios from "axios";

const SET_VOTES ="SET_VOTES"
const CREATE_VOTE = "CREATE_VOTE"
const DELETE_VOTE = "DELETE_VOTE"


export const setVotes = (vote) =>{
  return{
    type: SET_VOTES,
    vote
  }
};

const _createVote = (vote) => {
  return {
    type: CREATE_VOTE,
    vote,
  };
};

const _deleteVote = (vote) => {
  return {
    type: DELETE_VOTE,
    vote
  };
};

export const fetchVotes = () => {
  return async (dispatch) => {
        const {data}= await Axios.get("/api/votes");
        dispatch(setVotes(data));
  };
};

export const createVote = (vote) => {
  return async (dispatch) => {
    const { data: created } = await Axios.post("/api/votes", vote);
    dispatch(_createVote(created));
    // history.push("/votes");
  };
};

export const deleteVote = (id, history) => {
  return async (dispatch) => {
    const { data: vote } = await Axios.delete(`/api/votes/${id}`);
    dispatch(_deleteVote(vote));
    history.push("/votes");
  };
};


const initialState = [];
export default function votesReducer(state = initialState, action) {
  switch (action.type) {
    case SET_VOTES:
      return action.vote;
      case CREATE_VOTE:
        return [...state, action.vote];
        case DELETE_VOTE:
      return state.filter((vote) => vote.id !== action.vote.id)
      ;
      default:
        return state;
    }
  }
