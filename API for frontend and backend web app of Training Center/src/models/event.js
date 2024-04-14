const db = require('../db');


const list = async (req, res) => {
    try {
        const listStr = "SELECT e.*,ec.name as event_category FROM event as e left join event_category as ec on e.event_cat = ec.id where e.status =1 ORDER BY e.id DESC";
        const [dataResult] = await db.query(listStr); // Destructure the results
        
        if (dataResult && dataResult.length > 0) {
            console.log(`Query executed successfully, Row count: ${dataResult.length}`);
            return dataResult; // Assuming that the result of the query is an array of rows
        } else {
            console.log('No rows found.');
            return []; // Return an empty array if no results are found
        }
        
    } catch (err) {
        console.error("Error executing query:", err);
        return []; // Return an empty array on error
    }
};

const edit = async (req, res) => {
    try {
        const listStr = "SELECT * FROM event where id = "+req.body.id+" and status =1 ORDER BY id DESC";
        const [dataResult] = await db.query(listStr); // Destructure the results
        
        if (dataResult && dataResult.length > 0) {
            console.log(`Query executed successfully, Row count: ${dataResult.length}`);
            return dataResult; // Assuming that the result of the query is an array of rows
        } else {
            console.log('No rows found.');
            return []; // Return an empty array if no results are found
        }
        
    } catch (err) {
        console.error("Error executing query:", err);
        return []; // Return an empty array on error
    }
};


const insert = async (req, res) => {
    try {
        if (req.body.name) {
            let searchValue = req.body.name.toLowerCase();
            let query = "SELECT LOWER(name) FROM event WHERE LOWER(name) ='"+searchValue+"'";
            const querydata = await db.query(query);

            if (querydata.rows && querydata.rows.length > 0) {
                return {
                    validationError: true,
                    error: 'Course already exists!'
                };
            }
        }

        let statusStr = "INSERT into event (name, event_cat,timing,date,excerpt,created_at) VALUES ('"+req.body.name+"', "+req.body.event_cat+",'"+req.body.timing+"','"+req.body.date+"','"+req.body.excerpt+"',now())";
        await db.query(statusStr, [req.body.name, req.body.cat_id]);
        return true;
    } catch (err) {
        console.log("err......."); 
        console.log(err);
        return false;
    }
};
const  Eventcategoryadd = async (req, res) => {
    try {
        if (req.body.name) {
            let searchValue = req.body.name.toLowerCase();
            let query = "SELECT LOWER(name) FROM event_category WHERE LOWER(name) ='"+searchValue+"'";
            const querydata = await db.query(query);

            if (querydata.rows && querydata.rows.length > 0) {
                return {
                    validationError: true,
                    error: 'Course already exists!'
                };
            }
        }

        let statusStr = "INSERT into event_category (name,created_at) VALUES ('"+req.body.name+"',now())";
        await db.query(statusStr);
        return true;
    } catch (err) {
        console.log("err......."); 
        console.log(err);
        return false;
    }
}


const update = async (req, res) => {
    try {
        if (req.body.name) {
            let searchValue = req.body.name.toLowerCase();
            let query = "SELECT LOWER(name) FROM event WHERE LOWER(name) ='"+searchValue+"'";
            const [querydata] = await db.query(query);

            if (querydata && querydata.length > 0) {
                return {
                    validationError: true,
                    error: 'Course already exists!'
                };
            }
        }


        let statusStr = "UPDATE event  SET name='" + req.body.name + "', event_cat=" + req.body.event_cat + ",timing='"+req.body.timing+"',date='"+req.body.date+"',excerpt='"+req.body.excerpt+"',updated_at = now() WHERE id=" + req.body.id + "";

        console.log("update statusStr:");
        console.log(statusStr);

        await db.query(statusStr);
        return true;
    } catch (err) {
        
        console.log("update err:");
        console.log(err);

        return false;
    }
}




const deletedata = async (req, res) => {
    try {
        let statusStr = "UPDATE event SET status= 2  WHERE id=" + req.body.id + "";


        console.log("statusStr...");
        console.log(statusStr);
        await db.query(statusStr);
        return true;
    } catch (err) {
         console.log("err.......");
        console.log(err); 
        return false;
    }
};
const eventcatlist = async (req, res) => {
    try {
        const listStr = "SELECT * FROM event_category where status =1 ORDER BY id DESC";
        const [dataResult] = await db.query(listStr); // Destructure the results
        
        if (dataResult && dataResult.length > 0) {
            console.log(`Query executed successfully, Row count: ${dataResult.length}`);
            return dataResult; // Assuming that the result of the query is an array of rows
        } else {
            console.log('No rows found.');
            return []; // Return an empty array if no results are found
        }
        
    } catch (err) {
        console.error("Error executing query:", err);
        return []; // Return an empty array on error
    }
};

const eventcatedit = async (req, res) => {
    try {
        const listStr = "SELECT * FROM event_category where id = "+req.body.id+" and status =1 ORDER BY id DESC";
        const [dataResult] = await db.query(listStr); // Destructure the results
        
        if (dataResult && dataResult.length > 0) {
            console.log(`Query executed successfully, Row count: ${dataResult.length}`);
            return dataResult; // Assuming that the result of the query is an array of rows
        } else {
            console.log('No rows found.');
            return []; // Return an empty array if no results are found
        }
        
    } catch (err) {
        console.error("Error executing query:", err);
        return []; // Return an empty array on error
    }
};

const Eventcategoryupdate = async (req, res) => {
    try {
      if (!req.body.id) {
        // Event category ID is required for update
        return {
          validationError: true,
          error: 'Event category ID is required!',
        };
      }
  
      if (!req.body.name) {
        // Event category name is required for update
        return {
          validationError: true,
          error: 'Event category name is required!',
        };
      }
  
      let searchValue = req.body.name.toLowerCase();
      let query = `SELECT LOWER(name) FROM event_category WHERE LOWER(name) = '${searchValue}' AND id != ${req.body.id}`;
      const querydata = await db.query(query);
  
      if (querydata.rows && querydata.rows.length > 0) {
        return {
          validationError: true,
          error: 'Event category with the same name already exists!',
        };
      }
  
      let statusStr = `UPDATE event_category SET name = '${req.body.name}', updated_at = now() WHERE id = ${req.body.id}`;
      await db.query(statusStr);
      return true;
    } catch (err) {
      console.log('err.......');
      console.log(err);
      return false;
    }
  };

  const deleteeventcat = async (req, res) => {
    try {
        let statusStr = "UPDATE event_category SET status= 2  WHERE id=" + req.body.id + "";


        console.log("statusStr...");
        console.log(statusStr);
        await db.query(statusStr);
        return true;
    } catch (err) {
         console.log("err.......");
        console.log(err); 
        return false;
    }
};
  





module.exports = { list, insert, update,deletedata,edit,Eventcategoryadd,eventcatlist,eventcatedit ,Eventcategoryupdate,deleteeventcat}