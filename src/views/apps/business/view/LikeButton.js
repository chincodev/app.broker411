import { Button } from '@mui/material'
import { isEmpty } from 'lodash'
import { ThumbUp } from 'mdi-material-ui'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { likeService } from 'services/like.service'
import { useAuth } from 'src/hooks/useAuth'

const LikeButton = (props) => {

    const { size, data } = props

    const [ like, setLike ] = useState(null)

    const auth = useAuth()

    const submitLike = async () => {
     
        try {
            let response = await likeService.create({review_id: data.id})
            setLike({
                review_id: data.id,
                user_id: auth.user.id,
                id: response.id
            })
        } catch (er) {
            if(er && er.errors && er.errors[0]){
                toast.error(er.errors[0]['message'])
            }
            console.log(er)
        }
    }

    const removeLike = async () => {

        try {
            await likeService.delete(like.id)
            setLike(null)
        } catch (er) {
            console.log(er)
        }
    }

    return (
        <Button onClick={()=>{
            isEmpty(like) ? submitLike() : removeLike()
        }} type='button' size={size} color={!isEmpty(like) ? 'primary' : 'secondary'} >
            <ThumbUp></ThumbUp>
        </Button>
    )
}

export default LikeButton