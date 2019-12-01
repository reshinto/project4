export const updateObject = (oldObject, updatedProperties) => {
  return {
    ...oldObject,
    ...updatedProperties
  };
};

// Setup config with token - helper function
export const tokenConfig = getState => {
  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  // Get token from state
  const token = getState().authReducer.token;
  // If token, add to headers config
  if (token) {
    config.headers["Authorization"] = `${token}`;
  }
  return config;
};

// export const db = "https://asia-northeast1-shoptimizeprime.cloudfunctions.net/api";
export const db = "http://localhost:5000/shoptimizeprime/asia-northeast1/api"
