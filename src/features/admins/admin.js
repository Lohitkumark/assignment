import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import Swal from 'sweetalert2'

export const createAdmin = createAsyncThunk('post/createAdmin', async (values, { rejectWithValue }) => {
    const token = localStorage.getItem('token')
    const {formData, onSubmitProps, props} = values
    console.log('create',formData);
    try {
        const res = await axios.post(`${process.env.React_App_base_url}/admins`, formData, {
        headers:{
            Authorization : token
        }
    })
        onSubmitProps.resetForm()
        props.history.push('/AdminList')
    return res.data
    } catch (err) {
        Swal.fire(err.message)
        if(!err.response){
        throw err
        }
        return rejectWithValue(err.response.data)
    }
})

export const listAdmin = createAsyncThunk('get/listAdmin', async (value,{ rejectWithValue }) => {
    const token = localStorage.getItem('token')
    // console.log(value);
    try {
        const res = await axios.get(`${process.env.React_App_base_url}/admins?page=${value}&limit=10`, {
        headers:{
            Authorization : token
        }
    })

    return res.data
    } catch (err) {
        Swal.fire(err.message)
        if(!err.response){
        throw err
        }
        return rejectWithValue(err.response.data)
    }
})

export const showAdmin = createAsyncThunk('get/showAdmin', async (value,{ rejectWithValue }) => {
    const token = localStorage.getItem('token')
    try {
        const res = await axios.get(`${process.env.React_App_base_url}/admins/${value}`, {
        headers:{
            Authorization : token
        }
    })
    return res.data
    } catch (err) {
        Swal.fire(err.message)
        if(!err.response){
        throw err
        }
        return rejectWithValue(err.response.data)
    }
})

export const deleteAdmin = createAsyncThunk('delete/deleteAdmin', async (value,{ rejectWithValue }) => {
    const token = localStorage.getItem('token')
    const {id, props} = value
    console.log('id', id);
    try {
        const res = await axios.delete(`${process.env.React_App_base_url}/admins/${id}`, {
        headers:{
            Authorization : token
        }
    })
    props.history.push('/Admins/List')
    return id

    } catch (err) {
        Swal.fire(err.message)
        if(!err.response){
        throw err
        }
        return rejectWithValue(err.response.data)
    }
})

export const editAdmin = createAsyncThunk('put/editAdmin', async (values,{ rejectWithValue }) => {
    const token = localStorage.getItem('token')
    const {formData, onSubmitProps, props} = values


    try {
        const res = await axios.put(`${process.env.React_App_base_url}/admins/${formData.id}`, formData ,{
        headers:{
            Authorization : token
        }
    })
        onSubmitProps.resetForm()
        props.history.push('/admins/list')
    return formData

    } catch (err) {
        Swal.fire(err.message)
        if(!err.response){
        throw err
        }
        return rejectWithValue(err.response.data)
    }
})

export const filterAdmins = createAsyncThunk('get/filterAdmins', async (value,{ rejectWithValue }) => {
    const token = localStorage.getItem('token')
    // console.log(value);
    try {
        const res = await axios.get(`${process.env.React_App_base_url}/admins?name=${value}`, {
        headers:{
            Authorization : token
        }
    })

    return res.data
    } catch (err) {
        Swal.fire(err.message)
        if(!err.response){
        throw err
        }
        return rejectWithValue(err.response.data)
    }
})

const adminSlice = createSlice({
    name:'admin',
    initialState:{
        loading:true,
        data:[],
        meta:{},
        oneData:{},
        errors:'',
        filter:[],
        hasNext:true,
        hasPrev:false
    },
    reducers:{
        resetAdmins:(state)=>{
            state.data = []
            // console.log("red",state.data);
        }
    },
    extraReducers:{
        [createAdmin.pending]:(state)=>{
            state.loading = true
        },
        [createAdmin.fulfilled] : (state, action) => {
            state.loading = false
            state.data = [...state.data, action.payload]
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Successfully Created',
                showConfirmButton: false,
                timer: 1500
              })
            // console.log('full',action);
        },
        [createAdmin.rejected]: (state, action)=>{
            state.loading = false
            state.errors = action.payload.message
            Swal.fire({
                icon: 'error',
                title: action.payload.message
              })    
            console.log('err', action);
        },
        [listAdmin.pending]:(state)=>{
            state.loading = true
        },
        [listAdmin.fulfilled] : (state, action) => {    
            state.loading = false
            if(action.payload.data.length>1){
                state.data = [...state.data, ...action.payload.data]
                state.meta = {...action.payload.meta} 
                 
            }
            state.hasPrev = action.payload.meta.pagination.hasPrev
            state.hasNext = action.payload.meta.pagination.hasNext
            // console.log('full',action);
        },
        [listAdmin.rejected]: (state, action)=>{
            state.loading = false
            state.errors = action.payload.message
            Swal.fire({
                icon: 'error',
                title: action.payload.message
              })
            // console.log('err', action);
        },
        [showAdmin.pending]:(state)=>{
            state.loading = true
        },
        [showAdmin.fulfilled] : (state, action) => {
            state.loading = false
            state.oneData = action.payload
            // console.log('full',action);
        },
        [showAdmin.rejected]: (state, action)=>{
            state.loading = false
            state.errors = action.payload.message
            Swal.fire({
                icon: 'error',
                title: action.payload.message
              })
            // console.log('err', action);
        },
        [deleteAdmin.pending]:(state)=>{
            state.loading = true
        },
        [deleteAdmin.fulfilled] : (state, action) => {
            state.loading = false
            state.data = state.data.filter((admin)=>{
                return admin.id !== action.payload
            })
            console.log('full',action.payload);
        },
        [deleteAdmin.rejected]: (state, action)=>{
            state.loading = false
            state.errors = action.payload.message
            Swal.fire({
                icon: 'error',
                title: action.payload.message
              })
            // console.log('err', action);
        },
        [editAdmin.pending]:(state)=>{
            state.loading = true
        },
        [editAdmin.fulfilled] : (state, action) => {
            state.loading = false
            state.data = state.data.map((admin)=>{
                if(admin.id==action.payload.id){
                    return {...action.payload}
                }else{
                    return {...admin}
                }
            })
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Successfully updated',
                showConfirmButton: false,
                timer: 1500
              })
            // console.log('full',action);
        },
        [editAdmin.rejected]: (state, action)=>{
            state.loading = false
            state.errors = action.payload.message
            Swal.fire({
                icon: 'error',
                title: action.payload.message
              })
            // console.log('err', action);
        },
        [filterAdmins.pending]:(state)=>{
            state.loading = true
        },
        [filterAdmins.fulfilled] : (state, action) => {    
            state.loading = false
            state.filter = action.payload.data
        },
        [filterAdmins.rejected]: (state, action)=>{
            state.loading = false
            state.errors = action.payload.message
            Swal.fire({
                icon: 'error',
                title: action.payload.message
              })
            // console.log('err', action);
        },
    }
})

export const {resetAdmins} = adminSlice.actions

export default adminSlice.reducer