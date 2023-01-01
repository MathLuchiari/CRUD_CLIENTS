const sass = require("sass");
const fs = require("fs");

const result = sass.compile("src\\components\\main.scss");

fs.writeFile("src\\css\\style.css", result.css, function (err) {
    if (err) 
        throw err;
        
    console.log('Results Received');
});