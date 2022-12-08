import { Button, Typography } from '@mui/material'
import { isEmpty, isWeakSet } from 'lodash'
import { ThumbUp } from 'mdi-material-ui'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { likeService } from 'services/like.service'
import { useAuth } from 'src/hooks/useAuth'

const LikeButton = (props) => {

    const { size, data } = props

    const [ like, setLike ] = useState(null)
    const [ count, setCount ] = useState(0)

    const auth = useAuth()

    const submitLike = async () => {
     
        try {
            let response = await likeService.create({review_id: data.id})
            setLike({
                review_id: data.id,
                user_id: auth.user.id,
                id: response.id
            })
            setCount(count+1)
        } catch (er) {
            if(er && er.errors && er.errors[0]){
                toast.error(er.errors[0]['message'])
            }
            console.log(er)
        }
    }

    useEffect(() => {
        if(data.likes && data.likes.length === 1){
            setLike(data.likes[0])
        }
        if(data.likesCount && data.likesCount > 0){
            setCount(data.likesCount)
        }
    }, [data])
    

    const removeLike = async () => {

        try {
            await likeService.delete(like.id)
            setLike(null)
            setCount(count-1)
        } catch (er) {
            console.log(er)
        }
    }

    return (
        <Button onClick={()=>{
            isEmpty(like) ? submitLike() : removeLike()
        }} type='button' size={size} color={!isEmpty(like) ? 'primary' : 'secondary'} >
            <ThumbUp></ThumbUp>
            {
                count > 0 ? (
                    <>&nbsp;&nbsp;<Typography color={!isEmpty(like) ? 'Highlight' : 'GrayText'} >{count}</Typography></>
                ) : ''
            }
        </Button>
    )
}

export default LikeButton