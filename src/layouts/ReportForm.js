import { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import CircularProgress from '@mui/material/CircularProgress'
import React from 'mdi-material-ui/React'
import Grid from '@mui/material/Grid'
import toast from 'react-hot-toast'
import { Button, CardContent, Checkbox, Divider, FormControl, FormControlLabel, FormGroup, FormHelperText, InputAdornment, Rating, TextField, ToggleButton, ToggleButtonGroup } from '@mui/material'
import { AccountOutline, DeleteOutline, Email, EmailOutline, FaceAgent, LocationEnter, Map, Marker, MessageOutline, OfficeBuildingOutline, Phone, Pin, ThumbDown, ThumbUp } from 'mdi-material-ui'
import * as yup from "yup";
import { green } from '@mui/material/colors'
import useBgColor from 'src/@core/hooks/useBgColor'
import { fetchData } from 'src/store/apps/field'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { reviewService } from 'services/review.service'
import { reportService } from 'services/report.service'

const ReportForm = (props) => {

    const { business, allowResetBusiness, setBusiness, review_id } = props

    const store = useSelector(state => state.fields)
    const dispatch = useDispatch()

    const [ actionsLoading, setActionsLoading ] = useState(false)
    const [ submitting, setSubmitting ] = useState(false)
    const [ body, setBody ] = useState('')
    const [ categories, setCategories ] = useState([])
    
    useEffect(() => {
        if(store.data.length === 0){
            dispatch(fetchData('?page_size=50'))
        }
    }, [])
  
    const reset = () => {
        setBody('')
        setCategories([])
    }

    const submitData = async (e) => {
        try {
            e.preventDefault()
            setSubmitting(true)
            await reportService.create({
                body,
                review_id,
                categories
            })
            setSubmitting(false)
            toast.success('Report Sent')
            props.handleClose(true)
        } catch (er) {
            console.log(er);
            toast.error(er.errors[0].message)
            setSubmitting(false)
        }
    }

    if(store.loading){
        return <Box style={{textAlign:'center', width:'100%'}}>
            <CircularProgress disableShrink sx={{ mt: 6, mb: 6 }} />
        </Box>
    }

    return (
        <Box>
            <form onSubmit={(e)=>submitData(e)}>
                <Grid container>
                    <Grid item xs={12} style={{marginBottom:'0.5rem'}}>
                        <FormGroup>
                            <Typography sx={{fontWeight:'700', marginBottom:'1rem'}}>
                                Why are you reporting this review?
                            </Typography>
                            <Grid container>
                            {
                                store.data.filter(x => x.context === 'report').map(x => <Grid xs={12} md={6} item>
                                    <FormControlLabel
                                        label={
                                            <Typography 
                                                sx={{
                                                    fontSize: {
                                                        lg: 16,
                                                        md: 16,
                                                        sm: 12,
                                                        xs: 12
                                                    }
                                                }}
                                            >
                                                {x.description}
                                            </Typography>
                                        }
                                        control={
                                            <Checkbox
                                                checked={categories.find(y => y === x.id) ? true : false}
                                                onChange={(e)=>e.target.checked ? categories.find(y => y === x.id) ? '' : setCategories(categories.concat(x.id)) : setCategories(categories.filter(y => y != x.id))}
                                                name={x.name} 
                                            />
                                        }
                                    />
                                </Grid>)
                            }
                            </Grid>
                        </FormGroup>
                    </Grid>
                    <Grid item xs={12}>
                        <br />
                        <Grid item xs={12} style={{marginBottom:'0.5rem'}}>
                            <FormControl fullWidth>
                                <TextField
                                    value={body}
                                    label='Notes'
                                    onChange={(e)=>setBody(e.target.value)}
                                    placeholder='Notes'
                                    fullWidth
                                    multiline
                                    sx={{ '& .MuiOutlinedInput-root': { alignItems: 'baseline' } }}
                                    minRows={2}
                                    maxRows={2}
                                    minLe
                                    aria-describedby='registration_date'
                                    inputProps={{
                                        maxLength: 250,
                                    }}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position='start'>
                                                <MessageOutline />
                                            </InputAdornment>
                                        )
                                    }}
                                />
                            </FormControl>
                            <small>
                                {body.length} of 250 Characters Used
                            </small>
                        </Grid>
                    </Grid> 
                    <Box sx={{pt:0,display:'flex', flexDirection:{xs:'column-reverse', md:'row'}, width:'100%', justifyContent:'flex-end', paddingTop:'1em'}}>

                        <Button sx={{mt:{xs:1, md:0}, mr:{xs:0, md:1}}} type='button' disabled={submitting} color='secondary'  onClick={()=>{
                            props.handleClose(true)
                        }} variant='contained'>
                            Cancel
                        </Button>
                        <Button sx={{mt:{xs:1, md:0}, mr:{xs:0, md:1}}} type='button' disabled={submitting} color='secondary'  onClick={()=>{
                            reset()
                        }} variant='contained'>
                            Reset
                        </Button>
                        <Button type='submit' disabled={submitting} variant='contained'  >
                            {
                                submitting && <CircularProgress
                                    size={24}
                                    sx={{
                                        color: green[500],
                                        position: 'absolute',
                                        top: '50%',
                                        left: '50%',
                                        marginTop: '-12px',
                                        marginLeft: '-12px',
                                    }}
                                />
                            }
                            Submit
                        </Button>
                    </Box> 
                </Grid>
            </form>
        </Box>
    )
}

export default ReportForm
