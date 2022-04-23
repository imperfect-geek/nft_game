const initialState = {
  loading: false,
  account: null,
  lipToken: null,
  web3: null,
  errMsg: null,
};

const blockchainReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CONNECTION_REQUEST":
      return {
        ...initialState,
        loading: true,
      };
    case "CONNECTION_SUCCESS":
      return {
        ...state,
        loading: false,
        account: action.payload.account,
        lipToken: action.payload.lipToken,
        web3: action.payload.web3,
      };
    case "CONNECTION_FAIL":
      return {
        ...initialState,
        loading: false,
        errMsg: action.payload,
      };
    case "UPDATE_ACCOUNT":
      return {
        ...state,
        account: action.payload,
      };
    default:
      return state;
  }
};

export default blockchainReducer;
