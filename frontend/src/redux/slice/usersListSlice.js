import axios from "axios";
import { createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import store from "../store.js";


export const getUsersList = createAsyncThunk("getUsersList", async (id) => {
  // problem is here
  const userLoginInfo = store.getState().userLogin.userInfo;
  const config = {
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${userLoginInfo.access}`,
    },
  };

  try {
    const { data } = await axios.get(
      `http://127.0.0.1:8000/api/users/`,
      config
    );
    return data;
  } catch (error) {
    console.log(error);
    return error.response.data.detail;
  }
});

const usersListSlice = createSlice({
  name: "usersList",
  initialState: {
    isLoading: false,
    users: [],
    error: null,
  },
  reducers: {
    USERS_LIST_RESET: (state,action) => {
        state.isLoading = true
        state.users = []
        state.error = null
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getUsersList.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getUsersList.fulfilled, (state, action) => {
      state.isLoading = false;
      state.users = action.payload;  
    });
    builder.addCase(getUsersList.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export const { USERS_LIST_RESET } = usersListSlice.actions
export default usersListSlice.reducer;
