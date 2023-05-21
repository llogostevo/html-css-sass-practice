const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req,res) => {
    const filePath = path.join(__dirname, 'index.html');

    // err is a paramater that represents the error object that might occur when reading the index.html file
    // it is used with the callback function of the fs.rmSync.readFile() methdo
    fs.readFile(filePath, 
        //readfile asynchrously reads the content of the file
        // callback function as the second parameter of the readFile
        (err, content) => {
            // check if an error occurred during the file reading
            // if error is not null/undefined it means there was an error i.e. error is true
        if (err) {
            // res is the response object, it has methods and properties that allow control the response sent back to the client
            // this is an error 500 message that the server will respond with
            res.writeHead(500);
            // this is the error message that is sent in the response body
            // res.end sends the response back and ends the process, in this case the response is a message
            res.end('Error loading index.html');

        } else {
            // this will set the HTTP code and response headers
            // it sets 200 which is successful response, and the type indicates an html file
            // in this case content sends the response body, the content of the index.html file
            if (req.url.endsWith('.css')) {
                res.writeHead(200, { 'Content-Type': 'text/css' });
              } else {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(content);
              }
          
        }
    });
});

const port = 3000;
server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});