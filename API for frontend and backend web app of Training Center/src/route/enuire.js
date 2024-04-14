


const Controller = require('../controller/enuireCont');

module.exports = (app) => {

    

    app.post('/enuire/insert',  Controller.insert);
    app.get('/enuire/list',  Controller.list);
    app.post('/enuire/update',  Controller.update);
    app.post('/enuire/deletedata',  Controller.deletedata); 
    app.post('/enuire/edit',  Controller.edit); 

    
   // app.post('/v1/calender/getTypeBasedCalendarInformation',  Controller.getTypeBasedCalendarInformation)
}