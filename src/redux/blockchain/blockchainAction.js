import Web3 from "web3";
import LipToken from "../../contracts/LipToken.json";

const connectRequest = () => {
  return {
    type: "CONNECTION_REQUEST",
  };
};

const connectSuccess = (payload) => {
  return {
    type: "CONNECTION_SUCCESS",
    payload,
  };
};

const connectFailed = (payload) => {
  return {
    type: "CONNECTION_FAIL",
    payload,
  };
};

const updateAccount = (payload) => {
  window.location.reload();
  return {
    type: "UPDATE_ACCOUNT",
    payload,
  };
};

export const connect = () => {
  return async (dispatch) => {
    dispatch(connectRequest());
    if (window.ethereum) {
      let web3 = new Web3(window.ethereum);
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        const networkId = await window.ethereum.request({
          method: "net_version",
        });
        console.log("Account: ", accounts[0]);
        console.log("NetworkId: ", networkId);

        const lipTokenNetworkData = await LipToken.networks[networkId];
        if (lipTokenNetworkData) {
          const lipToken = new web3.eth.Contract(
            LipToken.abi,
            lipTokenNetworkData.address
          );
          dispatch(
            connectSuccess({
              account: accounts[0],
              lipToken: lipToken,
              web3: web3,
            })
          );
          // add listners
          window.ethereum.on("accountsChanged", async () => {
            let accounts = await web3.eth.getAccounts();
            dispatch(updateAccount(accounts[0]));
          });
          window.ethereum.on("chainChanged", () => {
            window.location.reload();
          });
          // listners end
        } else {
          dispatch(connectFailed("Change network to Polygon."));
        }
      } catch (err) {
        dispatch(connectFailed("Something went wrong!"));
      }
    } else {
      dispatch(connectFailed("Install Metamask."));
    }
  };
};
