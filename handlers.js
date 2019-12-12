var data = require('./SongsRepository');

var logArray=[];

const getSingleSong = (req, res) => {
  const { id } = req.urlObject.query;

  if (!Number.isNaN(id)) {
    const idData = data.getSpecificData(id);

    if (idData) {
      res.writeHeader(200);
      res.end(JSON.stringify(idData));
    } else {
      // log and return 'song not found' error
      res.writeHeader(404);
      res.end("The data is not exists");
    }
  } else {
    // log and return 'id is isNaN' error
      res.writeHeader(404);
      res.end("The id is is isNaN");
  }
};
const getAllData=(req, res) => { //print all data for admin
  console.log('/getAllData called!');
  res.writeHead(200);
  //The JSON.stringify(data) method converts a JavaScript object or value (data) to a JSON string.
  res.end(JSON.stringify(data));
};
const PathIsNotExist=(req, res, urlObject) => { // if we have error in syntax or if data exists (for all)
  console.log(`url ${urlObject.path} not exist!`);
  res.writeHead(404);
  res.write('Bad request');
  res.end();
};
const insertNewData = (req, res) => { //POST - insert data on ("DataBase")
  let body = '';
  req.on('data',chunk =>{
      body+=chunk.toString();          
  });
  req.on('end',() =>{
      const newDataItem =JSON.parse(body);
      data=data.AllData();
      data.push(newDataItem);
      res.end("The new Data in DataBase");
  });
};
const updateNewData = (req,res) => { //PUT - Update Data in "DataBase"
  let body = '';
  req.on('data',chunk =>{
      body+=chunk.toString();          
  });
  req.on('end',() =>{
      const newDataItem =JSON.parse(body);
      //data=data.AllData();
      const id= newDataItem.id;
      console.log(id);
      if (!Number.isNaN(id)) {
        var sprcificData = data.getSpecificData(id);
        if (sprcificData) {
          for(var i in sprcificData){
            var key = i;
            var val = sprcificData[i];
            switch(i){
              case "ticketNum": data.ticketNum = val; break;
              case "client": data.client = val; break;
            }
          }
          res.writeHeader(200);
          res.end(`The Data with id ${id} is Updated`);
        }
        else {
          // log and return 'song not found' error
          res.writeHeader(404);
          res.end("The data is not exists");
        }
      } 
      else {
        // log and return 'id is isNaN' error
        res.writeHeader(404);
        res.end("The id is isNaN");
      }
  });
};

const deleteNewData = (req,res) => { //DELETE - delete specific Data 
    const { id } = req.urlObject.query;
      if (!Number.isNaN(id)) {
        var sprcificData = data.getSpecificData(id);
        if(sprcificData){
          delete sprcificData;
          res.writeHeader(200);
          res.end(`The Data with id ${id} is Delete`);
        }
        else{
          res.writeHeader(404);
        res.end(`The Data with id ${id} is not exists`);
        }
      }
      else {
        // log and return 'id is isNaN' error
        res.writeHeader(404);
        res.end("The id is isNaN");
      }
};

const deleteAllData = (req,res) => {
  delete data;
  res.writeHeader(200);
  res.end("All Date has removed");
}


const logs = (req,res) => {
  res.writeHeader(200);
  res.end(logArray);
}
module.exports = {
  getSingleSong,
  getAllData,
  PathIsNotExist,
  insertNewData,
  updateNewData,
  deleteNewData,
  deleteAllData,
  logs
};
