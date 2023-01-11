import { useState, forwardRef, useEffect } from 'react'
import Dialog from '@mui/material/Dialog'
import Fade from '@mui/material/Fade'
import { useRouter } from 'next/router'
import ReviewDetails from './Details'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { closeDetailsReviewDialog } from 'src/store/apps/review'

const Transition = forwardRef(function Transition(props, ref) {
  return <Fade ref={ref} {...props} />
})


const ReviewDialogWrapper = (props) => {

    const router = useRouter()

    const state = useSelector(e => e)
    const dispatch = useDispatch()

    return (
        <Dialog

          fullWidth
          open={true}
          maxWidth='md'
         
          scroll='paper'
          TransitionComponent={Transition}
          onBackdropClick={() => {
        
            dispatch(closeDetailsReviewDialog())
            router.back()
          }}
        >
          {console.log(state.review)}
            {/* <ReviewDetails 
                {...props}
            /> */}
        </Dialog>
    )
}

export default ReviewDialogWrapper