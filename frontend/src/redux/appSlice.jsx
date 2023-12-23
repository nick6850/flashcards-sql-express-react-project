import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  flashcards: [],
  isSignedIn: false,
  isLoading: false,
  error: null,
};

const token = localStorage.getItem("token");

export const signIn = createAsyncThunk(
  "appSlice/signIn",
  async (userCredentials) => {
    const res = await axios.post(
      "http://localhost:3001/users/signin",
      userCredentials
    );
    localStorage.setItem("token", res.data.token);
    return res.data;
  }
);

export const fetchFlashcards = createAsyncThunk(
  "appSlice/fetchFlashcards",
  async () => {
    const res = await axios("http://localhost:3001/flashcards", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  }
);

export const postFlashcard = createAsyncThunk(
  "appSlice/postFlashcard",
  async (newFlashcard) => {
    const res = await axios.post(
      "http://localhost:3001/flashcards",
      newFlashcard,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data;
  }
);

export const updateFlashcard = createAsyncThunk(
  "appSlice/updateFlashcard",
  async (updatedFlashcard) => {
    const { id, ...flashcardData } = updatedFlashcard;
    const res = await axios.update(
      `http://localhost:3001/flashcards/${id}`,
      flashcardData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data;
  }
);

export const deleteFlashcard = createAsyncThunk(
  "appSlice/deleteFlashcard",
  async (id) => {
    const res = await axios.delete(`http://localhost:3001/flashcards/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return id;
  }
);

export const appSlice = createSlice({
  name: "appSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(signIn.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(signIn.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSignedIn = true;
    });
    builder.addCase(signIn.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
    builder.addCase(fetchFlashcards.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchFlashcards.fulfilled, (state, action) => {
      state.isLoading = false;
      state.flashcards = action.payload;
    });
    builder.addCase(fetchFlashcards.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
    builder.addCase(postFlashcard.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(postFlashcard.fulfilled, (state, action) => {
      state.isLoading = false;
      state.flashcards.push(action.payload);
    });
    builder.addCase(postFlashcard.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
    builder.addCase(updateFlashcard.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateFlashcard.fulfilled, (state, action) => {
      state.isLoading = false;
      state.flashcards = state.flashcards.map((flashcard) =>
        flashcard.id === action.payload.id ? action.payload : flashcard
      );
    });
    builder.addCase(updateFlashcard.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
    builder.addCase(deleteFlashcard.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deleteFlashcard.fulfilled, (state, action) => {
      state.isLoading = false;
      state.flashcards = state.flashcards.filter(
        (flashcard) => flashcard.id !== action.payload
      );
    });
    builder.addCase(deleteFlashcard.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
  },
});

export default appSlice.reducer;
