import axios from "axios";

export const post = async (URL, data, headers = {}) => {
  try {
    const response = await axios.post(URL, data, {
      headers: headers,
    });
    return response;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const get = async (URL, headers = {}) => {
  try {
    const response = await axios.get(URL, {
      headers: headers,
    });
    return response;
  } catch (err) {
    console.log(err);
    throw err;
  }
};
