import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from '@reduxjs/toolkit/query'
import { worldTime } from "./Worldtimeapi";

export const store = configureStore({
    reducer:{
        [worldTime.reducerPath]:worldTime.reducer,

    },
    middleware:(getDefaultMiddleware)=>
    getDefaultMiddleware().concat(worldTime.middleware)
})
setupListeners(store.dispatch)