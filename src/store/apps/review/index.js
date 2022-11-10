import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import axios from 'axios'
import { isEmpty, omitBy } from 'lodash'
import toast from 'react-hot-toast'
import { categoryService } from 'services/category.service'
import { reviewService } from 'services/review.service'

// ** Fetch Fields
export const fetchData = createAsyncThunk('appReviews/fetchData', async (params = '', { getState, dispatch }) => {
  try {
    await dispatch(setLoading())
    const response = await reviewService.list(params ? params : window.location.search)
    return response
  } catch (er){
    console.log(er)
    er.errors && er.errors.map(x => toast.error(x.message))
  }
})


export const create = createAsyncThunk('appReviews/create', async (data, { getState, dispatch }) => {
  
  try {
    await dispatch(setLoading())
    await reviewService.create(data)
    await dispatch(fetchData())
  } catch (er) {
    console.log(er)
  }

})

export const setLoading = createAsyncThunk('appReviews/setLoading', async (id, { dispatch }) => {
  return true
})

export const appReviewsSlice = createSlice({
  name: 'appReviews',
  initialState: {
    data: [],
    loading: true,
    total: null,
    starting_at: null,
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
        state.starting_at = action.payload.starting_at
        state.loading = false
      } else {
        state.loading = false
      }
    }),
    builder.addCase(setLoading.fulfilled, (state, action) => {
      state.loading = true
    })

    // builder.addCase(create.fulfilled, (state, action) => {
    //   state.loading = true
    // })
  }
})

export default appReviewsSlice.reducer
