import React from 'react'
import { Descriptions } from 'antd'

function ActorInfo(props) {

    let { actor } = props;

    return (
        <Descriptions title="Actor Info" bordered>
            <Descriptions.Item label="name">{actor.name}</Descriptions.Item>
            <Descriptions.Item label="gender">{actor.gender}</Descriptions.Item>
            <Descriptions.Item label="popularity">{actor.popularity}</Descriptions.Item>
            <Descriptions.Item label="birthday" span={2}>{actor.birthday}</Descriptions.Item>
            <Descriptions.Item label="deathday">{actor.deathday ? actor.deathday : '-'}</Descriptions.Item>
            <Descriptions.Item label="biography">{actor.biography}</Descriptions.Item>
        </Descriptions>
    )
}

export default ActorInfo
