import axios from 'axios'
import { createAsyncThunk, createSlice} from '@reduxjs/toolkit'


export const registerUser = createAsyncThunk(
    'registerUser',
    async ({name,email,password}) => {
        const config = {
            headers : {
                'Content-type': 'application/json'
            }}

        const {data} = await axios.post('http://127.0.0.1:8000/api/users/register/',
             {'name': name, 'email': email, 'password': password}, config)
        return data
    })

const userRegisterSlice = createSlice({
    name:'userRegister',
    initialState: {
        isLoading:false,
        error:null
    },
    reducers: {

    },
    extraReducers:(builder) => {
        builder.addCase(registerUser.pending, (state,action) => {
            state.isLoading = true
        })
        builder.addCase(registerUser.fulfilled, (state,action) => {
            state.isLoading = false
        })
        builder.addCase(registerUser.rejected, (state,action) => {
            state.isLoading = false
            state.error = 'User with this email already exists'
        })
    }
})


export const {} = userRegisterSlice.actions

export default userRegisterSlice.reducer