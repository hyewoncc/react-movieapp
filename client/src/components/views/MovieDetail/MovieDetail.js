import React, { useEffect, useState } from 'react'
import { API_URL, API_KEY, IMAGE_BASE_URL } from '../../Config';
import MainImage from '../LandingPage/Sections/MainImage'
import MovieInfo from './Sections/MovieInfo';
import GridCards from '../commons/GridCards';
import CommentCard from '../commons/CommentCard';
import { Row } from 'antd';
import Favorite from './Sections/Favorite';

function MovieDetail(props) {

    let movieId = props.match.params.movieId
    const [Movie, setMovie] = useState([])
    const [Casts, setCasts] = useState([])
    const [ActorToggle, setActorToggle] = useState(false)
    const [Comments, setComments] = useState([])

    useEffect(() => {
        
        let endpointCrew = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`

        let endpointInfo = `${API_URL}movie/${movieId}?api_key=${API_KEY}`

        let endpointComment = `${API_URL}movie/${movieId}/reviews?api_key=${API_KEY}`

        fetch(endpointInfo)
            .then(response => response.json())
            .then(response => {
                setMovie(response)
            })
        
        fetch(endpointCrew)
            .then(response => response.json())
            .then(response => {
                setCasts(response.cast)
            })

        fetch(endpointComment)
            .then(response => response.json())
            .then(response => {
                setComments(response.results)
            })

    }, [])

    const toggleActorView = () => {
        setActorToggle(!ActorToggle)
    }

    return (
        <div>

            {/* Header */}

            <MainImage image={`${IMAGE_BASE_URL}w1280${Movie.backdrop_path}`} 
                title={Movie.original_title}
                text={Movie.overview}
            />

            {/* Body */}
            <div style={{ width: '85%', margin: '1rem auto' }}>

                <div style={{ display: 'flex', justifyContent: 'flex-end '}}>
                    <Favorite movieInfo={Movie} movieId={movieId} userFrom={localStorage.getItem('userId')}/>
                </div>
                
                {/* Movie Info */}

                <MovieInfo
                    movie={Movie}
                />

                {/* Comments */}
                <h3>Movie Reviews</h3>
                <div>
                    {Comments && Comments.map((comment, index) => (
                        <React.Fragment key={index}>
                            <CommentCard 
                                picture = {comment.author_details.avatar_path.startsWith('/https://secure') ? 
                                `${comment.author_details.avatar_path.substring(1)}` : `${IMAGE_BASE_URL}w500${comment.author_details.avatar_path}`} 
                                name = {comment.author} 
                                content = {comment.content}
                                date = {comment.updated_at}
                            />
                        </React.Fragment>
                    ))}
                </div>

                <br/>
                {/* Actors Grid */}
            
                <div style={{ display: 'flex', justifyContent: 'center', margin: '2rem' }}>
                    <button onClick={toggleActorView}> Toggle Actor View </button>                    
                </div>

                {ActorToggle &&  
                    <Row gutter={[16, 16]}>
                        {Casts && Casts.map((cast, index) => (
                            <React.Fragment key={index}>
                                <GridCards 
                                    image={cast.profile_path ?
                                        `${IMAGE_BASE_URL}w500${cast.profile_path}` : null}
                                        characterName={cast.name}
                                        />
                            </React.Fragment>
                        ))}
                    </Row>
                }

            </div>
            
        </div>
    )
}

export default MovieDetail
