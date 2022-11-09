import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import axios from 'axios'
import { isEmpty, omitBy } from 'lodash'
import toast from 'react-hot-toast'
import { reviewService } from 'services/review.service'

// ** Fetch Businesses
export const fetchData = createAsyncThunk('appFeeds/fetchData', async (params = '', { getState, dispatch }) => {
  try {
    await dispatch(setLoading())
    const response = await reviewService.list('?'+params)
    return response
  } catch (er){
    console.log(er)
    er.errors && er.errors.map(x => toast.error(x.message))
  }
})



export const setLoading = createAsyncThunk('appFeeds/setLoading', async (id, { dispatch }) => {
  return true
})

export const appFeedsSlice = createSlice({
  name: 'appFeeds',
  initialState: {
    data: [],
    loading: true,
    total: null,
    params: {},
    allData: [],
    current_page:-1,
    page_size: 24
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchData.fulfilled, (state, action) => {
      if(action.payload){
        state.data = action.payload.data
        state.total = action.payload.total
        state.params = action.payload.params
        state.current_page = action.payload.current_page
        state.page_size = action.payload.page_size
        state.loading = false
      } else {
        state.loading = false
      }
    }),
    builder.addCase(setLoading.fulfilled, (state, action) => {
      state.loading = true
    })
  }
})

export default appFeedsSlice.reducer
