const fs = require('fs')
const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000

app.get('/', function (req, res) {
    fs.readFile('app.html', (err, html) => {
        if (err) throw err

        const nameUrl = process.env.NAME_SERVICE_URL || 'http://localhost:8080'
        const userStatusUrl = process.env.USER_STATUS_SERVICE_URL || 'http://localhost:8080'
        const answerUrl = process.env.ANSWER_SERVICE_URL || 'http://localhost:3001'

        const expanded_html = html.toString()
            .replace(/🦖name_service_url/g, nameUrl)
            .replace(/🦖user_status_service_url/g, userStatusUrl)
            .replace(/🦖answer_service_url/g, answerUrl)
        res.send(expanded_html)
    })
})

app.listen(PORT,function(){
    console.log('Server is running at PORT:',PORT)
})
