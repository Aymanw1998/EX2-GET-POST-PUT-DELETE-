const url = require('url');
const { getSingleSong,getAllData,PathIsNotExist,insertNewData,
    updateNewData,deleteNewData,deleteAllData,logs} = require('./handlers');

module.exports = (req, res) => {
    console.log(`Request ${req.method} came from ${req.url}`);

    const urlObj = url.parse(req.url, true, false);
    req.urlObject = urlObj;

    switch (req.method) {
        case 'GET':{
            if(urlObj.pathname === '/logs' && urlObj.query.admin == "yes"){
                logs(req,res);
            }
            if(urlObj.pathname ==='/getAllData' && urlObj.query.admin == "yes"){
                getAllData(req,res);
            }
            if (urlObj.path.startsWith('/getSingleSong')) {
                getSingleSong(req, res);
            }
            else{ 
                PathIsNotExist(req,res,urlObj);
            }break;
        }
        case 'POST':
            if(urlObj.pathname === '/insertNewData'){
                insertNewData(req,res);
            }else{
                PathIsNotExist(req,res,urlObj);
            }break;
        case 'PUT':
            if(urlObj.pathname === '/updateNewData'){
                updateNewData(req,res);
            }else{
                PathIsNotExist(req,res,urlObj);
            }break;
        case 'DELETE':
            if (urlObj.pathname ===('/deleteNewData')) {
                deleteNewData(req, res);
            }
            if(urlObj.pathname ===('/deleteAllData') && urlObj.query.admin == "yes"){
                deleteAllData(req, res);
            }
        default: 
            // Log the error
            res.writeHeader(404);
            res.end("We are work just with GET OR POST OR PUT DELTE");
    }
};
