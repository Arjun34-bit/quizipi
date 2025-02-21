import { configureStore } from "@reduxjs/toolkit";
import quizReducer from "./quizSlice";
import userReducer from "./userReducer";

export default configureStore({
  reducer: { quiz: quizReducer, user: userReducer },
});
