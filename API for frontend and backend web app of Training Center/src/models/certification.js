const db = require("../db");
const fs = require("fs");
const path = require("path");

const uploadDir = "public/uploads";

// const list = async (req, res) => {
//     try {
//         const listStr = "SELECT c.*,t.tag_name  FROM certification as c left join tag as t on t.id = c.tag where c.status = 1 ORDER BY c.id DESC";
//         const [dataResult] = await db.query(listStr); // Destructure the results

//         if (dataResult && dataResult.length > 0) {
//             console.log(`Query executed successfully, Row count: ${dataResult.length}`);
//             return dataResult; // Assuming that the result of the query is an array of rows
//         } else {
//             console.log('No rows found.');
//             return []; // Return an empty array if no results are found
//         }

//     } catch (err) {
//         console.error("Error executing query:", err);
//         return []; // Return an empty array on error
//     }
// };

const list = async (req, res) => {
  try {
    const listStr = `
            SELECT c.*, t.tag_name, i.image_name
            FROM certification AS c
            LEFT JOIN tag AS t ON t.id = c.tag
            LEFT JOIN certificationimg AS i ON i.certification_id = c.id
            WHERE c.status = 1
            ORDER BY c.id DESC
        `;
    const [dataResult] = await db.query(listStr); // Destructure the results
    if (dataResult && dataResult.length > 0) {
      console.log(
        `Query executed successfully, Row count: ${dataResult.length}`
      );

      // Organize data into certifications with an array of images
      const certifications = [];

      // Create a map to track certifications by ID
      const certificationMap = new Map();

      for (const row of dataResult) {
        const certificationId = row.id;

        // If certification not added to certifications array, add it

        console.log(certificationId);
        console.log("certificationId..............");
        if (!certificationMap.has(certificationId)) {
          const certification = {
            id: row.id,
            template_name: row.template_name,
            description: row.description,
            // Add other certification properties here
            tag_name: row.tag_name,
            images: [], // Array to store images
          };
          certifications.push(certification);
          certificationMap.set(certificationId, certification);
        }

        // Check if the row has an image (img_url is not null)
        if (row.image_name) {
          // Add the image to the certification's images array
          certificationMap.get(certificationId).images.push(row.image_name);
        }
      }
      console.log("cerfication", certifications);

      return certifications;
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
      "SELECT * FROM certification where id = " +
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
    // Prepare the directory
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    // Process multiple images
    let imagesFilenames = [];

    console.log("Received files:------------------------", req.files.images);
    if (req.files && req.files.images) {
      if (!Array.isArray(req.files.images)) {
        req.files.images = [req.files.images];
      }

      for (const image of req.files.images) {
        let filename = image.name;
        filename = filename.replace(/(\.\.[\/\\])+/g, "");
        const imagePath = path.join(uploadDir, filename);
        await image.mv(imagePath);
        imagesFilenames.push(filename);
      }
    }

    let statusStr = `INSERT INTO certification (template_name, description, tag, created_at) 
                         VALUES (?, ?, ?, now())`;

    const template_name = req.body.template_name || null;
    const description = req.body.description || null;
    const tags = req.body.tag || null;

    // Execute your query
    const result = await db.query(statusStr, [
      template_name,
      description,
      tags,
    ]);
    const lastInsertId = result[0].insertId;

    // Insert images into certificationimg
    for (const filename of imagesFilenames) {
      let imgStatusStr = `INSERT INTO certificationimg (certification_id, image_name) VALUES (?, ?)`;
      const imgInsertResult = await db.query(imgStatusStr, [
        lastInsertId,
        filename,
      ]);
      console.log("Image insert result for", filename, ":", imgInsertResult); // Debug log
    }

    return true;
  } catch (err) {
    console.error("Error in insert:", err);
    return false;
  }
};

const update = async (req, res) => {
  try {
    // Check if there are files to be updated and handle them
    const imagesFilename = req.files?.images?.name.replace(
      /(\.\.[\/\\])+/g,
      ""
    );
    const imagesPath = imagesFilename && path.join(uploadDir, imagesFilename);
    if (imagesPath) {
      await req.files.images.mv(imagesPath);
    }

    // Prepare the update parameters and the fields to be updated
    const { template_name, tag, description, id } = req.body;
    const toUpdate = {
      template_name,
      tag,
      description,
      ...(imagesFilename && { images: imagesFilename }),
    };
    const updateFields = Object.entries(toUpdate)
      .filter(([, value]) => value !== undefined)
      .map(([key, value]) => `${key} = ?`);

    // If there's nothing to update, throw an error
    if (updateFields.length === 0) {
      throw new Error("No fields to update");
    }

    // Create the update string
    const updateStr = `UPDATE certification SET ${updateFields.join(
      ", "
    )}, updated_at = now() WHERE id = ?`;

    // Execute the update query with all parameters except 'id'
    const params = [
      ...Object.values(toUpdate).filter((value) => value !== undefined),
      id,
    ];
    await db.query(updateStr, params);

    return true;
  } catch (err) {
    console.error("Error during record update:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

const deletedata = async (req, res) => {
  try {
    let statusStr =
      "UPDATE certification SET status= 2  WHERE id=" + req.body.id + "";

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

module.exports = { list, insert, update, deletedata, edit };
