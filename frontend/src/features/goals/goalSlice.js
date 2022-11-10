import {createSlice, createAsyncThunk} from "@reduxjs/toolkit"
import axios from "axios"

const initialState = {
    goals: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ""
}

// Create a new goal
export const createGoal = createAsyncThunk("goals/create", async (goalData, thunkAPI)=> {
    try {
        const token = thunkAPI.getState().auth.user.token

        const config = {
            headers: {
                Authorization : `Bearer ${token}`
            }
        }

        const response = await axios.post("/api/goals/", goalData, config)
        return response.data

    } catch (error) {
        const message = (error.response?.data?.message || error.message || error.toString())
        return thunkAPI.rejectWithValue(message)
    }
})

// Get all goals
export const getGoals = createAsyncThunk("goals/getAll", async ( _, thunkAPI ) => {
    try {
        const token = thunkAPI.getState().auth.user.token

        const config = {
            headers: {
                Authorization : `Bearer ${token}`
            }
        }

        const response = await axios.get("api/goals/", config)
        return response.data

    } catch (error) {
        const message = (error.response?.data?.message || error.message || error.toString())
        return thunkAPI.rejectWithValue(message)
    }
})

// Delete a goal
export const deleteGoal = createAsyncThunk("goals/deleteGoal", async ( _id, thunkAPI ) => {
    try {
        const token = thunkAPI.getState().auth.user.token

        const config = {
            headers: {
                Authorization : `Bearer ${token}`
            }
        }

        const response = await axios.delete(`api/goals/${_id}`, config)
        return response.data

    } catch (error) {
        const message = (error.response?.data?.message || error.message || error.toString())
        return thunkAPI.rejectWithValue(message)
    }
})



export const goalSlice = createSlice({
    name: "goal",
    initialState,
    reducers: {
        reset: (state) => initialState
    },
    extraReducers: (builder) => {
        builder
            // Create goal
            .addCase(createGoal.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createGoal.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.goals.push(action.payload)
            })
            .addCase(createGoal.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            // Get goals
            .addCase(getGoals.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getGoals.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.goals = action.payload
            })
            .addCase(getGoals.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            // Delete a goal
            .addCase(deleteGoal.pending, (state) => {
                state.isLoading = true
            })
            .addCase(deleteGoal.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.goals = state.goals.filter( item => item._id !== action.payload.id)
            })
            .addCase(deleteGoal.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
    }
})

export const { reset } = goalSlice.actions
export default goalSlice.reducer