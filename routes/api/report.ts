import express, { Express, Request, Response } from "express";
import { LifeStyleResult } from "../../models/type";
import { poolQuery } from "../../database/queries";
import { calculateReport } from "../../helpers/report";
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
    console.log(filterIDs);
    if (filterIDs && filterIDs.length > 0) {
      result = await calculateReport(filterIDs);
    } else {
      const totalRecords = Number(
        await poolQuery.getTotalRecordsInSymptomResults()
      );

      console.log(totalRecords);
      const urinationTrueRecords = Number(
        await poolQuery.getTotalSymptomAllPeople("urination")
      );
      result.urination.count = urinationTrueRecords;
      result.urination.percentage = Number(
        result.urination.count / totalRecords
      );
      result.count += urinationTrueRecords;

      const thirstTrueRecords = Number(
        await poolQuery.getTotalSymptomAllPeople("thirst")
      );
      result.thirst.count = thirstTrueRecords;
      result.thirst.percentage = Number(result.thirst.count / totalRecords);
      result.count += thirstTrueRecords;

      const hungerTrueRecords = Number(
        await poolQuery.getTotalSymptomAllPeople("hunger")
      );
      result.hunger.count = hungerTrueRecords;
      result.hunger.percentage = Number(result.hunger.count / totalRecords);
      result.count += hungerTrueRecords;

      const fatigueTrueRecords = Number(
        await poolQuery.getTotalSymptomAllPeople("fatigue")
      );
      result.fatigue.count = fatigueTrueRecords;
      result.fatigue.percentage = Number(result.fatigue.count / totalRecords);
      result.count += fatigueTrueRecords;

      const blurredVisionTrueRecords = Number(
        await poolQuery.getTotalSymptomAllPeople("blurredVision")
      );
      result.blurredVision.count = blurredVisionTrueRecords;
      result.blurredVision.percentage = Number(
        result.blurredVision.count / totalRecords
      );
      result.count += blurredVisionTrueRecords;

      const weakHealingTrueRecords = Number(
        await poolQuery.getTotalSymptomAllPeople("weakHealing")
      );
      result.weakHealing.count = weakHealingTrueRecords;
      result.weakHealing.percentage = Number(
        result.weakHealing.count / totalRecords
      );
      result.count += weakHealingTrueRecords;

      const tinglingTrueRecords = Number(
        await poolQuery.getTotalSymptomAllPeople("tingling")
      );
      result.tingling.count = tinglingTrueRecords;
      result.tingling.percentage = Number(result.tingling.count / totalRecords);
      result.count += tinglingTrueRecords;

      const dryIthcySkinTrueRecords = Number(
        await poolQuery.getTotalSymptomAllPeople("dryIthcySkin")
      );
      result.dryIthcySkin.count = dryIthcySkinTrueRecords;
      result.dryIthcySkin.percentage = Number(
        result.dryIthcySkin.count / totalRecords
      );
      result.count += dryIthcySkinTrueRecords;

      const weightChangeTrueRecords = Number(
        await poolQuery.getTotalSymptomAllPeople("weightChange")
      );
      result.weightLoss.count = weightChangeTrueRecords;
      result.weightLoss.percentage = Number(
        result.weightLoss.count / totalRecords
      );
      result.count += weightChangeTrueRecords;

      const moodChangeTrueRecords = Number(
        await poolQuery.getTotalSymptomAllPeople("moodChange")
      );
      result.moodChanges.count = moodChangeTrueRecords;
      result.moodChanges.percentage = Number(
        result.moodChanges.count / totalRecords
      );
      result.count += moodChangeTrueRecords;
      result.totalCount = totalRecords * 10;
    }
    res.status(200).json(result);
  } catch (error: any) {
    console.error(error);
    res.status(500).json("Server Error");
  }
});

export default router;
