const storeSearchResult = (state = [], action) => {
  switch (action.type) {
    case "SEARCH_RESULT":
      return action.payload;

    default:
      return state;
  }
};

export default storeSearchResult;
