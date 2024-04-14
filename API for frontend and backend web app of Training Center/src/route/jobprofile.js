
const Controller = require('../controller/jobprofileCont');

module.exports = (app) => {

    

    app.post('/jobprofile/insert',  Controller.insert);
    app.get('/jobprofile/list',  Controller.list);
    app.post('/jobprofile/update',  Controller.update);
    app.post('/jobprofile/deletedata',  Controller.deletedata); 
    app.post('/jobprofile/edit',  Controller.edit);

    

    
   // app.post('/v1/calender/getTypeBasedCalendarInformation',  Controller.getTypeBasedCalendarInformation)
}