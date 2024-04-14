
const Controller = require('../controller/eventCont');

module.exports = (app) => {

    

    app.post('/event/insert',  Controller.insert);
    app.get('/event/list',  Controller.list);
    app.post('/event/update',  Controller.update);
    app.post('/event/deletedata',  Controller.deletedata); 
    app.post('/event/edit',  Controller.edit);
    app.post('/event/eventcategoryinsert',  Controller.Eventcategoryadd);
    app.get('/event/eventcatlist',  Controller.eventcatlist);
    app.post('/event/eventcatedit',  Controller.eventcatedit);
    app.post('/event/eventcategoryupdate',  Controller.Eventcategoryupdate);
    app.post('/event/deleteeventcat',  Controller.deleteeventcat); 
    
    

    

    
   // app.post('/v1/calender/getTypeBasedCalendarInformation',  Controller.getTypeBasedCalendarInformation)
}