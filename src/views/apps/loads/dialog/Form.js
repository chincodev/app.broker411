import { Box, Button, Card, CardActions, DialogActions, Divider, FormControl, FormHelperText, Grid, InputLabel, MenuItem, Select, TextareaAutosize, TextField, Typography } from '@mui/material'
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


const citiesGetAll = cityService.list;

const LoadForm = (props) => {

    const { handleClose } = props
    const store = useSelector(state => state.load)
    const fields = useSelector(state => state.fields)
    const dispatch = useDispatch()
    const [ pickup_earliest_date, setPickup_earliest_date ] = useState(null)
    const [ pickup_latest_date, setPickup_latest_date ] = useState(null)
    const [ pickup_hours_start, setPickup_hours_start ] = useState(null)
    const [ pickup_hours_end, setPickup_hours_end ] = useState(null)
    const [ delivery_hours_start, setDelivery_hours_start ] = useState(null)
    const [ delivery_hours_end, setDelivery_hours_end ] = useState(null)
    const [ origin_city_id, setOrigin_city_id ] = useState(null)
    const [ destination_city_id, setDestination_city_id ] = useState(null)
    const [ full_partial, setFull_partial ] = useState(null)
    const [ weight, setWeight ] = useState(null)
    const [ length, setLength ] = useState(null)
    const [ comments, setComments ] = useState(null)
    const [ commodity, setCommodity ] = useState(null)
    const [ contact_phone, setContact_phone ] = useState(null)
    const [ contact_email, setContact_email ] = useState(null)
    const [ rate, setRate ] = useState(null)
    const [ categories, setCategories ] = useState([])

    const { register, handleSubmit, watch, clearErrors, getValues, setError, formState: { errors } } = useForm();

    const onSubmit = async (e) => {
      
        try {
            let data = {
                pickup_earliest_date,
                pickup_latest_date,
                pickup_hours_start,
                pickup_hours_end,
                delivery_hours_start,
                delivery_hours_end,
                origin_city_id,
                destination_city_id,
                full_partial,
                weight,
                length,
                comments,
                commodity,
                contact_phone,
                contact_email,
                rate,
                categories
            }

            if(data.origin_city_id && data.origin_city_id.id){
                data.origin_city_id = data.origin_city_id.id
            }
            if(data.destination_city_id && data.destination_city_id.id){
                data.destination_city_id = data.destination_city_id.id
            }

            let cleanedData = Object.fromEntries(Object.entries(data).filter(([_, v]) => v != null));
            dispatch(setLoading(true))
            await loadService.create(cleanedData)
            dispatch(setLoading(false))
            toast.success('A new load have been added')
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
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <form onSubmit={handleSubmit(onSubmit)}>
                 
                    <Typography variant='body2' sx={{mb:2}}>Locations Information</Typography>
                    <Grid container spacing={5}>
                        <Grid item xs={12} md={6}>
                        
                            <FormControl fullWidth>
                                <AutocompleteAsynchronousRequest
                                    endpoint={citiesGetAll}
                                    label='Search Origin'
                                    disabled={store.loading}
                                    field='origin_city_id'
                                    value={origin_city_id}
                                    setValue={setOrigin_city_id}
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
                                    field='destination'
                                    value={destination_city_id}
                                    setValue={setDestination_city_id}
                                    errors={errors}
                                />
                                {errors.destination_city_id && <FormHelperText sx={{ color: 'error.main' }}>{errors.destination_city_id.message}</FormHelperText>}
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <FormControl fullWidth>
                                <DatePicker
                                    
                                    label='Pickup Earliest Date'
                                    disabled={store.loading}
                                    value={pickup_earliest_date}
                                    onChange={newValue => setPickup_earliest_date(newValue)}
                                    renderInput={params => <TextField 
                                        {...params} 
                                        error={Boolean(errors['pickup_earliest_date'])} 
                                    />}
                                />
                                {errors.pickup_earliest_date && <FormHelperText sx={{ color: 'error.main' }}>{errors.pickup_earliest_date.message}</FormHelperText>}
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <FormControl fullWidth>
                                <DatePicker
                                    
                                    label='Pickup Earliest Date'
                                    disabled={store.loading}
                                    value={pickup_latest_date}
                                    onChange={newValue => setPickup_latest_date(newValue)}
                                    renderInput={params => <TextField 
                                        {...params} 
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
                                    value={pickup_hours_start}
                                    onChange={hour => setPickup_hours_start(hour)}
                                    renderInput={(params) => <TextField {...params} error={Boolean(errors['pickup_hours_start'])}  />}
                                />
                                {errors.pickup_hours_start && <FormHelperText sx={{ color: 'error.main' }}>{errors.pickup_hours_start.message}</FormHelperText>}
                            </FormControl>
                            
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <FormControl fullWidth>
                                <TimePicker
                                    label="Pickup Hours End"
                                    disabled={store.loading}
                                    value={pickup_hours_end}
                                    onChange={hour => setPickup_hours_end(hour)}
                                    renderInput={(params) => <TextField {...params} error={Boolean(errors['pickup_hours_end'])} />}
                                />
                                {errors.pickup_hours_end && <FormHelperText sx={{ color: 'error.main' }}>{errors.pickup_hours_end.message}</FormHelperText>}
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <FormControl fullWidth>
                                <TimePicker
                                    label="Delivery Hours Start"
                                    disabled={store.loading}
                                    value={delivery_hours_start}
                                    onChange={hour => setDelivery_hours_start(hour)}
                                    renderInput={(params) => <TextField {...params} error={Boolean(errors['delivery_hours_start'])} />}
                                />
                                {errors.delivery_hours_start && <FormHelperText sx={{ color: 'error.main' }}>{errors.delivery_hours_start.message}</FormHelperText>}
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <FormControl fullWidth>
                                <TimePicker
                                    disabled={store.loading}
                                    label="Delivery Hours End"
                                    value={delivery_hours_end}
                                    onChange={hour => setDelivery_hours_end(hour)}
                                    renderInput={(params) => <TextField {...params} error={Boolean(errors['delivery_hours_end'])} />}
                                />
                                {errors.delivery_hours_end && <FormHelperText sx={{ color: 'error.main' }}>{errors.delivery_hours_end.message}</FormHelperText>}
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <FormControl fullWidth>
                                <TextField 
                                    value={rate} 
                                    onChange={(e)=>setRate(e.target.value)} 
                                        
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

                    
                       

                        <Grid item xs={12} md={6}>
                            <FormControl fullWidth>
                                <InputLabel id='demo-simple-select-helper-label'>Load Type</InputLabel>
                                <Select 
                                    multiple
                                    value={categories} 
                                    onChange={(e)=>setCategories(e.target.value)} 
                                    fullWidth 
                                    disabled={store.loading}
                                    label='Type' 
                                    error={Boolean(errors['categories'])}
                                    defaultValue='' 
                                    id='demo-simple-select-helper' 
                                    labelId='demo-simple-select-helper-label'
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
                            <FormControl fullWidth>
                                <InputLabel id='demo-simple-select-helper-label2'>Full / Partial</InputLabel>
                                <Select 
                                    value={full_partial} 
                                    onChange={(e)=>setFull_partial(e.target.value)} 
                                    fullWidth 
                                    disabled={store.loading}
                                    label='Type' 
                                    error={Boolean(errors['full_partial'])}
                                    defaultValue='' 
                                    id='demo-simple-select-helper' 
                                    labelId='demo-simple-select-helper-label'
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
                         
                                    type='number' 
                                    disabled={store.loading}
                                    error={Boolean(errors['length'])}
                                    label='Length' 
                                    value={length}
                                    onChange={e => setLength(e.target.value)}
                                />
                                {errors.length && <FormHelperText sx={{ color: 'error.main' }}>{errors.length.message}</FormHelperText>}
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <FormControl fullWidth>
                                <TextField 
               
                                    type='number' 
                                    disabled={store.loading}
                                    label='Weight' 
                                    error={Boolean(errors['weight'])}
                                    value={weight}
                                    onChange={e => setWeight(e.target.value)}
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
                                    multiline
                                    disabled={store.loading}
                                    rows={2}
                                    error={Boolean(errors['commodity'])}
                                    id='textarea-filled'
                                    placeholder='Commodity'
                                    label='Commodity'
                                    value={commodity} 
                                    onChange={(e)=>setCommodity(e.target.value)} 
                                />
                                {errors.commodity && <FormHelperText sx={{ color: 'error.main' }}>{errors.commodity.message}</FormHelperText>}
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={12}>
                            <FormControl fullWidth>
                                <TextField
                                    disabled={store.loading}
                                    multiline
                                    error={Boolean(errors['comments'])}
                                    rows={3}
                                    id='textarea-filled'
                                    placeholder='Comments'
                                    label='Comments'
                                    value={comments} 
                                    onChange={(e)=>setComments(e.target.value)} 
                                />
                                {errors.comments && <FormHelperText sx={{ color: 'error.main' }}>{errors.comments.message}</FormHelperText>}
                            </FormControl>
                        </Grid>
                        
                        <Grid item xs={12} md={6}>
                            <CleaveWrapper>
                                <FormControl  fullWidth>
                                    <Cleave
                                        disabled={store.loading}
                                        value={contact_phone} 
                                        onChange={(e)=>setContact_phone(e.target.value)} 
                                        id='phone-number' 
                                        placeholder='Contact Phone' 
                                        options={{ phone: true, phoneRegionCode: 'US' }} 
                                        error={true}
                                    />
                                    {errors.contact_phone && <FormHelperText sx={{ color: 'error.main' }}>{errors.contact_phone.message}</FormHelperText>}
                                </FormControl>
                            </CleaveWrapper>
                        </Grid>
                        
                        <Grid item xs={12} md={6}>
                            <FormControl fullWidth>
                                <TextField 
                                    disabled={store.loading}
                                    type='email' 
                                    label='Contact Email' 
                                    error={Boolean(errors['contact_email'])}
                                    value={contact_email} 
                                    onChange={(e)=>setContact_email(e.target.value)} 
                                    onBlur={()=>clearErrors('contact_email')}
                                />
                                {errors.contact_email && <FormHelperText sx={{ color: 'error.main' }}>{errors.contact_email.message}</FormHelperText>}
                            </FormControl>
                        </Grid>
                    </Grid>
                    <Divider sx={{pt:3, pb:4}}/>
                    <DialogActions className='dialog-actions-dense'>
                        <Button disabled={store.loading} color='error' onClick={handleClose}>Cancel</Button>
                        <Button disabled={store.loading} color='secondary' onClick={handleClose}>Reset</Button>
                        <Button disabled={store.loading} type='submit'>Save</Button>
                    </DialogActions>
                </form>
            </LocalizationProvider> 
        </>
    )
}

export default LoadForm