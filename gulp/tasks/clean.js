const filePaths =require("../config/paths");
const del = require('del');



function clean() {
  return  del(filePaths.buildFolder)
    
}

module.exports  = clean
