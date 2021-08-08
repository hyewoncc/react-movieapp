import React, { useState } from 'react'
import { Comment } from 'antd'
import { IMAGE_BASE_URL } from '../../Config';

function CommentCard(props) {

    const [ReadMore, setReadMore] = useState(true)

    const openReadMore = () => {
        setReadMore(!ReadMore)
    }

    return (
        <Comment
            author = {props.author}
            avatar = {props.avatar_path.startsWith('/https://secure') ? 
                `${props.avatar_path.substring(1)}` : `${IMAGE_BASE_URL}w500${props.avatar_path}`} 
            content = {props.content.length > 300 && ReadMore ? 
                (props.content.substring(0, 300) + '...') : props.content}
            datetime = {props.updated_at}
            actions = {props.content.length > 300 ? 
                [<span onClick = {openReadMore}>{ReadMore ? 'Read More' : 'Close'}</span>] : null}
        />
    )
}
export default CommentCard
