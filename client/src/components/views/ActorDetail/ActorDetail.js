import React, { useEffect, useState } from 'react'
import { API_URL, API_KEY, IMAGE_BASE_URL } from '../../Config';
import ActorInfo from './ActorInfo';

function ActorDetail(props) {

    let actorId = props.match.params.actorId 
    const [Actor, setActor] = useState([])
    

    useEffect(() => {

        let endpointActor = `${API_URL}person/${actorId}?api_key=${API_KEY}`

        fetch(endpointActor)
            .then(response => response.json())
            .then(response => {
                setActor(response)
            })

    }, [])

    return (
        <div>

            {/* Body */}
            <div style={{ width: '85%', margin: '1rem auto' }}>

                {/* Actor Info */}

                <ActorInfo
                    actor = { Actor }
                />

                <br/>
                {/* Movie Credits Grid */}

            </div>
        
        </div>
    )
}

export default ActorDetail
