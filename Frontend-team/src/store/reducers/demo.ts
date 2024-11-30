import { createSlice, PayloadAction } from '@reduxjs/toolkit'

// Define the shape of a single demo object
interface Demo {
  id: string        // Unique identifier for the demo
  isGreeted: boolean // Whether the demo has been greeted or not
  greet: string      // The greeting message associated with the demo
}

// Define the state type, which is an array of Demo objects
interface DemoState extends Array<Demo> {}

// Initial state of the demos slice, an empty array of demos
const initialState: DemoState = []

// Create a slice of the Redux store for managing demos
const demoSlice = createSlice({
  name: 'demos', // Name of the slice (used to identify actions/reducers)
  initialState,  // The initial state of the demos slice (empty array)
  reducers: {
    // Action to add a new demo to the state
    demoAdded(state, action: PayloadAction<{ id: string, greet: string }>) {
      // Add a new demo to the state with the provided ID and greet message
      state.push({
        id: action.payload.id,      // The unique identifier for the demo
        isGreeted: false,           // Initially, the demo hasn't been greeted
        greet: action.payload.greet // The greeting message for the demo
      })
    },

    // Action to toggle the 'isGreeted' status of a demo
    demoToggled(state, action: PayloadAction<string>) {
      // Find the demo by its ID
      const demo = state.find((demo) => demo.id === action.payload)

      // If the demo is found, toggle the 'isGreeted' status
      if (demo) {
        demo.isGreeted = !demo.isGreeted
      }
    },
  },
})

// Export the action creators so they can be used in components
export const { demoAdded, demoToggled } = demoSlice.actions

// Export the reducer to be used in the store
export default demoSlice.reducer
