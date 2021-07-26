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

module.exports = router;
