import express, { Request , Response } from "express";
import { pool } from "..";
import { Driver } from "../types/datatypes";
import { title } from "process";
import validateDriver from "../middlewares/validateDriver";


const router = express(); 

router.post("/add", validateDriver,  async (req : Request, res : Response) => {
    try{ 
        const { 
            email, 
            first_name, 
            last_name, 
            middle_name, 
            date_of_birth, 
            sex, 
            driver_type, 
            license_number, 
            license_expiration_date,
        }
        = req.body as Driver
        

    const driver = await pool.query( 
        `INSERT INTO drivers (
        email, 
        first_name, 
        last_name, 
        middle_name, 
        date_of_birth, 
        sex, 
        driver_type, 
        license_number, 
        license_expiration_date) 
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,

        [ 
            email, 
            first_name, 
            last_name, 
            middle_name, 
            date_of_birth, 
            sex, 
            driver_type, 
            license_number, 
            license_expiration_date 
        ],
            
    )

    console.log(driver.rows)
    res.status(200).json({
        title : "Driver Added!", 
        message : `Driver ${last_name}, ${first_name} ${middle_name} has been added`,
        
    })

    return

    } catch (error) {
        if (error instanceof Error) {
        console.error("Error occurred:", error.message);
        res.status(500).json({ title: "Server Error", message: error.message });

        } else {
        console.error("Unexpected error occurred:", error);
        res.status(500).json({ title: "Server Error", message: "An unexpected error occurred." });
        }
    }

});

router.get("/get", async (req: Request, res: Response) => {

    try {
      console.log("Fetching drivers from the database...");

      const { rows: drivers } = await pool.query(
       `SELECT first_name, 
        last_name,
        middle_name, 
        email, 
        sex, 
        driver_type, 
        license_number, 
        license_expiration_date 
        FROM drivers`
      );
      console.log("Drivers fetched successfully:", drivers);
  
      // Send the drivers list as a response
      res.json(drivers);

    } catch (error) {
      const errorMessage = (error as Error).message;
      console.error("Error fetching drivers:", errorMessage); // Log the error for debugging
      res.status(500).json({ title: "Unknown Error", message: errorMessage });
    }
  });


  const asyncHandler = (fn: (req: Request, res: Response, next: express.NextFunction) => Promise<any>) => 
    (req: Request, res: Response, next: express.NextFunction) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };

  router.patch("/update", validateDriver, asyncHandler(async (req: Request, res: Response) => {
    const { id, ...updates } = req.body;

    if (!id) {
        return res.status(400).json({
            title: "Validation Error",
            message: "Driver ID is required to update the record."
        });
    }

    const fields = Object.keys(updates);
    const values = Object.values(updates);

    const setClause = fields.map((field, index) => `${field} = $${index + 1}`).join(", ");

    const query = 
    `UPDATE drivers SET ${ setClause }
     WHERE id = $${ fields.length + 1 } 
     RETURNING *`;

    const result = await pool.query(
        query, 
        [...values, id]);

    if (result.rowCount === 0) {
        return res.status(404).json({
            title: "Not Found",
            message: "Driver with the specified ID does not exist."
        });
    }

    const updatedDriver = result.rows[0];
    console.log("Driver updated successfully:", updatedDriver);

    res.status(200).json({
        title: "Driver Updated!",
        message: `Driver ${updatedDriver.last_name}, ${updatedDriver.first_name} has been updated successfully.`,
        driver: updatedDriver
    });
}));

router.delete("/delete", async (req : Request, res : Response) => {

    try{ 
        console.log("Fetching. . .");

        const driver = await pool.query(
            `DELETE FROM 
            drivers 
            WHERE 
            id = $1 
            RETURNING *`, 
            [req.body.id]
        );
        console.log("Driver deleted successfully:", driver);
    }
    catch(error){ 
        console.log("Error!")
    }
  });


  

export default router;