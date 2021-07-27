import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import { FAVORITE_SERVER } from '../../../Config.js';
import { Button } from 'antd'

function Favorite(props) {

    const movieId = props.movieId
    const userFrom = props.userFrom
    const movieTitle = props.movieInfo.title
    const moviePost = props.movieInfo.backdrop_path
    const movieRunTime = props.movieInfo.runtime

    const [FavoriteNumber, setFavoriteNumber] = useState(0)
    const [Favorited, setFavorited] = useState(false)
    
    let variables = {
        userFrom: userFrom,
        movieId: movieId,
        movieTitle: movieTitle,
        moviePost: moviePost,
        movieRunTime: movieRunTime
    }

    // 로딩 직후 Favorite 수를 얻기 위함 
    useEffect(() => {

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

    const onClickFavorite = () => {
        //현재 Favorited 인지 조건
        if(Favorited) {
            Axios.post(`${FAVORITE_SERVER}/removeFromFavorite`, variables)
                .then(response => {
                    if(response.data.success) {
                        setFavoriteNumber(FavoriteNumber - 1)
                        setFavorited(!Favorited)
                    } else {
                        alert('Favorite 리스트 삭제 실패했습니다.')
                    }
                })

        } else {
            Axios.post(`${FAVORITE_SERVER}/addToFavorite`, variables)
                .then(response => {
                    if (response.data.success) {
                        setFavoriteNumber(FavoriteNumber + 1)
                        setFavorited(!Favorited)
                    } else {
                        alert('Favorite 리스트 추가에 실패했습니다.')
                    }
                })
        }
    }

    return (
        <div>
            <Button onClick={onClickFavorite} >{Favorited ? " Not Favorite " : " Add to Favorite "} {FavoriteNumber} </Button>
        </div>
    )
}

export default Favorite
