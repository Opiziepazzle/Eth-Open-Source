import { configureStore } from '@reduxjs/toolkit'
import demoReducer from './reducers/demo'
import counterReducer from "./reducers/counter"
<<<<<<< HEAD

=======
import authReducer from "./reducers/auth"
import { useDispatch } from 'react-redux'
import { AppDispatch } from './types'
>>>>>>> origin/johnsdanlami

export const store = configureStore({
  reducer: {
    demo: demoReducer,
<<<<<<< HEAD
    counter: counterReducer
=======
    counter: counterReducer,
    auth: authReducer
>>>>>>> origin/johnsdanlami
  },
})

export { type RootState, type AppDispatch} from "./types"
<<<<<<< HEAD
=======
export const useAppDispatch: () => AppDispatch = useDispatch;

>>>>>>> origin/johnsdanlami
export {decrement, increment, incrementByAmount} from "./reducers/counter"