

const Controller = require('../controller/coursesCont');

module.exports = (app) => {

    

    app.post('/courses/insert',  Controller.insert);
    app.get('/courses/list',  Controller.list);
    app.post('/courses/update',  Controller.update);
    app.post('/courses/deletedata',  Controller.deletedata); 
    app.post('/courses/edit',  Controller.edit);

    app.post('/courses/courslistbytag',  Controller.Courslistbytag);
    

    

    
   
}