import CryptoJS from "crypto-js";
import moment from "moment";
import { FETCH_CHARACTERS, FETCH_CHARACTER, OPEN_CLOSE } from "./constants";
import { marvelApi as config } from "../config/config";

export const getCharacters = (origOptions = {}) => dispatch => {
  const URI = "/v1/public/characters";
  const timeStamp = moment().unix();
  const hash = CryptoJS.MD5(
    timeStamp + config.API_PRIVATE + config.API_PUBLIC
  ).toString(CryptoJS.enc.Hex);

  let params = `?apikey=${config.API_PUBLIC}&ts=${timeStamp}&hash=${hash}`;

  const url = `${config.BASE_URL}${URI}${params}`;

  fetch(url)
    .then(response =>
      response.json().then(res =>
        dispatch({
          type: FETCH_CHARACTERS,
          payload: res.data.results
        })
      )
    )
    .catch(error => {
      console.error(error);
    });
};

export const changeModal = value => dispatch => {
  dispatch({
    type: OPEN_CLOSE,
    payload: !value
  });
};

export const getDetails = (characterId, isOpened, offset = 0) => dispatch => {
  const URI = `/v1/public/characters/${characterId}`;
  const timeStamp = moment().unix();
  const hash = CryptoJS.MD5(
    timeStamp + config.API_PRIVATE + config.API_PUBLIC
  ).toString(CryptoJS.enc.Hex);

  const params = `?apikey=${config.API_PUBLIC}&ts=${timeStamp}&hash=${hash}`;
  const url = `${config.BASE_URL}${URI}${params}`;
  fetch(url)
    .then(response =>
      response.json().then(res =>
        dispatch({
          type: FETCH_CHARACTER,
          payload: res.data.results[0],
          open: !isOpened
        })
      )
    )
    .catch(error => {
      console.error(error);
    });
};
