import {configureStore} from "@reduxjs/toolkit";
import authSlice from "./authSlice.js";
import {tripsApi} from "./tripApi.js";


export default configureStore({
    reducer: {
        auth: authSlice,

        [tripsApi.reducerPath]: tripsApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware()
        .concat(tripsApi.middleware),
});