const express  = require('express')
const axios = require('axios')
const PORT = process.env.PORT || 5000;
const cheerio = require('cheerio')
const { response } = require('express')
const app = express()
const arts = []
app.get('/' , (req,res)=>{
    res.json('runing')
})

app.get('/news',(req,res)=>{
    axios.get('https://www.prothomalo.com/collection/latest').then((response)=>{
        const html = response.data
        const $ = cheerio.load(html)
        $('a',html).each(function(){
            const title = $(this).text()
            const url = $(this).attr('href')
            arts.push({
                title,
                url
            })
        })
        res.json(arts)
    }).catch((err) => console.log(err))
})


app.listen(PORT, () => console.log(`server is running on port ${PORT}`))
