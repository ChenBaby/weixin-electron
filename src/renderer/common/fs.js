var fs = require('fs')
var log = {
    mkdir (path) {
        if (!fs.existsSync(path)) {
            fs.mkdirSync(path)
        }
    },
    readdir (path, callback) {
        if (fs.existsSync(path)) {
            fs.readdir(path, function (err, files) {
                if (err) {
                    return console.error(err)
                }
                callback(files)
            })
        }
    },
    write (to, data) {
        var writeStream = fs.createWriteStream(to)
        writeStream.write(JSON.stringify(data))
        writeStream.end()
    },
    read (from, callback) {
        let JSONString = ''
        var readerStream = fs.createReadStream(from)
        readerStream.setEncoding('UTF8')
        readerStream.on('data', function (chunk) {
            JSONString += chunk
        })
        readerStream.on('end', function () {
            callback(JSON.parse(JSONString))
        })
    }
}

export default log
