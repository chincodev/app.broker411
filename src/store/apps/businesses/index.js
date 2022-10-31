import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import axios from 'axios'
import { businessService } from 'services/business.service'

// ** Fetch Users
export const fetchData = createAsyncThunk('appUsers/fetchData', async params => {
  const response = await businessService.get('')
  return response.data
})

// ** Add User
export const addUser = createAsyncThunk('appUsers/addUser', async (data, { getState, dispatch }) => {
  const response = await axios.post('/apps/users/add-user', {
    data
  })
  dispatch(fetchData(getState().user.params))

  return response.data
})

// ** Delete User
export const deleteUser = createAsyncThunk('appUsers/deleteUser', async (id, { getState, dispatch }) => {
  const response = await axios.delete('/apps/users/delete', {
    data: id
  })
  dispatch(fetchData(getState().user.params))

  return response.data
})

export const appUsersSlice = createSlice({
  name: 'adminBusinesses',
  initialState: {
    data: [],
    total: 1,
    params: {},
    allData: []
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchData.fulfilled, (state, action) => {
      if(action.payload){
        state.data = action.payload.data
        state.total = action.payload.total
        state.params = action.payload.params
        state.loading = false
      } else {
        state.loading = false
      }
    })
  }
})

export default appUsersSlice.reducer
