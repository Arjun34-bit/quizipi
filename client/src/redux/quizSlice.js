import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk to create a quiz
export const createQuiz = createAsyncThunk(
  "quiz/createQuiz",
  async (quizData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post("/api/quiz/create", quizData);
      return data; // Response contains { message, link }
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk to fetch a quiz by link
export const fetchQuiz = createAsyncThunk(
  "quiz/fetchQuiz",
  async (link, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/api/quiz/${link}`);
      return data; // Returns the quiz data
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const quizSlice = createSlice({
  name: "quiz",
  initialState: { quiz: null, loading: false, quizLink: "", error: null },
  reducers: {
    resetQuizState: (state) => {
      state.quiz = null;
      state.quizLink = "";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createQuiz.pending, (state) => {
        state.loading = true;
      })
      .addCase(createQuiz.fulfilled, (state, action) => {
        state.loading = false;
        state.quizLink = action.payload.link; // Save the quiz link
      })
      .addCase(createQuiz.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchQuiz.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchQuiz.fulfilled, (state, action) => {
        state.loading = false;
        state.quiz = action.payload;
      })
      .addCase(fetchQuiz.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetQuizState } = quizSlice.actions;
export default quizSlice.reducer;
