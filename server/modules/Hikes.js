'use strict';

const db = require('./DB').db;

//get hikes

const acceptableFilters = ['HikeID','Length','ExpectedTime','Ascent', 'Difficulty', 'Start', 'End','Title'];



exports.getHikes = () => {

    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM Hikes';
      db.all(sql, [], (err, rows) => {

        if (err) {
          reject(err);
        }
        const hikes = rows.map((r) => ({ HikeID: r.HikeID,  Start: r.Start, End: r.End, Title: r.Title, Length: r.Length, ExpectedTime: r.ExpectedTime, Ascent: r.Ascent, Difficulty: r.Difficulty, Description: r.Description}));
        resolve(hikes);
      });
    });
};


exports.addHike=(HikeID,Title, Length, ExpectedTime, Ascent,Difficulty,Start, End, Description)=>{
  return new Promise(async (resolve, reject) => {
    db.run("INSERT INTO Hikes (HikeID,Title, Length, ExpectedTime, Ascent,Difficulty,Start, End, Description) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [HikeID,Title, Length, ExpectedTime, Ascent, Difficulty,Start, End, Description], function (err) {
            if (err)
                reject(err);
            else
                resolve('New Hike inserted');
        });
});
}  

exports.deleteHikes=()=>{
    return new Promise(async (resolve, reject) => {
      db.run("DELETE FROM Hikes", [], function (err) {
          if (err)
              reject(err);
          else
              resolve('Hikes emptied');
      });
  })
}
/*
It Allows to set a specific filter if MaxValue is not specified or a range if a max value is set
 */
exports.getHikesByFilter=(filterType, filterMinValue, MaxValue=null)=>{
  return new Promise(
    async (resolve,reject)=>{
      //console.log(filterType,filterMinValue,MaxValue,MinValue);
      if(acceptableFilters.includes(filterType)){
        if(MaxValue==null){
          let sql = 'SELECT * FROM Hikes WHERE ' + filterType + '= ?'
          //console.log(sql);
          db.all(sql,[filterMinValue],(err,rows)=>{
            //console.log("rows:"+rows);
            if(err)reject(err);
            else{
              const hikes = rows.map((r) => ({ HikeID: r.HikeID,  Start: r.Start, End: r.End, Title: r.Title, Length: r.Length, ExpectedTime: r.ExpectedTime, Ascent: r.Ascent, Difficulty: r.Difficulty, Description: r.Description}));
              resolve(hikes);
            }
          });
        }else{
          let sql = 'SELECT * FROM Hikes WHERE ' + filterType + ' <= ? AND ' + filterType + ' >= ?' 
          console.log(sql);
          db.all(sql,[MaxValue,filterMinValue],(err,rows)=>{
            console.log("rows:"+rows);
            if(err)reject(err);
            else{
              const hikes = rows.map((r) => ({ HikeID: r.HikeID,  Start: r.Start, End: r.End, Title: r.Title, Length: r.Length, ExpectedTime: r.ExpectedTime, Ascent: r.Ascent, Difficulty: r.Difficulty, Description: r.Description}));
              resolve(hikes);
            }
          });

        }
      }else reject('No such field');
        
    }
  );

}
