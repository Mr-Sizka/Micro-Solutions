import { configureStore } from '@reduxjs/toolkit'
import rootReducer from "app/rootReducer";

export const store = configureStore({
    reducer: rootReducer
})