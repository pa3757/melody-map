// utils/urlState.js
export const encodeState = (state) => {
  const jsonString = JSON.stringify(state);
  return btoa(jsonString);
};

export const decodeState = (encodedState) => {
  const jsonString = atob(encodedState);
  return JSON.parse(jsonString);
};
