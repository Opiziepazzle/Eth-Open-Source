import {store} from ".."
export interface ICounter {
    value: number;
}

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export interface AuthState {
    user: User | null;
    loading: boolean;
    error: string | null;
  }
  
export const initialState: AuthState = {
    user: null,
    loading: false,
    error: null,
  };