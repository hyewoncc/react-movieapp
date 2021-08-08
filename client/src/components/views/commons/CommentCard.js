import React, { useState } from 'react'
import { Comment, Avatar, Tooltip } from 'antd'
import { IMAGE_BASE_URL } from '../../Config'
import moment from 'moment'

function CommentCard(props) {

    const [ReadMore, setReadMore] = useState(true)

    const openReadMore = () => {
        setReadMore(!ReadMore)
    }

    return (
        <Comment
            author = { props.author }
            avatar = { props.avatar_path ? 
                        props.avatar_path.startsWith('/https://secure') ? 
                        `${props.avatar_path.substring(1)}` : `${IMAGE_BASE_URL}w500${props.avatar_path}` : 
                    <Avatar>{ props.author.substring(0, 1)}</Avatar>
                } 
            content = {props.content.length > 300 && ReadMore ? 
                (props.content.substring(0, 300) + '...') : props.content}
            datetime = { <Tooltip> <span>{ moment(props.datetime.substring(0,10), 'YYYY-MM-DD').fromNow() }</span>
                        </Tooltip> }
            actions = {props.content.length > 300 ? 
                [<span onClick = {openReadMore}>{ReadMore ? 'Read More' : 'Close'}</span>] : null}
        />
    )
}
export default CommentCard
