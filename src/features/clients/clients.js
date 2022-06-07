import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from '../../app/axios'

export const createClient = createAsyncThunk('post/createClien', async (values, { rejectWithValue }) => {
    const token = localStorage.getItem('token')
    const {formData, onSubmitProps, props} = values
    // console.log('create',formData);
    try {
        const res = await axios.post('/clients', formData, {
        headers:{
            Authorization : token
        }
    })
        onSubmitProps.resetForm()
        props.history.push('/clients/list')

    return res.data
    } catch (err) {
        if(!err.response){
        throw err
        }
        return rejectWithValue(err.response.data)
    }
})

export const listClient = createAsyncThunk('get/listClient', async (value,{ rejectWithValue }) => {
    const token = localStorage.getItem('token')
    try {
        const res = await axios.get(`/clients?page=${value}&limit=10`, {
        headers:{
            Authorization : token
        }
    })
    return res.data
    } catch (err) {
        if(!err.response){
        throw err
        }
        return rejectWithValue(err.response.data)
    }
})

export const showClient = createAsyncThunk('get/showClient', async (value,{ rejectWithValue }) => {
    const token = localStorage.getItem('token')
    try {
        const res = await axios.get(`/clients/${value}`, {
        headers:{
            Authorization : token
        }
    })
    return res.data
    } catch (err) {
        if(!err.response){
        throw err
        }
        return rejectWithValue(err.response.data)
    }
})

export const deleteClient = createAsyncThunk('delete/deleteClient', async (value,{ rejectWithValue }) => {
    const token = localStorage.getItem('token')
    const {id, props} = value
    console.log('id', id);
    try {
        const res = await axios.delete(`/clients/${id}`, {
        headers:{
            Authorization : token
        }
    })
    props.history.push('/clients/list')
    return id

    } catch (err) {
        if(!err.response){
        throw err
        }
        return rejectWithValue(err.response.data)
    }
})

export const editClient = createAsyncThunk('put/editClient', async (values,{ rejectWithValue }) => {
    const token = localStorage.getItem('token')
    const {formData, onSubmitProps, props} = values


    try {
        const res = await axios.put(`/clients/${formData.id}`, formData ,{
        headers:{
            Authorization : token
        }
    })
        onSubmitProps.resetForm()
        props.history.push(`/clients/show/${formData.id}`)
    return formData

    } catch (err) {
        if(!err.response){
        throw err
        }
        return rejectWithValue(err.response.data)
    }
})

export const filterClients = createAsyncThunk('get/filterClients', async (value,{ rejectWithValue }) => {
    const token = localStorage.getItem('token')
    // console.log(value);
    try {
        const res = await axios.get(`/clients?name=${value}`, {
        headers:{
            Authorization : token
        }
    })

    return res.data
    } catch (err) {
        if(!err.response){
        throw err
        }
        return rejectWithValue(err.response.data)
    }
})

const clientSlice = createSlice({
    name:'client',
    initialState:{
        loading:false,
        data:[],
        meta:{},
        oneData:{},
        errors:'',
        filter:[],
        hasNext:true
    },
    reducers:{},
    extraReducers:{
        [createClient.pending]:(state)=>{
            state.loading = true
        },
        [createClient.fulfilled] : (state, action) => {
            state.loading = false
            state.data = [...state.data, action.payload]
            console.log('full',action);
        },
        [createClient.rejected]: (state, action)=>{
            state.loading = false
            state.errors = action.payload.message
            console.log('err', action);
        },
        [listClient.pending]:(state)=>{
            state.loading = true
        },
        [listClient.fulfilled] : (state, action) => {    
            state.loading = false
            if(action.payload.data.length>1){
                state.data = [...state.data, ...action.payload.data]
                state.meta = {...action.payload.meta}   
            }
            state.hasPrev = action.payload.meta.pagination.hasPrev
            state.hasNext = action.payload.meta.pagination.hasNext
            console.log('full',action);
        },
        [listClient.rejected]: (state, action)=>{
            state.loading = false
            state.errors = action.payload.message
            console.log('err', action);
        },
        [showClient.pending]:(state)=>{
            state.loading = true
        },
        [showClient.fulfilled] : (state, action) => {
            state.loading = false
            state.oneData = action.payload
            // console.log('full',action);
        },
        [showClient.rejected]: (state, action)=>{
            state.loading = false
            state.errors = action.payload.message
            // console.log('err', action);
        },
        [deleteClient.pending]:(state)=>{
            state.loading = true
        },
        [deleteClient.fulfilled] : (state, action) => {
            state.loading = false
            state.data = state.data.filter((client)=>{
                return client.id !== action.payload
            })
            console.log('full',action.payload);
        },
        [deleteClient.rejected]: (state, action)=>{
            state.loading = false
            state.errors = action.payload.message
            // console.log('err', action);
        },
        [editClient.pending]:(state)=>{
            state.loading = true
        },
        [editClient.fulfilled] : (state, action) => {
            state.loading = false
            state.data = state.data.map((client)=>{
                if(client.id==action.payload.id){
                    return {...action.payload}
                }else{
                    return {...client}
                }
            })
            console.log('full',action);
        },
        [editClient.rejected]: (state, action)=>{
            state.loading = false
            // state.errors = action.payload.message
            console.log('err', action);
        },
        [filterClients.pending]:(state)=>{
            state.loading = true
        },
        [filterClients.fulfilled] : (state, action) => {    
            state.loading = false
            state.filter = action.payload.data
        },
        [filterClients.rejected]: (state, action)=>{
            state.loading = false
            state.errors = action.payload.message
            console.log('err', action);
        },
    }
})

export default clientSlice.reducer