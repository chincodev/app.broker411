import { useState, forwardRef, useEffect } from 'react'
import Dialog from '@mui/material/Dialog'
import Fade from '@mui/material/Fade'
import { useRouter } from 'next/router'
import ReviewDetails from './Details'

const Transition = forwardRef(function Transition(props, ref) {
  return <Fade ref={ref} {...props} />
})


const DialogReviewDetails = (props) => {

    const router = useRouter()

    return (
        <Dialog

          fullWidth
          open={!!router.query.reviewId}
          maxWidth='md'
          scroll='body'
          TransitionComponent={Transition}
          onBackdropClick={() => router.back()}
        >
            <ReviewDetails 
                {...props}
            />
        </Dialog>
    )
}

export default DialogReviewDetails