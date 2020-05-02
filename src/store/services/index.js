import axios from "axios";
import { isNil } from "lodash";
// Change the hostName to actual node service

const localURL = "http://localhost:3000";
const remoteURL = "http://localhost:4000";
const ApiClient = {
  getQA() {
    const response = axios
      .get(`${localURL}/findAllQuestionwithAnswerforAll`)
      .then((res) => {
        let returnResponse;
        try {
          if (!isNil(res.data)) {
            // console.log(res.data);
            returnResponse = res.data;
          }
        } catch (error) {
          console.log(error);
        }
        return returnResponse;
      })
      .catch((error) => {
        throw error;
      });
    return response;
  },
};

export default ApiClient;
