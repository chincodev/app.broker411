import { useState, forwardRef, useEffect } from 'react'
import Dialog from '@mui/material/Dialog'
import Fade from '@mui/material/Fade'
import { useRouter } from 'next/router'
import ReviewDetails from './Details'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'

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
          open={!!router.query.reviewId && router.pathname.substr(0, '/review/'.length) != '/review/'}
          maxWidth='md'

          TransitionComponent={Transition}
          onBackdropClick={() => {
          
            router.push(router.route, undefined, {scroll:false})
          }}
        >
          
            <ReviewDetails 
                {...props}
            />
        </Dialog>
    )
}

export default ReviewDialogWrapper