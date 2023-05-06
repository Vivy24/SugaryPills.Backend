import express, { Express, Request, Response } from 'express';
import { LifeStyleResult, SymptomResult } from '../../models/type';
import { poolQuery } from "../../database/queries";
import { calculateRisk } from '../../helpers/risk';
import { mapLifeStyleResult } from '../../helpers/map';

const router = express.Router();

// @route GET /api/survey/result
// @desc get all the input as an array
// @access public
router.get("/", async (req: Request, res: Response) => {
    try {
        const listOfSurvey = await poolQuery.getAllSurvey();
        res.status(200).json(listOfSurvey);
    }
    catch (error) {
        console.error(error);
        res.status(500).json("Server Error");
    }
})

// @route POST /api/survey/result
// @desc Create the risk based on the input
// @access public
router.post("/", async (req: Request, res: Response) => {
    try {
        const ID = await poolQuery.createID(req.body.identification)

        // format symptom 
        const formattedSymtom: SymptomResult = {
            urination: req.body.symptoms.urination ? true : false,
            thirst: req.body.symptoms.thirst ? true : false,
            hunger: req.body.symptoms.hunger ? true : false,
            fatigue: req.body.symptoms.fatigue ? true : false,
            blurredVision: req.body.symptoms.blurredVision ? true : false,
            weakHealing: req.body.symptoms.weakHealing ? true : false,
            tingling: req.body.symptoms.tingling ? true : false,
            dryIthcySkin: req.body.symptoms.dryIthcySkin ? true : false,
            weightChange: req.body.symptoms.weightChange ? true : false,
            moodChange: req.body.symptoms.moodChange ? true : false
        }


        await poolQuery.createSymptomResult(formattedSymtom, ID as number);
        const formattedLifestyle = mapLifeStyleResult(req.body.lifestyle);

        await poolQuery.createLifestyleResult(formattedLifestyle, ID as number);
        const surveyResult = calculateRisk(formattedLifestyle, formattedSymtom);

        const inputSurveyAnswer = await poolQuery.getSurveyById(ID as number);
        res.status(200).json(
            {
                surveyInput: inputSurveyAnswer,
                surveyResult: surveyResult
            }
        );
    }
    catch (error: any) {
        console.error(error);
        res.status(500).json("Server Error");
    }
})


export default router;
