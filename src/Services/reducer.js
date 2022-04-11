export const initialState = {
  user: null,
  playlists: [],
  playing: false,
  item: null,
  currently_playing: {
    isPlaying: false,
    current_track_index: -1,
  },
  songs: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.user,
      };
    case "SET_TOKEN":
      return {
        ...state,
        token: action._token,
      };
    case "SET_PLAYLISTS":
      return {
        ...state,
        playlists: action.playlists,
      };
    case "SET_DISCOVER_WEEKLY":
      return {
        ...state,
        discover_weekly: action.discover_weekly,
      };
    case "SET_CURRENT_PLAYING":
      return {
        ...state,
        currently_playing: action.currently_playing,
      };

    case "SET_PLAYING_STATE":
      return {
        ...state,
        currently_playing: {
          ...state.currently_playing,
          isPlaying: action.isPlaying,
        },
      };
    case "CURRENT_PLAYLIST_SONGS":
      return {
        ...state,
        songs: action.songs,
      };

    default:
      return state;
  }
};

export default reducer;
