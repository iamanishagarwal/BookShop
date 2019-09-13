import { combineReducers } from "redux";
import storeSearchResult from "./storeSearchResult";
import storeSearchTerm from "./storeSearchTerm";
import authReducer from "./authReducer";

export default combineReducers({
  searchResult: storeSearchResult,
  searchTerm: storeSearchTerm,
  auth: authReducer
});
