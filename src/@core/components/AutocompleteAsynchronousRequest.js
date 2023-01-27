// ** React Imports
import { Fragment, useEffect, useState } from 'react'

// ** MUI Imports
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import CircularProgress from '@mui/material/CircularProgress'
import { useDebounce } from 'use-debounce';

// ** Third Party Imports
import axios from 'axios'

const sleep = (delay = 0) => {
  return new Promise(resolve => {
    setTimeout(resolve, delay)
  })
}

const AutocompleteAsynchronousRequest = (props) => {

  const { 
    label, 
    disabled,
    endpoint,
    value,
    setValue,
    errors,
    field
  } = props

  // ** States
  const [open, setOpen] = useState(false)
  const [options, setOptions] = useState([])
  const [search, setSearch] = useState(false)
  const [ debounced_search ] = useDebounce(search, 1000);
  const [ loading, setLoading ] = useState(false);
  

  const fetchData = async () => {

    try {
      setLoading(true)
      const response = await endpoint('?search='+debounced_search)
      const data = await response.data.map(x => {
        return {
          ...x,
          name: x.name+', '+x.state.abbreviation
        }
      })
      setOptions(Object.keys(data).map(key => data[key]))
      setLoading(false)
    } catch (er) {
      console.log(er);
    }
    
  }

  useEffect(() => {
    debounced_search.length > 0 && fetchData(debounced_search)
  }, [debounced_search])

  // useEffect(() => {
  //   let active = true
  //   if (!loading) {
  //     return undefined
  //   }

    
  //   fetchData()

  //   return () => {
  //     active = false
  //   }
  // }, [loading])

  // useEffect(() => {
  //   if (!open) {
  //     setOptions([])
  //   }
  // }, [open])

  return (<>


    <Autocomplete
      open={open}
      options={options}
      disabled={disabled}
      value={value}
      loading={loading}
      onChange={(event, value) => setValue(value)}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      id='autocomplete-asynchronous-request'
      getOptionLabel={option => option.text}
      renderOption={(props, option) => (
        <li {...props}>{option.name}</li>
      )}
      // isOptionEqualToValue={(option, value) => option.title === value.title}
      renderInput={params => (
        <TextField
          {...params}
          error={Boolean(errors[field])}
          onChange={(e) => setSearch(e.target.value)}
          label={label}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <Fragment>
                {loading ? <CircularProgress color='inherit' size={20} /> : null}
                {params.InputProps.endAdornment}
              </Fragment>
            )
          }}
        />
      )}
    />  </>
  )
}

export default AutocompleteAsynchronousRequest