import express, { Express, Request, Response } from 'express';
import { LifeStyleResult } from '../../models/type';
import { poolQuery } from '../../database/queries';
import { calculateReport } from '../../helpers/report';
import { mapReportLifestyle } from '../../helpers/map';

const router = express.Router();

// @route GET /api/report
// @desc Generate the report based on the filter
// @access public
router.post("/", async (req: Request, res: Response) => {
    try {
        const filterRequest = await mapReportLifestyle(req.body);
        const filterIDs = await poolQuery.getArrayOfIDFromLifestyle(filterRequest.lifestyles as LifeStyleResult);
        let result = {
            urination: {
                count: 0,
                percentage: 0,
            },
            thirst: {
                count: 0,
                percentage: 0,
            },
            hunger: {
                count: 0,
                percentage: 0,
            },
            fatigue: {
                count: 0,
                percentage: 0,
            },
            blurredVision: {
                count: 0,
                percentage: 0,
            },
            weakHealing: {
                count: 0,
                percentage: 0,
            },
            tingling: {
                count: 0,
                percentage: 0,
            },
            dryIthcySkin: {
                count: 0,
                percentage: 0,
            },
            weightLoss: {
                count: 0,
                percentage: 0,
            },
            moodChanges: {
                count: 0,
                percentage: 0,
            },
            count: 0,
            totalCount: 0
        }
        if (filterIDs && filterIDs.length > 0) {
            result = await calculateReport(filterIDs);
        }
        else {
            result.totalCount += Number(await poolQuery.getTotalSymptomAllPeople('urination'));
            result.totalCount += Number(await poolQuery.getTotalSymptomAllPeople('thirst'));
            result.totalCount += Number(await poolQuery.getTotalSymptomAllPeople('hunger'));
            result.totalCount += Number(await poolQuery.getTotalSymptomAllPeople('fatigue'));
            result.totalCount += Number(await poolQuery.getTotalSymptomAllPeople('blurredVision'));
            result.totalCount += Number(await poolQuery.getTotalSymptomAllPeople('weakHealing'));
            result.totalCount += Number(await poolQuery.getTotalSymptomAllPeople('tingling'));
            result.totalCount += Number(await poolQuery.getTotalSymptomAllPeople('dryIthcySkin'));
            result.totalCount += Number(await poolQuery.getTotalSymptomAllPeople('weightChange'));
            result.totalCount += Number(await poolQuery.getTotalSymptomAllPeople('moodChange'));
        }
        res.status(200).json(result);

    }
    catch (error: any) {
        console.error(error);
        res.status(500).json("Server Error");
    }
})

export default router;
