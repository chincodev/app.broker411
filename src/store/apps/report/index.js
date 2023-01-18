import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import axios from 'axios'
import toast from 'react-hot-toast'
import { reportService } from 'services/report.service'

// ** Fetch Reports
export const fetchData = createAsyncThunk('appReports/fetchData', async (params = '', { getState, dispatch }) => {
  try {
    await dispatch(setLoading())
    const response = await reportService.get('?'+params)
    return response
  } catch (er){
    er.errors && er.errors.map(x => toast.error(x.message))
  }
})

// ** Add Report
export const addReport = createAsyncThunk('appReports/addReport', async (data, { getState, dispatch }) => {
  const response = await axios.post('/apps/reports/add-report', {
    data
  })
  dispatch(fetchData(getState().report.params))

  return response.data
})

export const openReportDialog = createAsyncThunk('appReports/openReportDialog', async (data, { getState, dispatch }) => {
  return {
    reviewToReportId: data
  }
})

export const closeReportDialog = createAsyncThunk('appReports/closeReportDialog', async (data, { getState, dispatch }) => {
  return {
    reviewToReportId: null
  }
})


export const deleteReport = createAsyncThunk('appReports/deleteReport', async (id, { getState, dispatch }) => {
  const response = await axios.delete('/apps/reports/delete', {
    data: id
  })
  dispatch(fetchData(getState().report.params))

  return response.data
})

export const setLoading = createAsyncThunk('appReports/setLoading', async (id, { dispatch }) => {
  return true
})

export const appReportsSlice = createSlice({
  name: 'appReports',
  initialState: {
    data: [],
    reviewToReportId: null,
    profile:{},
    loading: true,
    total: null,
    params: {},
    allData: [],
    current_page:-1,
    page_size: 24,
    starting_at:1
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

  
    builder.addCase(openReportDialog.fulfilled, (state, action) => {
        console.log(action);
      state.reviewToReportId = action.payload.reviewToReportId
    })

    builder.addCase(closeReportDialog.fulfilled, (state, action) => {
      state.reviewToReportId = null
    })
  }
})

export default appReportsSlice.reducer