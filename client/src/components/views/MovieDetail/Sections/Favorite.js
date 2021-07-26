import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import { FAVORITE_SERVER } from '../../../Config.js';


function Favorite(props) {

    const movieId = props.movieId
    const userFrom = props.userFrom
    const movieTitle = props.movieInfo.title
    const moviePost = props.movieInfo.backdrop_path
    const movieRunTime = props.movieInfo.runtime

    const [FavoriteNumber, setFavoriteNumber] = useState(0)
    const [Favorited, setFavorited] = useState(false)

    // 로딩 직후 Favorite 수를 얻기 위함 
    useEffect(() => {
        
        let variables = {
            userFrom,
            movieId
        }

        Axios.post(`${FAVORITE_SERVER}/favoriteNumber`, variables)
            .then(response => {
                setFavoriteNumber(response.data.favoriteNumber)
                if(response.data.success) {

                } else {
                    alert('숫자 정보를 가져오는 데 실패했습니다.')
                }
            })

        Axios.post(`${FAVORITE_SERVER}/favorited`, variables)
            .then(response => {
                if(response.data.success) {
                    setFavorited(response.data.favorited)
                } else {
                    alert('정보를 가져오는 데 실패했습니다.')
                }
            })
    }, [])

    return (
        <div>
            <button>{Favorited ? " Not Favorite " : " Add to Favorite "} {FavoriteNumber} </button>
        </div>
    )
}

export default Favorite
