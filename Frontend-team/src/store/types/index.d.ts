<<<<<<< HEAD
import {store} from "../"
=======
import {store} from ".."
>>>>>>> origin/johnsdanlami
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
<<<<<<< HEAD
  };
=======
  };

export interface UserInfo {
    firstname: string;
    lastname: string;
    biography: string;
    email: string;
    // role: enum ["contributor", "maintainer"];
    website: string;
    telegram: string;
    profession: string;
    twitter: string;
    location: string;
    company: string;
  } 

  export interface IOnboardUserState {
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    role: "Contributor" | "Maintainer";
    photoURL: string;
    bio: string;
    website: string;
    profession: "Tech" | "Non-Tech";
    expertise: "Beginner" | "Intermediate" | "Expert";
    skills: string[]; // New field for skills
  }
  
>>>>>>> origin/johnsdanlami
