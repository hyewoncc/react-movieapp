const express = require('express');
const router = express.Router();
const { Favorite } = require('../models/Favorite')

router.post('/favoriteNumber', (req, res) => {

    // mongoDB에서 favorite 숫자를 가져오기 
    Favorite.find({ "movieId": req.body.movieId })
        .exec(( err, info) => {
            //에러가 날 경우 에러 정보를 클라이언트에 보내줌 
            if(err) return res.status(400).send(err)

            //성공 상태, 여부와 조회된 자료 배열 길이 보내기 
            res.status(200).json({ success:true, favoriteNumber: info.length })
        })
})

router.post('/favorited', (req, res) => {

    //이 영화를 Favorite 리스트에 넣었는지 DB에서 가져오기 
    Favorite.find({ "movieId": req.body.movieId, "userFrom": req.body.userFrom })
        .exec(( err, info) => {
            //에러가 날 경우 에러 정보를 클라이언트에 보내줌 
            if(err) return res.status(400).send(err)

            let result = false;
            if(info.length !== 0 ) {
                result = true
            }

            //성공 상태, 여부와 조회된 자료 배열 길이 보내기 
            res.status(200).json({ success:true, favorited: result })
        })
})


router.post('/addToFavorite', (req, res) => {
    const favorite = new Favorite(req.body)

    favorite.save((err, doc) => {
        if(err) return res.status(400).send(err)
        return res.status(200).json({ success: true})
    })
})


router.post('/removeFromFavorite', (req, res) => {
    Favorite.findOneAndDelete({ movieId: req.body.movieId, userFrom: req.body.userFrom })
        .exec(( err, doc) => {
            if(err) return res.status(400).send(err)
            res.status(200).json({ success: true, doc })
        })
})


router.post('/getFavoritedMovie', (req, res) => {
    Favorite.find({ userFrom: req.body.userFrom})
        .exec((err, favorites) => {
            if(err) return res.status(400).send(err)
            return res.status(200).json({ success: true, favorites })
        })
})

module.exports = router;
