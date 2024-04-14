
const Controller = require('../controller/iconCont');

module.exports = (app) => {

    

    app.post('/icon/insert',  Controller.insert);
    app.get('/icon/list',  Controller.list);
    app.post('/icon/update',  Controller.update);
    app.post('/icon/deletedata',  Controller.deletedata); 
    app.post('/icon/edit',  Controller.edit); 

    
   // app.post('/v1/calender/getTypeBasedCalendarInformation',  Controller.getTypeBasedCalendarInformation)
}