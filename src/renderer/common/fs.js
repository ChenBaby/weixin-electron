var fs = require('fs')
var datas = []
var log = {
    mkdir (path) {
        if (!fs.existsSync(path)) {
            fs.mkdirSync(path)
        }
    },
    readdir (path, callback) {
        fs.readdir(path, function (err, files) {
            if (err) {
                return console.error(err)
            }
            callback(files)
        })
    },
    write (to, data) {
        var writeStream = fs.createWriteStream(to)
        writeStream.write(JSON.stringify(data))
        writeStream.end()
    },
    read (from, callback) {
        var readerStream = fs.createReadStream(from)
        readerStream.setEncoding('UTF8')
        readerStream.on('data', function (chunk) {
            datas.push(JSON.parse(chunk))
        })
        readerStream.on('end', function () {
            callback(datas)
        })
    }
}

export default log
