import axios from "axios";
import { AppDispatch, RootState } from "..";
import { apiUrl } from "../../config/constants";
import { fetchAllTips } from "./slice";

export const getAllTips =
  () => async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      const response = await axios.get(`${apiUrl}/tips`);
      //   console.log("response", response);

      dispatch(fetchAllTips(response.data.tips));
    } catch (e) {
      if (e instanceof Error) console.log("error message", e.message);
    }
  };