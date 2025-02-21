import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { URL } from "../constants/constants";

// Async function for login
export const loginUser = (credentials) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const { data } = await axios.post(`${URL}/api/auth/login`, credentials);
    dispatch(setUser(data.data));
    dispatch(setLoading(false));
  } catch (error) {
    dispatch(setError(error.response?.data?.message || "Login failed"));
    dispatch(setLoading(false));
  }
};

// Async function for registration
export const registerUser = (userData) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const { data } = await axios.post(`${URL}/api/auth/signup`, userData);
    dispatch(setUser(data));
    dispatch(setLoading(false));
    alert("User Registered");
  } catch (error) {
    dispatch(setError(error.response?.data?.message || "Registration failed"));
    dispatch(setLoading(false));
  }
};

// Logout function
export const logoutUser = () => (dispatch) => {
  //   axios.post("/api/auth/logout"); // Optional: Call API if needed
  dispatch(logout());
};

const userSlice = createSlice({
  name: "user",
  initialState: { user: null, loading: false, error: null },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.error = null;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.error = null;
    },
  },
});

export const { setUser, setLoading, setError, logout } = userSlice.actions;

export default userSlice.reducer;
