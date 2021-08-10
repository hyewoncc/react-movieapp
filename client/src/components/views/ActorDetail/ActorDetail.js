import React, { useEffect, useState } from 'react'
import { API_URL, API_KEY, IMAGE_BASE_URL } from '../../Config';
import ActorInfo from './ActorInfo';
import GridCards from '../commons/GridCards';
import { Row } from 'antd';


function ActorDetail(props) {

    let actorId = props.match.params.actorId 
    const [Actor, setActor] = useState([])
    const [Credits, setCredits] = useState([])

    useEffect(() => {

        let endpointActor = `${API_URL}person/${actorId}?api_key=${API_KEY}`
        let endpointCredits = `${API_URL}person/${actorId}/movie_credits?api_key=${API_KEY}`

        fetch(endpointActor)
            .then(response => response.json())
            .then(response => {
                setActor(response)
            })
        
        fetch(endpointCredits)
            .then(response => response.json())
            .then(response => {
                setCredits(response)
            })

    }, [])

    return (
        <div>

            {/* Body */}
            <div style={{ width: '85%', margin: '1rem auto' }}>

                {/* Actor Picture and Info*/}
                <div style={{ display: 'flex'}}>
                    <div>
                        <img style={{ width: '300px', objectFit: 'contain'}} src={`${IMAGE_BASE_URL}w500${Actor.profile_path}`} alt={Actor.name}/>
                    </div>
                    <div style={{ marginLeft: '10px' }}>
                        <ActorInfo
                            actor = { Actor }
                        />
                    </div>
                </div>

                <br/>
                {/* Movie Credits Grid */}
                <Row gutter={[16, 16]}>
                    {Credits.cast && Credits.cast.map((movie, index) => (
                        <React.Fragment key={index}>
                            <GridCards 
                                landingPage
                                image={movie.poster_path ?
                                    `${IMAGE_BASE_URL}w500${movie.poster_path}` : null}
                                movieId={movie.id}
                                movieName={movie.original_title}
                            />
                        </React.Fragment>
                    ))}
                </Row>

            </div>
        
        </div>
    )
}

export default ActorDetail
