const db = require('../db');
const fs = require('fs');
        const path = require('path');
        
        const uploadDir = 'public/uploads';



const list = async (req, res) => {
    try {
        const listStr = "SELECT c.*,st.name FROM cirriclum as c left join cirriclum_sub_topics as st on st.id = c.sub_topics where c.status = 1 ORDER BY c.id DESC";
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
        const listStr = "SELECT * FROM cirriclum where id = "+req.body.id+" and status =1 ORDER BY id DESC";
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
        let statusStr = `INSERT INTO cirriclum (topics, description, duration, durationin, sub_topics, created_at) 
                         VALUES (?, ?, ?, ?, ?, now())`;

        // Replace undefined with null
        const topics = req.body.topics || null;
        const description = req.body.description || null;
        const duration = req.body.duration || null;
        const durationin = req.body.durationin || null;
        const sub_topics = req.body.sub_topics || null;

        // Execute your query with the checked values
        await db.query(statusStr, [
            topics,
            description,
            duration,
            durationin,
            sub_topics
        ]);

        return true;
    } catch (err) {
        console.error("Error in insert:", err);
        return false;
    }
};





const update = async (req, res) => {
    try {
        
let updateStr = `UPDATE cirriclum SET 
                         duration = ?, 
                         durationin =?,
                         description = ?,
                         sub_topics = ?, 
                         topics = ?, 

                         updated_at = now()
                         WHERE id = ?`; // Assuming 'id' is the column you want to match against

        // Execute your query with the new data
        await db.query(updateStr, [
            req.body.duration,
            req.body.durationin,
            req.body.description,
            req.body.sub_topics,
            req.body.topics,
            
           
           
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
        let statusStr = "UPDATE cirriclum SET status= 2  WHERE id=" + req.body.id + "";
        const update = async (req, res) => {
            try {
                // Initialize parts of the update query
                let updateParts = [];
                let queryParams = [];
        
                // Dynamically add fields to the query if they exist in req.body
                if (req.body.duration) {
                    updateParts.push("duration = ?");
                    queryParams.push(req.body.duration);
                }
                if (req.body.durationin) {
                    updateParts.push("durationin = ?");
                    queryParams.push(req.body.durationin);
                }
                if (req.body.description) {
                    updateParts.push("description = ?");
                    queryParams.push(req.body.description);
                }
                if (req.body.sub_topics) {
                    updateParts.push("sub_topics = ?");
                    queryParams.push(req.body.sub_topics);
                }
                if (req.body.topics) {
                    updateParts.push("topics = ?");
                    queryParams.push(req.body.topics);
                }
        
                // Ensure there's at least one field to update
                if (updateParts.length === 0) {
                    return res.status(400).json({
                        success: false,
                        message: "No updatable fields provided."
                    });
                }
        
                // Add the updated_at field and WHERE clause
                updateParts.push("updated_at = now()");
                let updateStr = `UPDATE cirriclum SET ${updateParts.join(", ")} WHERE id = ?`;
        
                // Add the id to the queryParams
                queryParams.push(req.body.id);
        
                // Execute your query with the dynamically constructed data
                await db.query(updateStr, queryParams);
        
                return res.status(200).json({
                    success: true,
                    message: "Record updated successfully."
                });
            } catch (err) {
                console.error("Error during record update:", err);
                res.status(500).json({
                    success: false,
                    message: "Error during record update."
                });
            }
        };
        

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