import {
  FETCH_CHARACTERS,
  FETCH_CHARACTER,
  OPEN_CLOSE
} from "../actions/constants";

const initialState = {
  characters: [],
  character: {
    name: "",
    thumbnail: {
      path: "",
      extension: ""
    },
    comics: {
      items: []
    }
  },
  isOpened: false
};
export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_CHARACTERS:
      return {
        ...state,
        characters: action.payload
      };
    case FETCH_CHARACTER:
      return {
        ...state,
        character: action.payload,
        isOpened: action.open
      };
    case OPEN_CLOSE:
      return {
        ...state,
        isOpened: action.payload
      };
    default:
      return state;
  }
}
