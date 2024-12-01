
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IOnboardUserState } from "../types";

// Define initial state with skills array
const initialState: IOnboardUserState = {
  firstName: "",
  lastName: "",
  username: "",
  email: "",
  role: "Contributor",
  photoURL: "",
  bio: "",
  website: "",
  profession: "Tech",
  expertise: "Beginner",
  skills: [], // Initialize the skills as an empty array
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    /**
     * Set user information in the store, including skills array.
     * @param state The current state of the user slice.
     * @param action The action containing user data, including skills.
     */
    setOnboardUser(state, action: PayloadAction<IOnboardUserState>) {
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.username = action.payload.username;
      state.email = action.payload.email;
      state.role = action.payload.role;
      state.photoURL = action.payload.photoURL;
      state.bio = action.payload.bio;
      state.website = action.payload.website;
      state.profession = action.payload.profession;
      state.expertise = action.payload.expertise;
      state.skills = action.payload.skills; // Set the skills array
    },

    /**
     * Clear user information from the store.
     */
    clearOnboardUser(state) {
      state.firstName = "";
      state.lastName = "";
      state.username = "";
      state.email = "";
      state.role = "Contributor";
      state.photoURL = "";
      state.bio = "";
      state.website = "";
      state.profession = "Tech";
      state.expertise = "Beginner";
      state.skills = []; // Clear the skills array
    },
  },
});

// Export actions to update user info
export const { setOnboardUser, clearOnboardUser } = userSlice.actions;

// Export the reducer to be used in the store
export default userSlice.reducer;
