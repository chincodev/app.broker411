import { useState, Fragment } from 'react'
import { useRouter } from 'next/router'
import { styled } from '@mui/material/styles'
import { Box, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, FormHelperText, Grid, TextField, Typography } from '@mui/material'
import * as yup from 'yup';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { userService } from 'services/user.service';
import { green } from '@mui/material/colors';
import toast from 'react-hot-toast';

const ChangeEmailDialog = ({setOpenDialog, openDialog}) => {

    let schema = yup.object().shape({
        email: yup.string().email().required(),
    });

    const defaultValues = {
        email: '',
    }

    const router = useRouter()
    const [ actionsLoading, setActionsLoading ] = useState(false)

    const submitData = async (values) => {
        try {
            setActionsLoading(true)
            await userService.update_me(values)
            setActionsLoading(false)
            toast.success('Pasword updated.')
            reset()
            setOpenDialog(false)
        } catch (er) {
            er.errors && Array.isArray(er.errors) && er.errors.map(x => {
                if(x.path){
                    x.path.map(y => setError(y, {
                        message: x.message
                    }))
                } else {
                    toast.error(x.message)
                }
            })
            setActionsLoading(false)
        }
    }

    const { register, control, handleSubmit, formState: { errors }, reset, setError } = useForm({
        resolver: yupResolver(schema), defaultValues
    });

    return (
        <Box>
            <Dialog maxWidth={'sm'} fullWidth={true} open={openDialog} onClose={() => setOpenDialog(false)} style={{height:''}} aria-labelledby='form-dialog-title'>
                <form onSubmit={handleSubmit(submitData)}>
                    <DialogTitle id='form-dialog-title'>Change Email</DialogTitle>
                    
                    <DialogContent>
                    <Typography style={{fontSize:'12px'}}>When you change the email, you will be logged out</Typography>
                        <Grid container style={{paddingTop:'1rem', paddingBottom:'1rem'}}>
                            
                            <Grid item xs={12}>
                            
                                <FormControl fullWidth>
                                    <Controller
                                        name='email'
                                        control={control}
                                        rules={{ required: true }}
                                        render={({ field: { value, onChange } }) => (
                                            <TextField 
                                                value={value}
                                                error={Boolean(errors.email)}
                                                onChange={onChange} 
                                                id='email' 
                                                autoFocus 
                                                fullWidth 
                                                type='email' 
                                                label='New email address' 
                                            />
                                        )}
                                    />
                                    {errors.email && (
                                        <FormHelperText sx={{ color: 'error.main' }} id='email'>
                                            {errors.email.message}
                                        </FormHelperText>
                                    )}
                                </FormControl>
                            </Grid>
                        </Grid>
                    </DialogContent>
                    <DialogActions className='dialog-actions-dense'>
                        <Button type='button' disabled={actionsLoading} onClick={() => setOpenDialog(false)}>Cancel</Button>
                        <Button type='submit' disabled={actionsLoading}>
                            {
                              actionsLoading && <CircularProgress
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
                    </DialogActions>
                    </form>
            </Dialog>
        </Box>
    )
}

export default ChangeEmailDialog
