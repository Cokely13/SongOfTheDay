import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import playlistsReducer from './allPlaylistsStore'
import songsReducer from './allSongsStore'
import singlePlaylistReducer from './singlePlaylistStore'
import singleSongReducer from './singleSongStore'
import psongsReducer from './allPsongsStore'
import auth from './auth'
import usersReducer from './allUsersStore'
import singleUserReducer from './singleUserStore'

const reducer = combineReducers({ auth,
  allPlaylists: playlistsReducer,
  allSongs: songsReducer,
  singlePlaylist: singlePlaylistReducer,
  singleSong: singleSongReducer,
  allPsongs: psongsReducer,
  allUsers: usersReducer,
  singleUser: singleUserReducer })
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './auth'
