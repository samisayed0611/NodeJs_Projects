const db = require('../db');


const list = async (req, res) => {
    try {
       
        const listStr = "SELECT * FROM courses_category where status = 1 ORDER BY id DESC";
        const [dataResult] = await db.query(listStr);
        
        if (dataResult.length > 0) {
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

           let searchValue = `'${req.body.name.toLowerCase()}'`;
            let query = `SELECT LOWER(name) FROM courses_category WHERE LOWER(name) =`+searchValue;
            console.log(query)
            console.log('querydata---------------------') 
      
            const [querydata] = await db.query(query);

            console.log(querydata)
            console.log('querydata---------------------') 
      
            if (querydata.length > 0)  {
                return {
                    validationError: true,
                    error: 'courses already exists !'
                }
            }
        }

       
       let statusStr = "INSERT into courses_category (name) values ('"+req.body.name+"') ";
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
        //     if (req.body.name) {
        //     let sport = req.body.name; 
        //     let result = sport.toLowerCase();
        //     console.log('resultresult');
        //     console.log(result);
        //     let query = (`SELECT LOWER(name) FROM courses_category WHERE name = '${result}'`); 
            
        //     let queryinfo =  await db.query(query);



        //     console.log('wwwwwwwwwwww');
        //     console.log(queryinfo);
            
        //     if (queryinfo.length>0) {
        //         return {
        //             validationError: true,
        //             error: 'courses category already exists !'
        //         }
        //     }
        // }


        let statusStr = "UPDATE courses_category SET name='" + req.body.name + "' WHERE id=" + req.body.id + "";

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
        let statusStr = "UPDATE courses_category SET status= 2  WHERE id=" + req.body.id + "";


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

const edit = async (req, res) => {
    try {
       
        const listStr = "SELECT * FROM courses_category where id ="+req.body.id+"";
        const [dataResult] = await db.query(listStr);
        
        if (dataResult.length > 0) {
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






module.exports = { list, insert, update,deletedata,edit }