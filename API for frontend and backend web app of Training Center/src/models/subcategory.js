const db = require('../db');


const list = async (req, res) => {
    try {
        const listStr = "SELECT sc.*,c.name as cat_name FROM course_sub_category as sc left join courses_category as c on c.id = sc.cat_id where sc.status =1 ORDER BY sc.id DESC";
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
        const listStr = "SELECT * FROM course_sub_category where id = "+req.body.id+" and status =1 ORDER BY id DESC";
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
            let query = "SELECT LOWER(name) FROM course_sub_category WHERE LOWER(name) ='"+searchValue+"'";
            const querydata = await db.query(query);

            if (querydata.rows && querydata.rows.length > 0) {
                return {
                    validationError: true,
                    error: 'Course already exists!'
                };
            }
        }

        let statusStr = "INSERT into course_sub_category (name, cat_id) VALUES ('"+req.body.name+"', "+req.body.cat_id+")";
        await db.query(statusStr, [req.body.name, req.body.cat_id]);
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
            let query = "SELECT LOWER(name) FROM course_sub_category WHERE LOWER(name) ='"+searchValue+"'";
            const [querydata] = await db.query(query);

            if (querydata && querydata.length > 0) {
                return {
                    validationError: true,
                    error: 'Course already exists!'
                };
            }
        }


        let statusStr = "UPDATE course_sub_category SET name='" + req.body.name + "' WHERE id=" + req.body.id + "";

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
        let statusStr = "UPDATE course_sub_category SET status= 2  WHERE id=" + req.body.id + "";


        console.log("statusStr...");
        console.log(statusStr);
        await db.query(statusStr);
        return true;
    } catch (err) {
         console.log("err.......");
        console.log(err); 
        return false;
    }
}





module.exports = { list, insert, update,deletedata,edit }