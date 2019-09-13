import axios from "axios";
import goodreads from "../api/goodreads";

export const searchResult = term => {
  return async function(dispatch) {
    const response = await goodreads.get("search/index.xml", {
      params: { q: term, key: "Z9Bg0nCAK3Yb5xADhosPg" }
    });
    console.log(response);
    dispatch({ type: "SEARCH_RESULT", payload: response });
  };
};

export const searchTerm = term => {
  return { type: "SEARCH_TERM", payload: term };
};

export const fetchUser = () => {
  return async dispatch => {
    const response = await axios.get("/api/user");
    dispatch({ type: "FETCH_USER", payload: response.data });
  };
};
