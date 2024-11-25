import { createSlice } from "@reduxjs/toolkit";
import { ICounter } from "../types";
import {countAction} from "../actions"


const initialState: ICounter = {
    value: 0,
}

const counterSlice = createSlice({
    name: "counter",
    initialState,
    reducers: {
        decrement: countAction.decrement,
        increment: countAction.increment,
        incrementByAmount: countAction.incrementByAmount
    }
})

export const {decrement, increment, incrementByAmount} = counterSlice.actions;
export default counterSlice.reducer;