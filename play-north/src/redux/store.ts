import {configureStore} from "@reduxjs/toolkit";
import loadingOverlayReducer from './slices/loading-overlay-slice';

 const store = configureStore({
    reducer: {
        loading: loadingOverlayReducer
    }
})

export type RootState = ReturnType<typeof store.getState>;

export default store;