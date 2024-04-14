
const Controller = require('../controller/youlearnCont');

module.exports = (app) => {

    

    app.post('/youlearn/insert',  Controller.insert);
    app.get('/youlearn/list',  Controller.list);
    app.post('/youlearn/update',  Controller.update);
    app.post('/youlearn/deletedata',  Controller.deletedata); 
    app.post('/youlearn/edit',  Controller.edit); 

    
   // app.post('/v1/calender/getTypeBasedCalendarInformation',  Controller.getTypeBasedCalendarInformation)
}