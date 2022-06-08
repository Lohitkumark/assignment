import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import Swal from 'sweetalert2'

export const userLogin = createAsyncThunk('post/adminLogin', async (values,{ rejectWithValue })=>{
    const {formData, onSubmitProps, props} = values
    // console.log(values);
    try {
        const res = await axios.post(`${process.env.React_App_base_url}/auth/login`, formData)
        localStorage.setItem('token', res.data.token)
        onSubmitProps.resetForm()
        props.history.push('/')
        props.handleAuth()
        // console.log(res);
      return res.data
    } catch (err) {
        Swal.fire(err.message)
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
            Swal.fire('Successfully Logged In')
            // console.log(action.payload);
        },
        [userLogin.rejected]:(state, action)=>{
            state.loading = false
            state.errors = action.payload.message
            console.log('err', action);
        }
    }
})

export default userSlice.reducer