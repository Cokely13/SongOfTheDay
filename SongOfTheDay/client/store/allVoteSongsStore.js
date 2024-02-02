import Axios from "axios";

const SET_VOTESONGS ="SET_VOTESONGS"
const CREATE_VOTESONG = "CREATE_VOTESONG"
const DELETE_VOTESONG = "DELETE_VOTESONG"


export const setVoteSongs = (votesongs) =>{
  return{
    type: SET_VOTESONGS,
    votesongs
  }
};

const _createVoteSong = (votesong) => {
  return {
    type: CREATE_VOTESONG,
    votesong,
  };
};

const _deleteVoteSong = (votesong) => {
  return {
    type: DELETE_VOTESONG,
    votesong
  };
};

export const fetchVoteSongs = () => {
  return async (dispatch) => {
        const {data}= await Axios.get("/api/votesongs");
        dispatch(setVoteSongs(data));
  };
};

export const createVoteSong = (votesong) => {
  return async (dispatch) => {
    const { data: created } = await Axios.post("/api/votesongs", votesong);
    dispatch(_createVoteSong(created));
    // history.push("/votesongs");
  };
};

export const deleteVoteSong = (id) => {
  return async (dispatch) => {
    const { data: votesong } = await Axios.delete(`/api/votesongs/${id}`);
    dispatch(_deleteVoteSong(votesong));
    // history.push("/votesongs");
  };
};


const initialState = [];
export default function votesongsReducer(state = initialState, action) {
  switch (action.type) {
    case SET_VOTESONGS:
      return action.votesongs;
      case CREATE_VOTESONG:
        return [...state, action.votesong];
        case DELETE_VOTESONG:
      return state.filter((votesong) => votesong.id !== action.votesong.id)
      ;
      default:
        return state;
    }
  }
