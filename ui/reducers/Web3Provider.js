export const web3InitialState = {
  provider: null,
  web3: null,
  address: null,
  network: null,
  connect: null,
  disconnect: null,
  token: null,
  cart: null,
  admin: null,
};

export function web3Reducer(state, action) {
  switch (action.type) {
    case "SET_WEB3_PROVIDER":
      return {
        ...state,
        provider: action.provider,
        web3: action.web3,
        address: action.address,
        network: action.network,
		token: action.token,
		cart: action.cart,
		admin: action.admin,
      };
    case "SET_ADDRESS":
      return {
        ...state,
        address: action.address,
      };
    case "SET_NETWORK":
      return {
        ...state,
        network: action.network,
      };
    case "RESET_WEB3_PROVIDER":
      return web3InitialState;
    default:
      throw new Error();
  }
}
