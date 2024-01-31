import Axios from "axios";

const SET_PSONGS ="SET_PSONGS"
const CREATE_PSONG = "CREATE_PSONG"
const DELETE_PSONG = "DELETE_PSONG"


export const setPsongs = (psongs) =>{
  return{
    type: SET_PSONGS,
    psongs
  }
};

const _createPsong = (psong) => {
  return {
    type: CREATE_PSONG,
    psong,
  };
};

const _deletePsong = (psong) => {
  return {
    type: DELETE_PSONG,
    psong
  };
};

export const fetchPsongs = () => {
  return async (dispatch) => {
        const {data}= await Axios.get("/api/psongs");
        dispatch(setPsongs(data));
  };
};

export const createPsong = (psong) => {
  return async (dispatch) => {
    const { data: created } = await Axios.post("/api/psongs", psong);
    dispatch(_createPsong(created));
    // history.push("/psongs");
  };
};

export const deletePsong = (id) => {
  return async (dispatch) => {
    const { data: psong } = await Axios.delete(`/api/psongs/${id}`);
    dispatch(_deletePsong(psong));
    // history.push("/psongs");
  };
};


const initialState = [];
export default function psongsReducer(state = initialState, action) {
  switch (action.type) {
    case SET_PSONGS:
      return action.psongs;
      case CREATE_PSONG:
        return [...state, action.psong];
        case DELETE_PSONG:
      return state.filter((psong) => psong.id !== action.psong.id)
      ;
      default:
        return state;
    }
  }
