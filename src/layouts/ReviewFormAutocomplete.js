import { useState, forwardRef, useEffect, useRef } from 'react'
import React from 'react'
import Box from '@mui/material/Box'
import { closeReviewDialog } from 'src/store/apps/business'
import { useDispatch } from 'react-redux'
import ReviewForm from './ReviewForm'
import { isEmpty } from 'lodash'
import { Autocomplete, CircularProgress, TextField } from '@mui/material'
import { businessService } from 'services/business.service'
import { useDebounce } from 'use-debounce';


const ReviewFormAutocomplete = (props) => {

    const { business, btnText, setBusiness, allowResetBusiness } = props
    const [ loading, setLoading ] = useState(false)
    const [ scopedBusiness, setScopedBusiness ] = useState(null)
    const dispatch = useDispatch()
    const [open, setOpen] = React.useState(false);
    const [options, setOptions] = React.useState([]);
    const [search, setSearch] = React.useState('')
    const [ debounced_search ] = useDebounce(search, 1000);
    const isFirstRun = useRef(true);

    useEffect(() => {
        if(!business || isEmpty(business)){
            setScopedBusiness(null)
        } else {
            setScopedBusiness(business)
        }
    }, [business])

    useEffect(() => {

        if (isFirstRun.current) {
            isFirstRun.current = false;
            return;
        }
        setLoading(true)
        searchBusiness(debounced_search)
    }, [debounced_search])

    React.useEffect(() => {
        if (open && options.length === 0) {
            searchBusiness();
        }
    }, [open]);

    const searchBusiness = async (search) => {
        let response = await businessService.get(search && `?search=${search}`)
        setOptions([...response.data]);
        setLoading(false)
    }

    return (
        <Box sx={{ width:'100%', display: 'flex', flexWrap: { xs: 'wrap', md: 'nowrap' } }}>
            <Box sx={{width:'100%'}}>
                <Autocomplete
                    id="asynchronous-demo"
                    sx={{ width: 300, width: '100%' }}
                    getOptionLabel={(option) => option.legal_name}
                    filterOptions={(x) => x}
                    // noOptionsText={'No Results'}
                    onChange={(event, value) => setBusiness(value)}
                    open={open}
                    fullWidth
                    on
                    onOpen={() => {
                        setOpen(true);
                    }}
                    onClose={() => {
                        setOpen(false);
                    }}
                    // isOptionEqualToValue={(option, value) => option.title === value.title}
                    options={options}
                    loading={loading}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Search a broker"
                            value={search}
                            onChange={(e)=>setSearch(e.target.value)}
                            InputProps={{
                                ...params.InputProps,
                                endAdornment: (
                                    <React.Fragment>
                                        {loading ? <CircularProgress color="inherit" size={20} /> : null}
                                        {params.InputProps.endAdornment}
                                    </React.Fragment>
                                ),
                            }}
                        />
                    )}
                />
            </Box>
        </Box>
    )
}

export default ReviewFormAutocomplete
