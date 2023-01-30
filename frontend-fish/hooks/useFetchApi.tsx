import {useState} from "react";
// import {fetchData} from "../api/fetchData";

export default function useFetchApi() {
  const [load, setLoad] = useState(false);
  const [errorApi, setErrorApi] = useState(null);

  const requestApi = (method, endpoint, data) => {
    setErrorApi(null);
    setLoad(true)
    // return fetchData(method, endpoint, data)
    //   .then((res) => {
    //     if (res.status === 200 || res.status === 201) {
    //       return res.data
    //     } else {
    //       setErrorApi(res.message)
    //     }
    //   })
    //   .finally(() => setLoad(false));
  }

  return { load, requestApi, errorApi }
}
