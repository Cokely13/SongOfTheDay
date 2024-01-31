import Axios from "axios";

const SET_PLAYLISTS ="SET_PLAYLISTS"
const CREATE_PLAYLIST = "CREATE_PLAYLIST"
const DELETE_PLAYLIST = "DELETE_PLAYLIST"


export const setPlaylists = (playlists) =>{
  return{
    type: SET_PLAYLISTS,
    playlists
  }
};

const _createPlaylist = (playlist) => {
  return {
    type: CREATE_PLAYLIST,
    playlist,
  };
};

const _deletePlaylist = (playlist) => {
  return {
    type: DELETE_PLAYLIST,
    playlist
  };
};

export const fetchPlaylists = () => {
  return async (dispatch) => {
        const {data}= await Axios.get("/api/playlists");
        dispatch(setPlaylists(data));
  };
};

export const createPlaylist = (playlist) => {
  return async (dispatch) => {
    const { data: created } = await Axios.post("/api/playlists", playlist);
    dispatch(_createPlaylist(created));
    // history.push("/playlists");
  };
};

export const deletePlaylist = (id) => {
  return async (dispatch) => {
    const { data: playlist } = await Axios.delete(`/api/playlists/${id}`);
    dispatch(_deletePlaylist(playlist));
    // history.push("/playlists");
  };
};

// export const deletePlaylistAndSongs = (playlistId) => async (dispatch, getState) => {
//   try {
//     // Get all playlistSongs with matching playlistId
//     const playlistSongs = getState().allPsongs.filter(ps => ps.playlistId === playlistId);

//     // Delete all playlistSongs first
//     for (const ps of playlistSongs) {
//       await dispatch(deletePsong(ps.id));
//     }

//     // Then delete the playlist
//     await axios.delete(`/api/playlists/${playlistId}`);

//     // Dispatch the delete playlist action
//     dispatch(deletePlaylistSuccess(playlistId));
//   } catch (error) {
//     dispatch(deletePlaylistFailure(error.message));
//   }
// };


const initialState = [];
export default function playlistsReducer(state = initialState, action) {
  switch (action.type) {
    case SET_PLAYLISTS:
      return action.playlists;
      case CREATE_PLAYLIST:
        return [...state, action.playlist];
        case DELETE_PLAYLIST:
      return state.filter((playlist) => playlist.id !== action.playlist.id)
      ;
      default:
        return state;
    }
  }
