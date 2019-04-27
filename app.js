var http = require('http')
var fs = require('fs')
var url = require('url')
var template = require('art-template')

var comments = []


http
  .createServer(function (req, res) {
    var parseObj = url.parse(req.url, true)
    var pathname = parseObj.pathname


    if (pathname === '/') {
      fs.readFile('./public/views/index.html', function (err, data) {
        if (err) {
          return res.end('404 Not Found.')
        }
        var htmlStr = template.render(data.toString(), {
          comments: comments
        })
        res.end(htmlStr)
      })
    } 
    else if (pathname === '/post') {
      fs.readFile('./public/views/post.html', function (err, data) {
        if (err) {
          return res.end('404 Not Found.')
        }
        res.end(data)
      })
    } 
    else if (pathname.indexOf('/public/') === 0) {
      fs.readFile('.' + pathname, function (err, data) {
        if (err) {
          return res.end('404 Not Found.')
        }
        res.end(data)
      })
    } 
    else if (pathname === '/pinglun') {
      var comment = parseObj.query
      comment.dateTime = new Date()
      comments.unshift(comment)
      res.statusCode = 302
      res.setHeader('Location', '/')
      res.end()
    } 
    else {
      fs.readFile('./views/404.html', function (err, data) {
        if (err) {
          return res.end('404 Not Found.')
        }
        res.end(data)
      })
    }
  })

  .listen(3000, function () {
    console.log('running...')
  })
