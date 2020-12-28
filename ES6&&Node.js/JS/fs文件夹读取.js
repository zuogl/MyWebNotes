const fs = require('fs');
fs.readdir('D:',{withFileTypes:true},(err,data) =>{
    if(err) throw err;
    console.log(data)
})