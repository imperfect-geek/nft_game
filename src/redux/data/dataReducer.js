const initialState = {
  loading: false,
  allLips: [],
  allOwnerLips: [],
  err: false,
  errMsg: "",
};

const dataReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CHECK_DATA_REQUEST":
      return {
        ...state,
        loading: true,
      };

    case "CHECK_DATA_SUCCESS":
      return {
        ...state,
        loading: false,
        allLips: action.payload.allLips,
        allOwnerLips: action.payload.allOwnerLips,
      };

    case "CHECK_DATA_FAILED":
      return {
        ...initialState,
        loading: false,
        error: true,
        errMsg: action.payload,
      };

    default:
      return state;
  }
};

export default dataReducer;
