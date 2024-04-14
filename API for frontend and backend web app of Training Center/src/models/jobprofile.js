const db = require('../db');


const list = async (req, res) => {
    try {
        const listStr = "SELECT * FROM job_profile where status = 1 ORDER BY id DESC";
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
       
        const listStr = "SELECT * FROM job_profile where id = "+req.body.id+"";
        const [dataResult] = await db.query(listStr);
        
        if (dataResult.length > 0) {
            console.log(`Query executed successfully, Row count: ${dataResult.length}`);
            return dataResult; 
        } else {
            console.log('No rows found.');
            return [];
        }
        
    } catch (err) {
        console.error("Error executing query:", err);
        return []; // Return an empty array on error
    }
};


const insert = async (req, res) => {
    try {

        

       
       let statusStr = "INSERT into job_profile (job_profile,created_at) values ('"+req.body.job_profile+"',now()) ";
        await db.query(statusStr);
        console.log('statusStr');
        console.log(statusStr);
        return true;
    
}catch (err) {
        console.log("err.......");
        console.log(err);
        return false;
    }
}

const update = async (req, res) => {
    try {
        
    let statusStr = "UPDATE job_profile SET job_profile='" + req.body.job_profile + "' WHERE id=" + req.body.id + "";

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
        let statusStr = "UPDATE job_profile SET status= 2  WHERE id=" + req.body.id + "";


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





module.exports = { list, insert,edit, update,deletedata }