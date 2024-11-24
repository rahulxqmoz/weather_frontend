import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import weatherReducer from "./weatherSlice";
import usersSlice from "./userSlice";

const store = configureStore({
    reducer: {
        auth: authReducer,
        weather:weatherReducer,
        users:usersSlice,

    },
});

export default store;
