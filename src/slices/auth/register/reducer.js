import { createSlice } from '@reduxjs/toolkit'

export const initialState = {
    registrationError: null,
    message: null,
    loading: false,
    user: null,
    success: false,
    error: false,
}

const registerSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        registerUserSuccessful(state, action) {
            state.user = action.payload
            state.loading = false
            state.success = true
            state.registrationError = null
            state.message = action.payload?.message
        },
        registerUserFailed(state, action) {
            state.user = null
            state.loading = false
            state.registrationError = action.payload
            state.error = true
            state.message = action.payload
        },
        resetRegisterFlagChange(state) {
            state.success = false
            state.error = false
            state.message = null
        },
        apiErrorChange(state, action) {
            state.error = action.payload
            state.loading = false
            state.isUserLogout = false
        },
    },
})

export const {
    registerUserSuccessful,
    registerUserFailed,
    resetRegisterFlagChange,
    apiErrorChange,
} = registerSlice.actions

export default registerSlice.reducer
