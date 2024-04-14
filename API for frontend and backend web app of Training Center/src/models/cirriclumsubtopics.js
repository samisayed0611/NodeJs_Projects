const db = require('../db');
const fs = require('fs');
const path = require('path');
        
const uploadDir = 'public/uploads';



const list = async (req, res) => {
    try {
        const listStr = "SELECT cs.*,i.icon FROM cirriclum_sub_topics as cs left join icon as i on i.id = cs.icon where cs.status = 1 ORDER BY cs.id DESC";
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
        const listStr = "SELECT * FROM cirriclum_sub_topics where id = "+req.body.id+" and status =1 ORDER BY id DESC";
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
        // Prepare the statement

        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }
        
        // Process the syllabus file
        let iconFilename;
        if (req.files && req.files.icon) {
            iconFilename = req.files.icon.name;
           iconFilename = iconFilename.replace(/(\.\.[\/\\])+/g, '');
           const iconPath = path.join(uploadDir, iconFilename);
            
            
            await req.files.icon.mv(iconPath);
        }
        let statusStr = `INSERT INTO cirriclum_sub_topics (name, description, duration, durationin,icon, created_at) 
                         VALUES (?, ?, ?, ?,?, now())`;

        // Replace undefined with null
        const name = req.body.name || null;
        const description = req.body.description || null;
        const duration = req.body.duration || null;
        const durationin = req.body.durationin || null;
        const icon = iconFilename || null
    
        // Execute your query with the checked values
        await db.query(statusStr, [
            name,
            description,
            duration,
            durationin,
            icon,
            
        ]);

        return true;
    } catch (err) {
        console.error("Error in insert:", err);
        return false;
    }
};





const update = async (req, res) => {
    try {
        let iconFilename;
        if (req.files && req.files.icon) {
            iconFilename = req.files.icon.name;
           iconFilename = iconFilename.replace(/(\.\.[\/\\])+/g, '');
           const iconPath = path.join(uploadDir, iconFilename);
            
            
            await req.files.icon.mv(iconPath);
        }
        
        let updateStr = `UPDATE cirriclum_sub_topics SET 
        name = ?,
        duration = ?, 
        durationin = ?,
        description = ?,
        icon = ?,
        updated_at = now()
        WHERE id = ?`;
        
        // Execute your query with the new data
        await db.query(updateStr, [
            req.body.name,
            req.body.duration,
            req.body.durationin,
            req.body.description,
            
            
            iconFilename ,
           
           
            req.body.id 
        ]);

       return true;
    } catch (err) {
        console.error("Error during record update:", err);
        res.status(500).json({
            success: false,
            message: "Error during record update."
        });
    }
};




const deletedata = async (req, res) => {
    try {
        let statusStr = "UPDATE cirriclum_sub_topics SET status= 2  WHERE id=" + req.body.id + "";


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