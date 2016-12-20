var commander = require('commander');
var fs = require('fs');

function parseText(text, callback) {
    text = text.toUpperCase();
    var result = '';
    for (var index in text) {
        var letter = text[index];
        if (letter === 'T') {
            letter = 'P';
        } else if (letter === 'P') {
            letter = 'T';
        }

        if (letter === 'E' || letter === 'É' || letter === 'Ê') {
            letter = 'O';
        } else if (letter === 'O' || letter === 'Ó' || letter === 'Ô') {
            letter = 'E';
        }

        if (letter === 'N') {
            letter = 'L';
        } else if (letter === 'L') {
            letter = 'N';
        }

        if (letter === 'I' || letter === 'Í') {
            letter = 'A';
        } else if (letter === 'A' || letter === 'Á' || letter === 'À' || letter === 'Ã') {
            letter = 'I';
        }

        if (letter === 'S') {
            letter = 'R';
        } else if (letter === 'R') {
            letter = 'S';
        }

        result = result.concat(letter);
    }

    callback(result);
}

function readFile(filePath, callback) {
    fs.readFile(filePath,'utf8' ,function (err, data) {
        if (err) {
            throw err;
        }

        callback(data);
    });
}

function saveToOuput(parsedText) {
    fs.writeFile(commander.output, parsedText, function(err){
        if(err){
            throw err;
        }

        console.log('Saved to '+commander.output);
    })
}

commander.version('0.0.1')
    .option('-t, --text [text]', 'parse the following text')
    .option('-f --file [filepath]', 'parse a text file')
    .option('-o, --output [file]', 'specifies a location to the output')
    .parse(process.argv);


if (commander.text) {
    parseText(commander.text, function (parsedText) {
        if (commander.output) {
            saveToOuput(parsedText);
        } else {
            console.log('parsed: ' + parsedText);
        }
    });
} else if (commander.file) {
    readFile(commander.file, function (fileContent) {
        parseText(fileContent, function (parsedText) {
            if (commander.output) {
                saveToOuput(parsedText);
            } else {
                console.log('parsed: ' + parsedText);
            }
        })
    });  
}

