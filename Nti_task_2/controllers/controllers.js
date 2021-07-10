const getApiData = ( url, cb ) =>{
    let https = require('http')
    const request = https.request(url, (response)=>{
    let result = ''
        response.on('data', data => {
            result += data.toString();
        });
        response.on('end', () => {
            const all = JSON.parse(result);
            cb(all, false);
        });
    })
    request.on('error', (err) => { console.log(err); cb(false, 'error') });
    request.end();
}


const home_en =  (req, response) => {
    url = "http://medical.mind-techs.com/api/blog/1/0/11";
    getApiData(url, (res, err) => {
        if (err) console.log(err)
        response.render("home", { title: 'blogs', data: res.data, lang : 'ar' })
    });
    
}
const home_ar =  (req, response) => {
    url = "http://medical.mind-techs.com/api/blog/2/0/11";
    getApiData(url, (res, err) => {
        if (err) console.log(err);
        response.render("home", { title: 'blogs', data: res.data, lang : 'en' });
    });
    
}


const singleBlog_en =  (req, response) => {
    url = "http://medical.mind-techs.com/api/SingleBlog/2/1";
    getApiData(url, (res, err) => {
        if (err) console.log(err);
        response.render("singleBlogs", { title: 'blogs', data: res.data, lang : 'ar' });
    });
    
}


const singleBlog_ar =  (req, response) => {
    url = "http://medical.mind-techs.com/api/SingleBlog/2/2";
    getApiData(url, (res, err) => {
        if (err) console.log(err);
        response.render("singleBlogs", { title: 'blogs', data: res.data, lang : 'en' });
    });
    
}

module.exports = {
    home_en,
    home_ar,
    singleBlog_en,
    singleBlog_ar
}