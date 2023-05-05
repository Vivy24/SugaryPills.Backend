import { poolQuery } from "../database/queries";
import { FieldStats } from "../models/type";

export const calculateReport = async (filterIDs: Array<{ identificationid: number }>) => {
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
    };

    const urinationObj = await calculateFieldStat('urination', filterIDs)
    result.urination = urinationObj.symptomResult;
    result.totalCount += +urinationObj.totalCount;
    result.count += +result.urination.count;

    const thirstObj = await calculateFieldStat('thirst', filterIDs);
    result.thirst = thirstObj.symptomResult;
    result.totalCount += +thirstObj.totalCount;
    result.count += +result.thirst.count;

    const hungerObj = await calculateFieldStat('hunger', filterIDs);
    result.hunger = hungerObj.symptomResult;
    result.totalCount += +hungerObj.totalCount;
    result.count += +result.hunger.count;

    const fatigueObj = await calculateFieldStat('fatigue', filterIDs);
    result.fatigue = fatigueObj.symptomResult;
    result.totalCount += +fatigueObj.totalCount;
    result.count += +result.fatigue.count;

    const blurObj = await calculateFieldStat('blurredVision', filterIDs);
    result.blurredVision = blurObj.symptomResult;
    result.totalCount += +blurObj.totalCount;
    result.count += +result.blurredVision.count;

    const weakObj = await calculateFieldStat('weakHealing', filterIDs);
    result.weakHealing = weakObj.symptomResult;
    result.totalCount += +weakObj.totalCount;
    result.count += +result.weakHealing.count;

    const tinglingObj = await calculateFieldStat('tingling', filterIDs);
    result.tingling = tinglingObj.symptomResult;
    result.totalCount += +tinglingObj.totalCount;
    result.count += +result.tingling.count;

    const dryIthcySkinObj = await calculateFieldStat('dryIthcySkin', filterIDs);
    result.dryIthcySkin = dryIthcySkinObj.symptomResult;
    result.totalCount += +dryIthcySkinObj.totalCount;
    result.count += +result.dryIthcySkin.count;

    const weightChangeObj = await calculateFieldStat('weightChange', filterIDs);
    result.weightLoss = weightChangeObj.symptomResult;
    result.totalCount += +weightChangeObj.totalCount;
    result.count += +result.weightLoss.count;

    const moodChangeObj = await calculateFieldStat('moodChange', filterIDs);
    result.moodChanges = moodChangeObj.symptomResult;
    result.totalCount += +moodChangeObj.totalCount;
    result.count += +result.moodChanges.count;

    return result;
}

const calculateFieldStat = async (symptom: string, ids: Array<{ identificationid: number }>) => {
    let symptomResult: FieldStats = {
        count: 0,
        percentage: 0,
    };
    let count = 0;
    let totalCount = 0;

    let totalFromDatabase = await poolQuery.getTotalSymptomAllPeople(symptom);
    totalCount = Number(totalFromDatabase);

    for (const filterID of ids) {
        let filterCount = await poolQuery.getTotalSymptomFilteredPeople(symptom, filterID.identificationid)
        count += Number(filterCount);
    }
    symptomResult.count = Number(count);
    if (count == 0 && totalCount == 0) {
        symptomResult.percentage = 0;
    }
    else {
        symptomResult.percentage = Number(count / totalCount);

    }
    return {
        symptomResult: symptomResult,
        totalCount: totalCount
    };

}