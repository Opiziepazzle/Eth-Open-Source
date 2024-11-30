import { configureStore } from '@reduxjs/toolkit'
import demoReducer from './reducers/demo'
import counterReducer from "./reducers/counter"


export const store = configureStore({
  reducer: {
    demo: demoReducer,
    counter: counterReducer
  },
})

export { type RootState, type AppDispatch} from "./types"
export {decrement, increment, incrementByAmount} from "./reducers/counter"