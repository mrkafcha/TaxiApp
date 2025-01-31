import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    user: localStorage.getItem('user') ? localStorage.getItem('user') : undefined,
    region: localStorage.getItem('region') ? localStorage.getItem('region') : undefined,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
        setRegion: (state, action) => {
          state.region = action.payload;
        }
    }

});

export const { setUser, setRegion } = authSlice.actions;
export default authSlice.reducer;