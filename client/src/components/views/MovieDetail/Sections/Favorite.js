import React, { useEffect } from 'react'
import Axios from 'axios'
import { response } from 'express'

function Favorite(props) {

    const movieId = props.movieId
    const userFrom = props.userFrom
    const movieTitle = props.movieInfo.title
    const moviePost = props.movieInfo.backdrop_path
    const movieRunTime = props.movieInfo.runtime

    // 로딩 직후 Favorite 수를 얻기 위함 
    useEffect(() => {
        
        let variables = {
            userFrom,
            movieId
        }

        Axios.post('/api/favorite/favoriteNumber', variables)
            .then(response => {
                if(response.data.success) {

                } else {
                    alert('숫자 정보를 가져오는 데 실패했습니다.')
                }
            })
    }, [])

    return (
        <div>
            <button>Favorite</button>
        </div>
    )
}

export default Favorite
