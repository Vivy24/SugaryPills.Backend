import express, { Express, Request, Response } from "express";
import { LifeStyleResult } from "../../models/type";
import { poolQuery } from "../../database/queries";
import { calculateReport, calculateEmptyReport } from "../../helpers/report";
import { mapReportLifestyle } from "../../helpers/map";
import { pool } from "../../database/config";

const router = express.Router();

// @route GET /api/report
// @desc Generate the report based on the filter
// @access public
router.post("/", async (req: Request, res: Response) => {
  try {
    const filterRequest = await mapReportLifestyle(req.body);
    const filterIDs = await poolQuery.getArrayOfIDFromLifestyle(
      filterRequest.lifestyles as LifeStyleResult
    );
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
      totalCount: 0,
    };
    console.log(filterRequest.lifestyles);
    console.log(filterRequest.lifestyles.question1.length);
    if (
      filterRequest.lifestyles.question1.length == 0 &&
      !filterRequest.lifestyles.question2 &&
      !filterRequest.lifestyles.question3 &&
      filterRequest.lifestyles.question4.length == 0 &&
      filterRequest.lifestyles.question5.length == 0
    ) {
      result = await calculateEmptyReport();
    }

    if (filterIDs && filterIDs.length > 0) {
      result = await calculateReport(filterIDs);
    } else {
      result = await calculateEmptyReport();
    }

    res.status(200).json(result);
  } catch (error: any) {
    console.error(error);
    res.status(500).json("Server Error");
  }
});

export default router;
