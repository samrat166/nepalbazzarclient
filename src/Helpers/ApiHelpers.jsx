import axios from "axios";

const DEVLOPMENT__URI = "http://localhost:4000/api/v1";

export const apiRequestHelper = async (
  endPoint,
  method = "get",
  body,
  headers
) => {
  try {
    const response = await axios({
      method,
      url: `${DEVLOPMENT__URI}/${endPoint}`,
      data: body,
      headers,
    });
    if (response) {
      return {
        isError: false,
        data: response ? response.data.msg : null,
        message: "Success",
        statusCode: response ? response.status : null,
      };
    }
  } catch (error) {
    if (error.response.status === 404) {
      return {
        isError: true,
        message: "Requested Page Is Not Found",
        statusCode: error.response.status,
      };
    } else if (error.response.status === 500) {
      return {
        isError: true,
        message: "Network Error",
        statusCode: error.response.status,
      };
    } else {
      return {
        isError: true,
        message: error.response.data.msg,
        statusCode: error.response.status,
      };
    }
  }
};
