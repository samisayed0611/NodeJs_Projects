

const Controller = require('../controller/cirriclumCont');

module.exports = (app) => {

    

    app.post('/cirriclum/insert',  Controller.insert);
    app.get('/cirriclum/list',  Controller.list);
    app.post('/cirriclum/update',  Controller.update);
    app.post('/cirriclum/deletedata',  Controller.deletedata); 
    app.post('/cirriclum/edit',  Controller.edit);

    

    
   
}