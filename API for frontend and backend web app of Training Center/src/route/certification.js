

const Controller = require('../controller/certificationCont');

module.exports = (app) => {

    

    app.post('/certification/insert',  Controller.insert);
    app.get('/certification/list',  Controller.list);
    app.post('/certification/update',  Controller.update);
    app.post('/certification/deletedata',  Controller.deletedata); 
    app.post('/certification/edit',  Controller.edit);

    

    
   
}