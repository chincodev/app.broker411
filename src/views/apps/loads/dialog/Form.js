import { Box, Button, Card, CardActions, CircularProgress, DialogActions, Divider, FormControl, FormHelperText, Grid, InputLabel, MenuItem, Select, TextareaAutosize, TextField, Typography } from '@mui/material'
import React, { forwardRef, useEffect, useState } from 'react'
import DatePicker from '@mui/lab/DatePicker'
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { LocalizationProvider } from '@mui/lab'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import CustomInput from '../../../../views/forms/form-elements/pickers/react-datepicker/PickersCustomInput.js'
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

const citiesGetAll = cityService.list;

const LoadForm = (props) => {

    const { values, setValues, idToEdit } = props

    const { handleClose } = props
    const store = useSelector(state => state.load)
    const fields = useSelector(state => state.fields)
    const dispatch = useDispatch()

    

    const handleValues = (field, value) => {
        setValues({
            ...values,
            [field]: value
        })
    }
    
    const { register, handleSubmit, watch, clearErrors, getValues, setError, formState: { errors } } = useForm();

    

    const onSubmit = async (e) => {
      
        try {
            let data = Object.assign({}, values)

            if(data.origin_city_id && data.origin_city_id.id){
                data.origin_city_id = data.origin_city_id.id
            }
            if(data.destination_city_id && data.destination_city_id.id){
                data.destination_city_id = data.destination_city_id.id
            }

            if(data.pickup_hours_start){
                var duration = moment.duration(moment(data.pickup_hours_start).diff(moment().startOf('day')));
                data.pickup_hours_start = duration.asMinutes()
            }
            if(data.pickup_hours_end){
                var duration = moment.duration(moment(data.pickup_hours_end).diff(moment().startOf('day')));
                data.pickup_hours_end = duration.asMinutes()
            }
            if(data.delivery_hours_start){
                var duration = moment.duration(moment(data.delivery_hours_start).diff(moment().startOf('day')));
                data.delivery_hours_start = duration.asMinutes()
            }
            if(data.delivery_hours_end){
                var duration = moment.duration(moment(data.delivery_hours_end).diff(moment().startOf('day')));
                data.delivery_hours_end = duration.asMinutes()
            }

            if(data.pickup_hours_start === ''){
                data.pickup_hours_start = null
            }
            if(data.pickup_hours_end === ''){
                data.pickup_hours_end = null
            }
            if(data.delivery_hours_start === ''){
                data.delivery_hours_start = null
            }
            if(data.delivery_hours_end === ''){
                data.delivery_hours_end = null
            }

            if(data.rate === ''){
                data.rate = null
            }
            if(data.length === ''){
                data.rate = null
            }
            if(data.weight === ''){
                data.rate = null
            }

            let cleanedData = Object.fromEntries(Object.entries(data).filter(([_, v]) => (v != null || v != '')));

            dispatch(setLoading(true))

            if(idToEdit > 0){
                await loadService.update(idToEdit, cleanedData)
                dispatch(setLoading(false))
                toast.success('Load #'+idToEdit+' has been updated.')
            } else {
                await loadService.create(cleanedData)
                dispatch(setLoading(false))
                toast.success('A new load has been added.')
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
                 
                    <Typography variant='body2' sx={{mb:2}}>Locations Information</Typography>
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
                                <DatePicker
                                   
                                    label='Pickup Earliest Date'
                                    disabled={store.loading}
                                    value={values.pickup_earliest_date}
                                    onChange={newValue => handleValues('pickup_earliest_date', newValue)}
                                    renderInput={params => <TextField 
                                        {...params} 
                                        onFocus={()=>clearErrors('pickup_earliest_date')}
                                        size='small'
                                        error={Boolean(errors['pickup_earliest_date'])} 
                                    />}
                                />
                                {errors.pickup_earliest_date && <FormHelperText sx={{ color: 'error.main' }}>{errors.pickup_earliest_date.message}</FormHelperText>}
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <FormControl fullWidth>
                                <DatePicker
                                    
                                    label='Pickup Lastest Date'
                                    disabled={store.loading}
                                    value={values.pickup_latest_date}
                                    onChange={newValue => handleValues('pickup_latest_date', newValue)}
                                    renderInput={params => <TextField 
                                        {...params} 
                                        onFocus={()=>clearErrors('pickup_latest_date')}
                                        size='small'
                                        error={Boolean(errors['pickup_latest_date'])} 
                                    />}
                                />
                                {errors.pickup_latest_date && <FormHelperText sx={{ color: 'error.main' }}>{errors.pickup_latest_date.message}</FormHelperText>}
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <FormControl fullWidth>
                                <TimePicker
                                    label="Pickup Hours Start"
                                    disabled={store.loading}
                                    value={values.pickup_hours_start}
                                    onChange={hour => handleValues('pickup_hours_start', hour)}
                                    renderInput={(params) => <TextField onFocus={()=>clearErrors('pickup_hours_start')} size='small' {...params} error={Boolean(errors['pickup_hours_start'])}  />}
                                />
                                {errors.pickup_hours_start && <FormHelperText sx={{ color: 'error.main' }}>{errors.pickup_hours_start.message}</FormHelperText>}
                            </FormControl>
                            
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <FormControl fullWidth>
                                <TimePicker
                                    label="Pickup Hours End"
                                    disabled={store.loading}
                                    value={values.pickup_hours_end}
                                    onChange={hour => handleValues('pickup_hours_end', hour)}
                                    renderInput={(params) => <TextField onFocus={()=>clearErrors('pickup_hours_end')}  size='small' {...params} error={Boolean(errors['pickup_hours_end'])} />}
                                />
                                {errors.pickup_hours_end && <FormHelperText sx={{ color: 'error.main' }}>{errors.pickup_hours_end.message}</FormHelperText>}
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <FormControl fullWidth>
                                <TimePicker
                                    label="Delivery Hours Start"
                                    disabled={store.loading}
                                    value={values.delivery_hours_start}
                                    onChange={hour => handleValues('delivery_hours_start', hour)}
                                    renderInput={(params) => <TextField onFocus={()=>clearErrors('delivery_hours_start')} size='small' {...params} error={Boolean(errors['delivery_hours_start'])} />}
                                />
                                {errors.delivery_hours_start && <FormHelperText sx={{ color: 'error.main' }}>{errors.delivery_hours_start.message}</FormHelperText>}
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <FormControl fullWidth>
                                <TimePicker
                                    disabled={store.loading}
                                    label="Delivery Hours End"
                                    value={values.delivery_hours_end}
                                    onChange={hour => handleValues('delivery_hours_end', hour)}
                                    renderInput={(params) => <TextField onFocus={()=>clearErrors('delivery_hours_end')}  size='small' {...params} error={Boolean(errors['delivery_hours_end'])} />}
                                />
                                {errors.delivery_hours_end && <FormHelperText sx={{ color: 'error.main' }}>{errors.delivery_hours_end.message}</FormHelperText>}
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <FormControl fullWidth>
                                <TextField 
                                    size='small'
                                    value={values.rate} 
                                    onChange={(e)=>handleValues('rate', e.target.value)} 
                                    onFocus={()=>clearErrors('rate')}
                                    error={Boolean(errors['rate'])}
                                    disabled={store.loading}
                                    type='number' 
                                    label='Rate' 
                                 
                                   
                                   
                                />
                                {errors.rate && <FormHelperText sx={{ color: 'error.main' }}>{errors.rate.message}</FormHelperText>}
                            </FormControl>
                        </Grid>
                        
                    </Grid>
              
                    <Typography variant='body2' sx={{mt:6, mb:2}}>Load Information</Typography>
                    <Grid container spacing={5}>

                    
                       
                                            {console.log(values)}
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
                 
                    <Typography variant='body2' sx={{mt:3, mb:2}}>Aditional Information</Typography>
                    <Grid container spacing={5}>
                        <Grid item xs={12} md={12}>
                            <FormControl fullWidth>
                                <TextField
                                    size='small'
                                    multiline
                                    disabled={store.loading}
                                    rows={2}
                                    error={Boolean(errors['commodity'])}
                                    id='textarea-filled'
                                    placeholder='Commodity'
                                    label='Commodity'
                                    value={values.commodity} 
                                    onChange={(e)=>handleValues('commodity', e.target.value)} 
                                    onFocus={()=>clearErrors('commodity')}
                                />
                                {errors.commodity && <FormHelperText sx={{ color: 'error.main' }}>{errors.commodity.message}</FormHelperText>}
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={12}>
                            <FormControl fullWidth>
                                <TextField
                                    size='small'
                                    disabled={store.loading}
                                    multiline
                                    error={Boolean(errors['comments'])}
                                    rows={2}
                                    id='textarea-filled'
                                    placeholder='Comments'
                                    label='Comments'
                                    value={values.comments} 
                                    onChange={(e)=>handleValues('comments', e.target.value)} 
                                    onFocus={()=>clearErrors('comments')}
                                />
                                {errors.comments && <FormHelperText sx={{ color: 'error.main' }}>{errors.comments.message}</FormHelperText>}
                            </FormControl>
                        </Grid>
                        
                        <Grid item xs={12} md={6}>
                            <CleaveWrapper>
                                <FormControl  fullWidth>
                                    <Cleave
                                        size='small'
                                        disabled={store.loading}
                                        value={values.contact_phone} 
                                        onChange={(e)=>handleValues('contact_phone', e.target.value)} 
                                        id='phone-number' 
                                        placeholder='Contact Phone' 
                                        options={{ phone: true, phoneRegionCode: 'US' }} 
                                        error={true}
                                        onFocus={()=>clearErrors('contact_phone')}
                                    />
                                    {errors.contact_phone && <FormHelperText sx={{ color: 'error.main' }}>{errors.contact_phone.message}</FormHelperText>}
                                </FormControl>
                            </CleaveWrapper>
                        </Grid>
                        
                        <Grid item xs={12} md={6}>
                            <FormControl fullWidth>
                                <TextField 
                                    disabled={store.loading}
                                    size='small'
                                    type='email' 
                                    label='Contact Email' 
                                    error={Boolean(errors['contact_email'])}
                                    value={values.contact_email} 
                                    onChange={(e)=>handleValues('contact_email', e.target.value)} 
                                    onFocus={()=>clearErrors('contact_email')}
                                />
                                {errors.contact_email && <FormHelperText sx={{ color: 'error.main' }}>{errors.contact_email.message}</FormHelperText>}
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

export default LoadForm