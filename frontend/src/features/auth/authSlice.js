import {createSlice, createAsyncThunk} from "@reduxjs/toolkit"
import axios from "axios"

// Get user from local Storage if exists
const user = JSON.parse(localStorage.getItem("user"))

const initialState = {
    user: user? user : null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ""
}

// Register user - async funct
export const register = createAsyncThunk("auth/register", async (userData, thunkAPI) => {
    try {
        const response = await axios.post("api/users", userData)
        
        if(response.data) {
            localStorage.setItem("user", JSON.stringify(response.data))
        }

        return response.data
    } catch (error) {
        const message = (error.response?.data?.message || error.message || error.toString())
        return thunkAPI.rejectWithValue(message)
    }
})

// Login user - async funct
export const login = createAsyncThunk("auth/login", async (userData, thunkAPI) => {
    try {
        const response = await axios.post("api/users/login", userData)
        
        if(response.data) {
            localStorage.setItem("user", JSON.stringify(response.data))
        }

        return response.data
    } catch (error) {
        const message = (error.response?.data?.message || error.message || error.toString())
        return thunkAPI.rejectWithValue(message)
    }
})


export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        reset: (state) =>{
            state.isLoading = false
            state.isError = false
            state.isSuccess = false
            state.message = ""
        },
        logout: (state) => {
            localStorage.setItem("user", null)
            state.user = null
        }
    },
    extraReducers: (builder) =>{
        builder
            .addCase(register.pending, (state) =>{
                state.isLoading = true
            })
            .addCase(register.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.user = action.payload
            })
            .addCase(register.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                state.user = null
            })
            .addCase(login.pending, (state) =>{
                state.isLoading = true
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.user = action.payload
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                state.user = null
            })
    }
})

export const {reset, logout} = authSlice.actions
export default authSlice.reducer