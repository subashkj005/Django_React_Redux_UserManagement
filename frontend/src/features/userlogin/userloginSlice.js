import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    user :[],
    status : 'idle',
    error: null,
}

const userloginSlice = createSlice({
    name : 'userlogin',
    initialState,
    reducers : {
        authenticate : (state, action) => {
            state.user = action.payload
        }
    }
}) 

export default userloginSlice.reducer 
export const {authenticate} = userloginSlice.actions