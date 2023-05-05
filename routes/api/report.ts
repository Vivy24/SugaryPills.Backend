import express, { Express, Request, Response } from 'express';
import { LifeStyleResult } from '../../models/type';
import { poolQuery } from '../../database/queries';
import { calculateReport } from '../../helpers/report';
const router = express.Router();

// @route GET /api/report
// @desc Generate the report based on the filter
// @access public
router.get("/", async (req: Request, res: Response) => {
    try {
        const filterRequest: LifeStyleResult = req.body.lifestyles;
        const filterIDs = await poolQuery.getArrayOfIDFromLifestyle(filterRequest);
        let result;
        if (filterIDs && filterIDs.length > 0) {
            result = await calculateReport(filterIDs);
        }

        res.status(200).json(result);

    }
    catch (error: any) {
        console.error(error);
        res.status(500).json("Server Error");
    }
})

export default router;
