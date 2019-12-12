const { EventEmitter } = require('events');
const DataJSON = require('./data/songs.json');

class SongsRepository extends EventEmitter {
    constructor() {
      super();
      this.m_Data = DataJSON;
    }
  
    getSpecificData(id) {
      this.emit("singleSong" | "updateNewData" | "deleteNewData", this.m_Data[id-1]); // Fire event
  
      return this.m_Data[id-1];
    }
    AllData(){
      this.emit("insterNewData" | "updateNewData" | "deleteNewData", this.m_Data);
      return this.m_Data;
    }
  }
  
  const songsRepo = (new SongsRepository()).on('singleSong', data => console.log(`Get single song: ${data}`)); // Catch event 
  //const InsertData = (new SongsRepository()).on('insterNewData', data => console.log(`Get all song: ${data}`)); // Catch event 
  module.exports = songsRepo
