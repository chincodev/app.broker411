
import { useEffect, useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import LinearProgress from '@mui/material/LinearProgress'
import { SmokeDetectorVariantOff } from 'mdi-material-ui'
import { Button } from '@mui/material'

const ProgressLinearControlledUncontrolled = ({completedLoading}) => {
  // ** State
  const [progress, setProgress] = useState(0)
  const [ completed, setCompleted ] = useState(false)

  const [ diff, setDiff ] = useState(1)  
  useEffect(() => {
    const timer = setInterval(() => {
        setProgress(oldProgress => {
            return Math.min(oldProgress + diff, 240)
        })
    }, 120)

    return () => {
      clearInterval(timer)
    }
  }, [])

  return (
    <>
     
      <div>
      <br />
        <LinearProgress variant='determinate' value={completedLoading ? 100 : (progress < 85 ? progress : progress > 210 ? 98 : 85 + ((progress - 85) * 0.1))} />
        <br />
        
        {
            progress > 50 && <Typography sx={{ fontWeight: 500, mb: 1.5 }}>FMSCA search is taking a while.. we're doing our best</Typography>
        }
      </div>
    </>
  )
}

export default ProgressLinearControlledUncontrolled