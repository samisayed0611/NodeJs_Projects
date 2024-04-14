const db = require("../db");
const fs = require("fs");
const path = require("path");

var uploadDir = "public/uploads";

const list = async (req, res) => {
  try {
    let listStr =
      "SELECT c.*,cc.name as catname,sc.name as subcatname , jp.job_profile as job_ProfileName , cer.template_name as  templateName , cer.description as cerDescription , tg.tag_name as tagName , cer.images as cerImage FROM courses as c left join courses_category as cc on cc.id = c.cat_id left join course_sub_category as sc on sc.id = c.subcat_id left join job_profile as jp on jp.id = c.job_profile  left join certification as cer on cer.id = c.certificationId left join tag as tg on tg.id = cer.tag  where c.status = 1 ";
    
      if (req.query.id&&req.query.id!==""&&req.query.id!=="undefined") {
        listStr=listStr+` and c.id=${req.query.id}`
      }

      listStr=listStr+" ORDER BY c.id DESC "
    const [dataResult] = await db.query(listStr); // Destructure the results

    if (dataResult && dataResult.length > 0) {
      console.log(
        `Query executed successfully, Row count: ${dataResult.length}`
      );
      return dataResult; // Assuming that the result of the query is an array of rows
    } else {
      console.log("No rows found.");
      return []; // Return an empty array if no results are found
    }
  } catch (err) {
    console.error("Error executing query:", err);
    return []; // Return an empty array on error
  }
};

const edit = async (req, res) => {
  try {
    const listStr =
      "SELECT * FROM courses where id = " +
      req.body.id +
      " and status =1 ORDER BY id DESC";
    const [dataResult] = await db.query(listStr); // Destructure the results

    if (dataResult && dataResult.length > 0) {
      console.log(
        `Query executed successfully, Row count: ${dataResult.length}`
      );
      return dataResult; // Assuming that the result of the query is an array of rows
    } else {
      console.log("No rows found.");
      return []; // Return an empty array if no results are found
    }
  } catch (err) {
    console.error("Error executing query:", err);
    return []; // Return an empty array on error
  }
};

const insert = async (req, res) => {
  try {
    // Define the directory where files will be saved

    // Ensure the upload directory exists
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    // Process the syllabus file
    let syllabusFilename;
    if (req.files && req.files.syllabus) {
      syllabusFilename = req.files.syllabus.name;

      // Sanitize the file name to prevent directory traversal attacks
      syllabusFilename = syllabusFilename.replace(/(\.\.[\/\\])+/g, "");

      // Define the path where the file will be saved
      const syllabusPath = path.join(uploadDir, syllabusFilename);

      // Move the file to the upload directory
      await req.files.syllabus.mv(syllabusPath);
    }
    // Process the broucher file
    let broucherFilename;
    if (req.files && req.files.broucher) {
      broucherFilename = req.files.broucher.name;
      // Define the path where the file will be saved
      const broucherPath = path.join(uploadDir, broucherFilename);
      // Move the file to the upload directory
      await req.files.broucher.mv(broucherPath);
    }

    // Prepare your SQL statement with placeholders for the filenames
    let statusStr = `INSERT INTO courses (cat_id, subcat_id, duration, placement, Internship, syllabus, broucher, featured, excerpt, description, subtitle, job_profile, durationIn , certificationId ,icon_id,cerficanTitle,icon, created_at) 
                         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?,?,?,?,? ,now())`;

    // Execute your query with the filenames
    await db.query(statusStr, [
      req.body.cat_id,
      req.body.subcat_id,
      req.body.duration,
      req.body.placement,
      req.body.Internship,
      syllabusFilename, // The filename for syllabus
      broucherFilename, // The filename for broucher
      req.body.featured,
      req.body.excerpt,
      req.body.description,
      req.body.subtitle,
      req.body.job_profile,
      req.body.durationIn,
      req.body.certificationId,
      req.body.icon_id,
      req.body.cerficanTitle,
      req.body.icon,
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
    const uploadDir = "images/profile/";

    // Ensure the upload directory exists
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    // Process the syllabus file
    let syllabusFilename = req.body.syllabus; // Keep the old filename by default
    if (req.files && req.files.syllabus) {
      syllabusFilename = req.files.syllabus.name;
      syllabusFilename = syllabusFilename.replace(/(\.\.[\/\\])+/g, ""); // Sanitize the file name
      const syllabusPath = path.join(uploadDir, syllabusFilename);
      await req.files.syllabus.mv(syllabusPath);
    }

    // Process the broucher file
    let broucherFilename = req.body.broucher; // Keep the old filename by default
    if (req.files && req.files.broucher) {
      broucherFilename = req.files.broucher.name;
      broucherFilename = broucherFilename.replace(/(\.\.[\/\\])+/g, ""); // Sanitize the file name
      const broucherPath = path.join(uploadDir, broucherFilename);
      await req.files.broucher.mv(broucherPath);
    }

    // Prepare your SQL statement with placeholders for the filenames and other fields to be updated
    let updateStr = `UPDATE courses SET 
                         cat_id = ?, 
                         subcat_id = ?, 
                         duration = ?, 
                         placement = ?, 
                         Internship = ?, 
                         syllabus = ?, 
                         broucher = ?, 
                         featured = ?, 
                         excerpt = ?, 
                         description = ?, 
                         subtitle = ?, 
                         job_profile = ?, 
                         cerficanTitle =?,
                         updated_at = now()
                         WHERE id = ?`; // Assuming 'id' is the column you want to match against

    // Execute your query with the new data
    await db.query(updateStr, [
      req.body.cat_id,
      req.body.subcat_id,
      req.body.duration,
      req.body.placement,
      req.body.Internship,
      syllabusFilename, // The filename for syllabus, or the old filename if not updated
      broucherFilename, // The filename for broucher, or the old filename if not updated
      req.body.featured,
      req.body.excerpt,
      req.body.description,
      req.body.subtitle,
      req.body.job_profile,
      req.body.cerficanTitle,
      req.body.id, // The ID of the row to update
    ]);

    return true;
  } catch (err) {
    console.error("Error during record update:", err);
    res.status(500).json({
      success: false,
      message: "Error during record update.",
    });
  }
};

const deletedata = async (req, res) => {
  try {
    let statusStr =
      "UPDATE courses SET status= 2  WHERE id=" + req.body.id + "";

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


const Courslistbytag = async (req, res) => {
  try {
    const listStr =
      "SELECT * FROM courses where id = " +
      req.body.id +
      " and status =1 ORDER BY id DESC";
    const [dataResult] = await db.query(listStr); // Destructure the results

    if (dataResult && dataResult.length > 0) {
      console.log(
        `Query executed successfully, Row count: ${dataResult.length}`
      );
      return dataResult; // Assuming that the result of the query is an array of rows
    } else {
      console.log("No rows found.");
      return []; // Return an empty array if no results are found
    }
  } catch (err) {
    console.error("Error executing query:", err);
    return []; // Return an empty array on error
  }
};


module.exports = { list, insert, update, deletedata, edit,Courslistbytag };
