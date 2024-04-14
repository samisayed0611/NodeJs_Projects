const db = require('../db');
const fs = require('fs');
        const path = require('path');
        
        const uploadDir = 'public/uploads';



const list = async (req, res) => {
    try {
        const listStr = "SELECT t.*,c.subtitle FROM testimonial as t left join courses as c on c.id = t.courses  where t.status = 1 ORDER BY t.id DESC";
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
        const listStr = "SELECT * FROM testimonial where id = "+req.body.id+" and status =1 ORDER BY id DESC";
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
      
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }
        
        
        let studentimgFilename;
        if (req.files && req.files.student_img) {
            studentimgFilename = req.files.student_img.name;
           studentimgFilename = studentimgFilename.replace(/(\.\.[\/\\])+/g, '');
           const studentimgPath = path.join(uploadDir, studentimgFilename);
            
            
            await req.files.student_img.mv(studentimgPath);
        }
       

        // Prepare your SQL statement with placeholders for the filenames courses 
        let statusStr = `INSERT INTO testimonial (description, student_name, courses,student_img,created_at) 
                         VALUES (?, ?, ?, ?, now())`;
                         
        // Execute your query with the filenames
        await db.query(statusStr, [
            req.body.description,
            req.body.student_name,
            req.body.courses,
           
            studentimgFilename, // The filename for syllabus
           
            
            
        ]);

        return true;
    } catch (err) {
        console.log("err.......");
        console.log(err);
        return false;
    }
};




const update = async (req, res) => {
    try {
        const uploadDir = 'images/profile/';

        // Ensure the upload directory exists
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }
        
        // Process the syllabus file
        let studentimgFilename;
        if (req.files && req.files.student_img) {
            studentimgFilename = req.files.student_img.name;
           studentimgFilename = studentimgFilename.replace(/(\.\.[\/\\])+/g, '');
           const studentimgPath = path.join(uploadDir, studentimgFilename);
            
            
            await req.files.student_img.mv(studentimgPath);
        }

        

        // Prepare your SQL statement with placeholders for the filenames and other fields to be updated
        let updateStr = `UPDATE testimonial SET 
                         description = ?, 
                         student_name = ?, 
                         courses = ?, 

                         updated_at = now()
                         WHERE id = ?`; // Assuming 'id' is the column you want to match against

        // Execute your query with the new data
        await db.query(updateStr, [
            req.body.description,
            req.body.student_name,
            req.body.courses,
            
            studentimgFilename, 
           
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
        let statusStr = "UPDATE testimonial SET status= 2  WHERE id=" + req.body.id + "";


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