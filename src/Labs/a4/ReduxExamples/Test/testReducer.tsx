import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    element: 32,
    text: "hello",
    array: [1,2,3,4],
};

const testSlice = createSlice ({
    name: "test",
    initialState,
    reducers: {

    sum: (state, actions) => {
        state.array[0]= actions.payload.a + actions.payload.b;
    },

    inc: (state) => {
        state.element =  state.element+1;
    },

    dec: (state) => {
        state.element =  state.element-1;
    }

    }

});

export const {sum, inc, dec} = testSlice.actions;
export default testSlice.reducer;

