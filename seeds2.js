const axios = require("axios");
const fetch = require("fetch");
const Team = require('./models/teamTest');
require('./config/database');

const p1 = Team.deleteMany({});


Promise.all([p1])
.then((DeletionResult) => {
    console.log("DELETED from Databases -> \n" , DeletionResult);

     
}).then((result) => {
    console.log('Finished ' ,  result)
    process.exit();
});

const options = {
    method: 'GET',
    url: 'https://api-football-v1.p.rapidapi.com/v3/teams',
    params: { league: '39', season: '2022' },
    headers: {
      'X-RapidAPI-Key': '31c6b15b4fmsh499cef70662ca32p16c879jsnd1275cf149d3',
      'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
    }
  };

axios.request(options)
  .then(function (response) {

    console.log(response.data.response);
    
    let teamsInfo = response.data.response.map(supportedTeam => {
      return {
        id: supportedTeam.team.id,
        name: supportedTeam.team.name,
      }
    })
    console.log("teamsInfo = ", teamsInfo)
    return Team.create(teamsInfo);
}).then(function(result){
    console.log(" Ended call = ", result);
    process.exit();
});