import axios from "axios";

export const fetchData = async (method, endpoint, data) => {
  try {
    return await axios({
      method: method,
      url: process.env.API_URL + endpoint,
      data: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        // Authorization: `Bearer ${token ? token : tokenClient}`,
      },
    });
  } catch (e) {
    return { status: e.response.status, message: e.response.statusText };
  }
};

export const uploadFile = async (formData) => {
  try {
    return await axios({
      method: "POST",
      url: process.env.API_URL + "upload",
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    })
  } catch (e) {
    return { status: e.response.status, message: e.response.statusText };
  }
};
