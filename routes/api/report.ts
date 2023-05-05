import express, { Express, Request, Response } from 'express';
const router = express.Router();

// @route GET /api/report
// @desc Generate the report based on the filter
// @access public
router.get("/", async (req: Request, res: Response) => {
    try {
        // 
    }
    catch (error: any) {
        console.error(error);
        res.status(500).json("Server Error");
    }
})

export default router;
