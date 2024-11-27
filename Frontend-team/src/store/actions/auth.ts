import { AppDispatch } from "../";
import { signInWithGitHub, signOutUser } from "../../services/firebase";
import { setUser, setLoading, setError } from "../reducers/auth";

/**
 * Signs in a user with GitHub. If the sign in is successful, sets the user state with the user's data.
 * If there is an error, sets the error state with the error message. Finally, sets the loading state to false.
 * @returns {Promise<void>}
 */
export const loginWithGitHub = () => async (dispatch: AppDispatch) => {
  dispatch(setLoading(true));
  try {
    const user = await signInWithGitHub();
    dispatch(
        setUser({
            uid: user.uid,
            displayName: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
            username: user.displayName?.replace(/\s+/g, "").toLowerCase() || "anonymous", // Example logic for username
            token: null, // Assuming `user` contains this field
          })
          
    );
    dispatch(setError(null));
  } catch (error: any) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

/**
 * Logs out the current user by calling the signOutUser service.
 * Sets the user state to null and clears any error state.
 * Displays any error message encountered during the sign-out process.
 * Finally, sets the loading state to false.
 * @returns {Promise<void>}
 */
export const logout = () => async (dispatch: AppDispatch) => {
  dispatch(setLoading(true));
  try {
    await signOutUser();
    dispatch(setUser(null));
    dispatch(setError(null));
  } catch (error: any) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};
