import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    isLoading: false
}

const loadingOverlaySlice = createSlice({
    name: 'loading',
    initialState,
    reducers: {
        showLoadingOverlay:state => {
            state.isLoading = true
        },
        hideLoadingOverlay: state => {
            state.isLoading = false;
        }
    }
})

export const {showLoadingOverlay, hideLoadingOverlay} = loadingOverlaySlice.actions;

export default loadingOverlaySlice.reducer;
