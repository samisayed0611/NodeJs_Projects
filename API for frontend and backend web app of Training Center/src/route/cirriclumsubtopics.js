

const Controller = require('../controller/cirriclumsubtopicsCont');

module.exports = (app) => {

    

    app.post('/cirriclumsubtopics/insert',  Controller.insert);
    app.get('/cirriclumsubtopics/list',  Controller.list);
    app.post('/cirriclumsubtopics/update',  Controller.update);
    app.post('/cirriclumsubtopics/deletedata',  Controller.deletedata); 
    app.post('/cirriclumsubtopics/edit',  Controller.edit);

    

    
   
}