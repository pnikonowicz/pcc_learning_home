const http = require('http')
const fs = require('fs')

const createServer = (err, html)=> {
    if (err) throw err

    html = html.toString().replace(/🦖name_service_url/g, process.env.NAME_SERVICE_URL || 'http://localhost:8080');
    const server = http.createServer((req, res) => {
        res.statusCode = 200
        res.setHeader('Content-Type', 'text/html; charset=utf-8')
        res.end(html)
    })

    const hostname = process.env.VCAP_APP_HOST || 'localhost'
    const port = process.env.PORT || 3000
    server.listen(port, hostname, () => {
        console.log(`Server running at http://${hostname}:${port}/`)
    })
}

fs.readFile('app.html', createServer)
