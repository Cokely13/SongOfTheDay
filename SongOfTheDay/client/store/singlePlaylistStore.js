import axios from "axios";

// Action Types
const SET_SINGLE_PLAYLIST = "SET_SINGLE_PLAYLIST";
const UPDATE_SINGLE_PLAYLIST = "UPDATE_SINGLE_PLAYLIST";
const TOKEN = "token";

// Action creators
export const _setSinglePlaylist= (playlistdata) => {
  return {
    type: SET_SINGLE_PLAYLIST,
    playlistdata,
  };
};

const _updateSinglePlaylist = (playlistdata) => {
  return {
    type: UPDATE_SINGLE_PLAYLIST,
    playlistdata,
  };
};

//Thunks
export const fetchPlaylist = (id) => {
  return async (dispatch) => {
    const { data } = await axios.get(`/api/playlists/${id}`);
    dispatch(_setSinglePlaylist(data));
  };
};

export const updateSinglePlaylist = (playlist, history) => {
  return async (dispatch) => {
    try {
        await axios.put(`/api/playlists/${playlist.id}`, playlist);
        const { data: playlistData } = await axios.get(`/api/playlists/${playlist.id}`);
        dispatch(_updateSinglePlaylist(playlistData));
        history.push(`/playlists/${playlist.id}`)
      }
     catch (error) {
      console.log("PLAYLIST", playlist)
    }
  };
};

// reducer
const initialState = [];
const singlePlaylistReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SINGLE_PLAYLIST:
      return action.playlistdata;
    case UPDATE_SINGLE_PLAYLIST:
      return action.playlistdata;
    default:
      return state;
  }
};

export default singlePlaylistReducer;
