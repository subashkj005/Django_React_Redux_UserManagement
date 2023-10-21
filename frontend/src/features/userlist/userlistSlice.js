import axios from 'axios'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const apiUrl = 'http://127.0.0.1:8000/users'

const initialState = {
    loading : false,
    users: [],
    error: null,

}

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
    const response = await axios.get(apiUrl)
    return response.data
})

const userlistSlice = createSlice({
    name:'users', 
    initialState,
    reducers: {
        deleteUser: (state, action)=>{
            state.users = state.users.filter((user)=> user.id !== action.payload  )
        }
    },
    extraReducers:builder=>{
        builder.addCase(fetchUsers.pending, (state) => {
            state.loading = 'true'
        })
        builder.addCase(fetchUsers.fulfilled, (state, action) => {
            state.loading = 'false'
            state.users = action.payload
        })
        builder.addCase(fetchUsers.rejected, (state, action) => {
            state.rejected = 'false'
            state.error = action.error.message
        })
    }
})

export const {deleteUser} = userlistSlice.actions

export default userlistSlice.reducer