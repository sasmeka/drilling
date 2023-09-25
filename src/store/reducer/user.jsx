import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: 'user',
    initialState: {
        isAuth: false,
        token: '',
        refresh_token: '',
        data: {}
    },
    reducers: {
        login(state, action) {
            return {
                ...state,
                isAuth: true,
                data: {},
                token: action.payload
            }
        },
        adddata(state, action) {
            return {
                ...state,
                data: action.payload
            }
        },
        addrefresh_token(state, action) {
            return {
                ...state,
                refresh_token: action.payload
            }
        },
        logout(state, action) {
            return {
                ...state,
                isAuth: false,
                token: '',
                refresh_token: '',
                data: {}
            }
        }
    }
})

export const { login, adddata, logout, addrefresh_token } = userSlice.actions
export default userSlice.reducer