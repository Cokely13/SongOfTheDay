import axios from "axios";

// Action Types
const SET_SINGLE_SONG = "SET_SINGLE_SONG";
const UPDATE_SINGLE_SONG = "UPDATE_SINGLE_SONG";
const TOKEN = "token";

// Action creators
export const _setSingleSong= (songdata) => {
  return {
    type: SET_SINGLE_SONG,
    songdata,
  };
};

const _updateSingleSong = (songdata) => {
  return {
    type: UPDATE_SINGLE_SONG,
    songdata,
  };
};

//Thunks
export const fetchSong = (id) => {
  return async (dispatch) => {
    const { data } = await axios.get(`/api/songs/${id}`);
    dispatch(_setSingleSong(data));
  };
};

export const updateSingleSong = (song, history) => {
  return async (dispatch) => {
    try {
        await axios.put(`/api/songs/${song.id}`, song);
        const { data: songData } = await axios.get(`/api/songs/${song.id}`);
        dispatch(_updateSingleSong(songData));
        history.push(`/songs/${song.id}`)
      }
     catch (error) {
      console.log("SONG", song)
    }
  };
};

// reducer
const initialState = [];
const singleSongReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SINGLE_SONG:
      return action.songdata;
    case UPDATE_SINGLE_SONG:
      return action.songdata;
    default:
      return state;
  }
};

export default singleSongReducer;
