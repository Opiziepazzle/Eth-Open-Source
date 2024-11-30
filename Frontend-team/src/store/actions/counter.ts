import { PayloadAction } from "@reduxjs/toolkit";
import { ICounter } from "../types";


const decrement = (state: ICounter) => {
    state.value -= 1;
}
const increment = (state: ICounter) => {
    state.value += 1;
}

const incrementByAmount = (state: ICounter, action: PayloadAction<number>) => {
    state.value += action.payload;
}

export default {decrement, increment, incrementByAmount};