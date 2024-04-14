
const Controller = require('../controller/subcategoryCont');

module.exports = (app) => {

    

    app.post('/subcategory/insert',  Controller.insert);
    app.get('/subcategory/list',  Controller.list);
    app.post('/subcategory/update',  Controller.update);
    app.post('/subcategory/deletedata',  Controller.deletedata); 
    app.post('/subcategory/edit',  Controller.edit);

    

    
   // app.post('/v1/calender/getTypeBasedCalendarInformation',  Controller.getTypeBasedCalendarInformation)
}