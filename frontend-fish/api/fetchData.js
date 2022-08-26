import axios from "axios";

const user = localStorage.getItem("fish-user")

export const fetchData = async (method, endpoint, data) => {
  try {
    return await axios({
      method: method,
      url: process.env.API_URL + endpoint,
      data: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      },
    });
  } catch (e) {
    return { status: e.response.status, message: e.response.data.message };
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
        Authorization: `Bearer ${user.token}`,
      }
    })
  } catch (e) {
    return { status: e.response.status, message: e.response.data.message };
  }
};
