import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import axios from 'axios'
import toast from 'react-hot-toast'
import { laneService } from 'services/lane.service'

// ** Fetch Reports
export const getLanes = createAsyncThunk('appLanes/getLanes', async (params = '', { getState, dispatch }) => {

  try {
    await dispatch(setLaneing(true))
    const response = await laneService.get(params)
    return response
  } catch (er){
    console.log(er);
    er.errors && er.errors.map(x => toast.error(x.message))
  }
})

export const addLane = createAsyncThunk('appLanes/addLane', async (data, { getState, dispatch }) => {
  const response = await axios.post('/apps/reports/add-report', {
    data
  })
  dispatch(fetchData(getState().report.params))

  return response.data
})

export const showLaneSidebar = createAsyncThunk('appLanes/showLane', async (data, { getState, dispatch }) => {
  return data
})

export const deleteLane = createAsyncThunk('appLanes/deleteLane', async (id, { getState, dispatch }) => {
  const response = await axios.delete('/apps/reports/delete', {
    data: id
  })
  dispatch(fetchData(getState().report.params))

  return response.data
})

export const setLaneing = createAsyncThunk('appLanes/setLaneing', async (value, { dispatch }) => {
  return value
})

export const appLanesSlice = createSlice({
  name: 'appLanes',
  initialState: {
    data: [],
    reviewToReportId: null,
    profile:{},
    loading: true,
    showLaneSidebar:null,
    total: null,
    params: {},
    allData: [],
    current_page:-1,
    page_size: 24,
    starting_at:1
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getLanes.fulfilled, (state, action) => {
     
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
    builder.addCase(setLaneing.fulfilled, (state, action) => {
      state.loading = action.payload
    })
    builder.addCase(showLaneSidebar.fulfilled, (state, action) => {
      state.showLaneSidebar = action.payload
    })

  
    // builder.addCase(openReportDialog.fulfilled, (state, action) => {
    //     console.log(action);
    //   state.reviewToReportId = action.payload.reviewToReportId
    // })

    // builder.addCase(closeReportDialog.fulfilled, (state, action) => {
    //   state.reviewToReportId = null
    // })
  }
})

export default appLanesSlice.reducer