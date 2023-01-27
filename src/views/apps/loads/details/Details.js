import React from 'react'

const LoadDetails = (props) => {

    const { id } = props

    return (
        <h1>
            {console.log(props)}
            New page {id}
        </h1>
    )
}

export default LoadDetails