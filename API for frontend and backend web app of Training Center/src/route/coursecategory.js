
const Controller = require('../controller/coursecategoryCont');

module.exports = (app) => {

    console.log('yyyyyyyyyyyyyyyyyyyyyy');

    app.post('/coursecategory/insert',  Controller.insert);
    app.get('/coursecategory/list',  Controller.list);
    app.post('/coursecategory/update',  Controller.update);
    app.post('/coursecategory/deletedata',  Controller.deletedata);
    app.post('/coursecategory/edit',  Controller.edit); 

    
   // app.post('/v1/calender/getTypeBasedCalendarInformation',  Controller.getTypeBasedCalendarInformation)
}