
const Controller = require('../controller/testimonialCont');

module.exports = (app) => {

    

    app.post('/testimonial/insert',  Controller.insert);
    app.get('/testimonial/list',  Controller.list);
    app.post('/testimonial/update',  Controller.update);
    app.post('/testimonial/deletedata',  Controller.deletedata); 
    app.post('/testimonial/edit',  Controller.edit);

    

    
   // app.post('/v1/calender/getTypeBasedCalendarInformation',  Controller.getTypeBasedCalendarInformation)
}