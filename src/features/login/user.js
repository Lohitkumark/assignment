import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const userLogin = createAsyncThunk('post/adminLogin', async (values,{ rejectWithValue })=>{
    const {formData, onSubmitProps, props} = values
    // console.log(values);
    try {
        const res = await axios.post('http://23.21.204.21:8080/api/v1/auth/login', formData)
        localStorage.setItem('token', res.data.token)
        onSubmitProps.resetForm()
        props.history.push('/S')
        props.handleAuth()
        // console.log(res);
      return res.data
    } catch (err) {
        if(!err.response){
            throw err
            }
            return rejectWithValue(err.response.data)
    }
   
})  

const userSlice = createSlice({
    name:'login',
    initialState:{
        loading:false,
        data:[],
        errors:null
    },
    reducers:{ },
    extraReducers:{
        [userLogin.pending]:(state)=>{
            state.loading = true
        },
        [userLogin.fulfilled]:(state, action)=>{
            state.loading = false
            state.data = {...action.payload}
            console.log(action.payload);
        },
        [userLogin.rejected]:(state, action)=>{
            state.loading = false
            state.errors = action.payload.message
            console.log('err', action);
        }
    }
})

export default userSlice.reducer