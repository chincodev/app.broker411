import { useState, forwardRef, useEffect } from 'react'
import React from 'react'
import Box from '@mui/material/Box'
import Dialog from '@mui/material/Dialog'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Fade from '@mui/material/Fade'
import DialogContent from '@mui/material/DialogContent'
import Close from 'mdi-material-ui/Close'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import LoadForm from './Form'
import { DialogTitle } from '@mui/material'
import { isEmpty } from 'lodash'
import moment from 'moment'
import { setLoading } from 'src/store/apps/load'

const Transition = forwardRef(function Transition(props, ref) {
    return <Fade ref={ref} {...props} />
})

const LoadFormDialog = (props) => {

    const { scopedLoadToEdit } = props

    const report = useSelector(state => state.report)

    const dispatch = useDispatch()

    const [ business, setBusiness ] = useState(null) 

    const initialData = {
        pickup_earliest_date: null,
        pickup_latest_date: null,
        pickup_hours_start: null,
        pickup_hours_end: null,
        delivery_hours_start: null,
        delivery_hours_end: null,
        origin_city_id: null,
        destination_city_id: null,
        full_partial: null,
        weight: '',
        length: '',
        comments: '',
        commodity: '',
        contact_phone: '',
        contact_email: '',
        rate: '',
        categories: [],
    }

    const [ values, setValues ] = useState(initialData)

    useEffect(() => {
        
        if(props.scopedLoadToEdit){
            
            setValues({
                pickup_earliest_date: scopedLoadToEdit.pickup_earliest_date,
                pickup_latest_date: scopedLoadToEdit.pickup_latest_date,
                pickup_hours_start: typeof(scopedLoadToEdit.pickup_hours_start) === 'number' ? moment().startOf('day').add(scopedLoadToEdit.pickup_hours_start, 'minutes') : null,
                pickup_hours_end: typeof(scopedLoadToEdit.pickup_hours_end) === 'number' ? moment().startOf('day').add(scopedLoadToEdit.pickup_hours_end, 'minutes') : null,
                delivery_hours_start: typeof(scopedLoadToEdit.delivery_hours_start) === 'number' ? moment().startOf('day').add(scopedLoadToEdit.delivery_hours_start, 'minutes') : null,
                delivery_hours_end: typeof(scopedLoadToEdit.delivery_hours_end) === 'number' ? moment().startOf('day').add(scopedLoadToEdit.delivery_hours_end, 'minutes') : null,
                origin_city_id: scopedLoadToEdit.origin,
                destination_city_id: scopedLoadToEdit.destination,
                full_partial: scopedLoadToEdit.full_partial,
                weight: scopedLoadToEdit.weight,
                length: scopedLoadToEdit.length,
                comments: scopedLoadToEdit.comments,
                commodity: scopedLoadToEdit.commodity,
                contact_phone: scopedLoadToEdit.contact_phone,
                contact_email: scopedLoadToEdit.contact_email,
                rate: scopedLoadToEdit.rate,
                categories: props.scopedLoadToEdit.categories.map(x => x.id),
            })
            dispatch(setLoading(false))
        } else {
            setValues(initialData)
            dispatch(setLoading(false))
        }
        
    }, [props.scopedLoadToEdit])

    const closeDialog = () => {
        props.setOpen(false)
        props.setScopedLoadToEdit(null)
    }

    return (
        <Dialog
            fullWidth
            open={props.open}
            scroll='body'
            maxWidth='md'
            onClose={()=>{
                
            }}
            onBackdropClick={()=>{
                closeDialog()
            }}
            TransitionComponent={Transition}
        >
           
            <DialogTitle id='form-dialog-title'>{!isEmpty(scopedLoadToEdit) ? 'Edit' : 'Add'} Load</DialogTitle>
            <DialogContent>
                {/* <IconButton size='small' onClick={()=>{
                   props.setIsDialogOpen(false)
                }} sx={{ position: 'absolute', right: '1rem', top: '1rem' }}>
                    <Close />
                </IconButton> */}
                <LoadForm 
                    values={values}
                    setValues={setValues}
                    reload={props.reload}
                    idToEdit={ scopedLoadToEdit && scopedLoadToEdit.id ? scopedLoadToEdit.id : null}
                    handleClose={
                        ()=>{
                            closeDialog()
                        }
                    }
                />
            </DialogContent> 
        </Dialog>
    )
}

export default LoadFormDialog