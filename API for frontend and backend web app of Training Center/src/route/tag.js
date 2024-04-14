
const Controller = require('../controller/tagCont');

module.exports = (app) => {

    

    app.post('/tag/insert',  Controller.insert);
    app.get('/tag/list',  Controller.list);
    app.post('/tag/update',  Controller.update);
    app.post('/tag/deletedata',  Controller.deletedata); 
    app.post('/tag/edit',  Controller.edit); 

    
   // app.post('/v1/calender/getTypeBasedCalendarInformation',  Controller.getTypeBasedCalendarInformation)
}