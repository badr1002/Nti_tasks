const express = require('express')
const router = new express.Router()
const myController = require('../controllers/controllers');
router.get('/', (req, res) => {
    res.redirect('/blogs/en')
});
router.get('/blogs/en', myController.home_en)
router.get('/blogs/ar', myController.home_ar)
router.get('/singleBlog/en', myController.singleBlog_en)
router.get('/singleBlog/ar',myController.singleBlog_ar)


module.exports = router