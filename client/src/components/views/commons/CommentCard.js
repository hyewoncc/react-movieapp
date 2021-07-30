import React from 'react'
import { Avatar } from 'antd'

function CommentCard(props) {
    return (
        <div>
            <Avatar shape="square" size={64} src={props.picture} />
            <a>{props.name}</a> <p>{props.date}</p>
            <p>{props.content}</p>
        </div>
    )
}
export default CommentCard
