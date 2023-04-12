import { Box, Button, Card, CardActions, CircularProgress, DialogActions, Divider, FormControl, FormHelperText, Grid, InputLabel, MenuItem, Select, TextareaAutosize, TextField, Typography } from '@mui/material'
import React, { forwardRef, useEffect, useState } from 'react'
import DatePicker from '@mui/lab/DatePicker'
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { LocalizationProvider } from '@mui/lab'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import AutocompleteAsynchronousRequest from 'src/@core/components/AutocompleteAsynchronousRequest.js';
import { cityService } from 'services/city.service.js';
import Cleave from 'cleave.js/react'
import 'cleave.js/dist/addons/cleave-phone.us'
import InputMaskExamples from 'src/views/forms/form-elements/input-mask/InputMaskExamples'
import CardSnippet from 'src/@core/components/card-snippet/index.js';
import * as source from 'src/views/forms/form-elements/input-mask/InputMaskSourceCode'
import CleaveWrapper from 'src/@core/styles/libs/react-cleave'
import { useForm } from 'react-hook-form';
import { loadService } from 'services/load.service.js';
import { useSelector } from 'react-redux';
import { fetchData } from 'src/store/apps/field/index.js';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import { setLoading } from 'src/store/apps/load/index.js';
import Spinner from 'src/@core/components/spinner'
import moment from 'moment';
import Flatpickr from "react-flatpickr";
import { laneService } from 'services/lane.service';
require("flatpickr/dist/themes/dark.css");


const citiesGetAll = cityService.list;

const LaneForm = (props) => {

    const { values, setValues, idToEdit } = props

    const { handleClose } = props
    const store = useSelector(state => state)
    const fields = useSelector(state => state.fields)
    const dispatch = useDispatch()

    console.log(store)

    const handleValues = (field, value) => {
        setValues({
            ...values,
            [field]: value
        })
    }

    console.log(props);
    
    const { register, handleSubmit, watch, clearErrors, getValues, setError, formState: { errors } } = useForm();

    

    const onSubmit = async (e) => {
      
        try {
            let data = Object.assign({}, values)

            if(data.age === ''){
                data.age = null
            }
            if(data.length === ''){
                data.length = null
            }
            if(data.weight === ''){
                data.weight = null
            }
            if(data.dhd === ''){
                data.dhd = null
            }
            if(data.dho === ''){
                data.dho = null
            }

            if(!data.destination_region_id || data.destination_region_id === null){
                delete data.destination_region_id
            }

            if(!data.origin_region_id || data.origin_region_id === null){
                delete data.origin_region_id
            }
            if(!data.destination_city_id || data.destination_city_id === null){
                delete data.destination_city_id
            }

            if(!data.origin_city_id || data.origin_city_id === null){
                delete data.origin_city_id
            }




            if(data.origin_city_id && data.origin_city_id.id){
                data.origin_city_id = data.origin_city_id.id
            }

            if(data.destination_city_id && data.destination_city_id.id){
                data.destination_city_id = data.destination_city_id.id
            }





            if(data.destination_city_id){
            } else {
                delete data.dhd
            }

            if(data.origin_city_id){
            } else {
                delete data.dho
            }

           

            data.available_date_start = data.available_date[0]
            data.available_date_end = data.available_date[1]
            delete data.available_date

            

          


            let cleanedData = Object.fromEntries(Object.entries(data).filter(([_, v]) => (v != null || v != '')));

            dispatch(setLoading(true))

            if(idToEdit > 0){
                await laneService.update(idToEdit, cleanedData)
                dispatch(setLoading(false))
                toast.success('Load #'+idToEdit+' has been updated.')
            } else {
                await laneService.create(cleanedData)
                dispatch(setLoading(false))
                toast.success('A new lane has been added.')
            }

            
           
            props.reload()
            handleClose()
        } catch (er){
         
            if(er.code === 422){
                if(er.errors.length > 0){
                    er.errors.map(x => {
                        setError(x.path[0], {
                            type: 'manual',
                            message: x.message
                        });
                    })
                }
            }
            console.log(er);
            dispatch(setLoading(false))
            //setError("test", { type: "focus" }, { shouldFocus: true });
        }
    }

    useEffect(() => {
        console.log(fields.data);
        if(fields.data.length === 0){
            dispatch(fetchData('?page_size=50'))
        }
    }, [])

    const type = ['load', 'truck']
    
            
    return (
        <>
            {
                fields.data.length > 0 ? 
            
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <form onSubmit={handleSubmit(onSubmit)}>
                 
                  
                    <Grid container spacing={5}>
                        <Grid item xs={12} md={6}>
                            {console.log(values)}
                            <FormControl fullWidth>
                                <AutocompleteAsynchronousRequest
                                    endpoint={citiesGetAll}
                                    label='Search Origin'
                                    disabled={store.loading}
                                    field='origin_city_id'
                                    value={values.origin_city_id}
                                    setValue={(value) => handleValues('origin_city_id', value)}
                                    onFocus={()=>clearErrors('origin_city_id')}
                                    errors={errors}
                                />
                                {errors.origin_city_id && <FormHelperText sx={{ color: 'error.main' }}>{errors.origin_city_id.message}</FormHelperText>}
                            </FormControl>
                            
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <FormControl fullWidth>
                                <TextField 
                                    size='small'
                                    type='number' 
                                    disabled={store.loading}
                                    label='DHO' 
                                    error={Boolean(errors['dho'])}
                                    value={values.dho}
                                    onChange={e => handleValues('dho', e.target.value)}
                                    onFocus={()=>clearErrors('dho')}
                                />
                                {errors.dho && <FormHelperText sx={{ color: 'error.main' }}>{errors.dho.message}</FormHelperText>}
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <FormControl fullWidth>
                                <AutocompleteAsynchronousRequest
                                    endpoint={citiesGetAll}
                                    disabled={store.loading}
                                    label='Search Destination'
                                    field='destination_city_id'
                                    value={values.destination_city_id}
                                    setValue={(value) => handleValues('destination_city_id', value)}
                                    errors={errors}
                                    onFocus={()=>clearErrors('destination_city_id')}
                                />
                                {errors.destination_city_id && <FormHelperText sx={{ color: 'error.main' }}>{errors.destination_city_id.message}</FormHelperText>}
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <FormControl fullWidth>
                                <TextField 
                                    size='small'
                                    type='number' 
                                    disabled={store.loading}
                                    label='DHD' 
                                    error={Boolean(errors['dhd'])}
                                    value={values.dhd}
                                    onChange={e => handleValues('dhd', e.target.value)}
                                    onFocus={()=>clearErrors('dhd')}
                                />
                                {errors.dhd && <FormHelperText sx={{ color: 'error.main' }}>{errors.dhd.message}</FormHelperText>}
                            </FormControl>
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <FormControl fullWidth>
                               
                                <Flatpickr
                        			  	// className="form-control d-block"
                        			  	// placeholder="Select time"
										onChange={(e)=> handleValues('available_date', e)}
										value={values.available_date}
                        			  	options={{
											mode: "range",
    										minDate: "today",
    										dateFormat: "m/d",
										}}
                                        render={
                                            ({defaultValue, value, ...props}, ref) => {
                                                return <TextField 
                                                    {...props}
                                                    size='small'
                                                    type='text' 
                                                    disabled={store.loading}
                                                    error={Boolean(errors['available_date'])}
                                                    label='Date' 
                                                    placeholder={'Date'}
                                                    inputRef={ref}
                                                    // value={values.length}
                                                    // onChange={e => console.log(e)}
                                                    onFocus={()=>clearErrors('available_date')}
                                                />
                                            }
                                        }
                        			/>
                                {errors.pickup_latest_date && <FormHelperText sx={{ color: 'error.main' }}>{errors.pickup_latest_date.message}</FormHelperText>}
                            </FormControl>
                        </Grid>
                       
                        <Grid item xs={12} md={6}>
                            <FormControl fullWidth>
                                <TextField 
                                    size='small'
                                    type='number' 
                                    disabled={store.loading}
                                    label='Age (hours)' 
                                    error={Boolean(errors['age'])}
                                    value={values.age}
                                    onChange={e => handleValues('age', e.target.value)}
                                    onFocus={()=>clearErrors('age')}
                                />
                                {errors.age && <FormHelperText sx={{ color: 'error.main' }}>{errors.age.message}</FormHelperText>}
                            </FormControl>
                        </Grid>
                        
          
                        

                       
                        <Grid item xs={12} md={6}>
                            <FormControl fullWidth  size="small">
                                <InputLabel id='label-load-type'>Load Type</InputLabel>
                                <Select 
                                    labelId="label-load-type"
                                    multiple
                                    value={values.categories} 
                                    onChange={(e)=>handleValues('categories', e.target.value)} 
                                    fullWidth 
                                    disabled={store.loading}
                                    label='Load Type' 
                                    error={Boolean(errors['categories'])}
                                    defaultValue='' 
                                    id='demo-simple-select-helper' 
                                    onFocus={()=>clearErrors('categories')}
                                 
                                >
                                    {
                                        fields.data.filter(x => x.context === 'load').map(x => 
                                            <MenuItem value={x.id}>{x.name} ({x.abbreviation})</MenuItem>
                                        )
                                    }
                                </Select>
                                {errors.categories && <FormHelperText sx={{ color: 'error.main' }}>{errors.categories.message}</FormHelperText>}
                            </FormControl>
                        </Grid>  

                        <Grid item xs={12} md={6}>
                            <FormControl fullWidth  size="small">
                                <InputLabel id='label-full-partial'>Full / Partial</InputLabel>
                                <Select 
                                    labelId="label-full-partial"
                                    value={values.full_partial} 
                                    onChange={(e)=>handleValues('full_partial', e.target.value)} 
                                    fullWidth 
                                    disabled={store.loading}
                                    label='Full / Partial' 
                                    error={Boolean(errors['full_partial'])}
                                    defaultValue='' 
                                    id='demo-simple-select-helper' 
                              
                                    onFocus={()=>clearErrors('full_partial')}
                                >
                                    <MenuItem value={'all'}>All</MenuItem>
                                    <MenuItem value={'full'}>Full</MenuItem>
                                    <MenuItem value={'partial'}>Partial</MenuItem>
                                </Select>
                                {errors.full_partial && <FormHelperText sx={{ color: 'error.main' }}>{errors.full_partial.message}</FormHelperText>}
                            </FormControl>
                        </Grid>    
                        <Grid item xs={12} md={6}>
                            <FormControl fullWidth>
                                <TextField 
                                    size='small'
                                    type='number' 
                                    disabled={store.loading}
                                    error={Boolean(errors['length'])}
                                    label='Length' 
                                    value={values.length}
                                    onChange={e => handleValues('length', e.target.value)}
                                    onFocus={()=>clearErrors('length')}
                                />
                                {errors.length && <FormHelperText sx={{ color: 'error.main' }}>{errors.length.message}</FormHelperText>}
                            </FormControl>
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <FormControl fullWidth>
                                <TextField 
                                    size='small'
                                    type='number' 
                                    disabled={store.loading}
                                    label='Weight' 
                                    error={Boolean(errors['weight'])}
                                    value={values.weight}
                                    onChange={e => handleValues('weight', e.target.value)}
                                    onFocus={()=>clearErrors('weight')}
                                />
                                {errors.weight && <FormHelperText sx={{ color: 'error.main' }}>{errors.weight.message}</FormHelperText>}
                            </FormControl>
                        </Grid>
                       
                        
                    </Grid>
        
                   
                    <br />
                    {/* <Divider sx={{pt:3, pb:4}}/> */}
                    <DialogActions sx={{p:0}}>
                        <Button disabled={store.loading} color='error' onClick={handleClose}>Cancel</Button>
                        <Button disabled={store.loading} color='secondary' onClick={()=>{
                            setValues(props.initialData)
                        }}>Reset</Button>
                        <Button disabled={store.loading || Object.keys(errors).length > 0} type='submit'>Save</Button>
                    </DialogActions>
                </form>
            </LocalizationProvider>  : <Box sx={{p:5, display:'flex', alignItems:'center', justifyContent:'center'}}><CircularProgress /></Box>
}
        </>
    )
}

export default LaneForm