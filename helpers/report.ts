import { poolQuery } from "../database/queries";
import { FieldStats } from "../models/type";

export const calculateEmptyReport = async () => {
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
  const totalRecords = Number(
    await poolQuery.getTotalRecordsInSymptomResults()
  );
  const urinationTrueRecords = Number(
    await poolQuery.getTotalSymptomAllPeople("urination")
  );
  result.urination.count = urinationTrueRecords;
  result.urination.percentage = Number(result.urination.count / totalRecords);

  const thirstTrueRecords = Number(
    await poolQuery.getTotalSymptomAllPeople("thirst")
  );
  result.thirst.count = thirstTrueRecords;
  result.thirst.percentage = Number(result.thirst.count / totalRecords);

  const hungerTrueRecords = Number(
    await poolQuery.getTotalSymptomAllPeople("hunger")
  );
  result.hunger.count = hungerTrueRecords;
  result.hunger.percentage = Number(result.hunger.count / totalRecords);

  const fatigueTrueRecords = Number(
    await poolQuery.getTotalSymptomAllPeople("fatigue")
  );
  result.fatigue.count = fatigueTrueRecords;
  result.fatigue.percentage = Number(result.fatigue.count / totalRecords);

  const blurredVisionTrueRecords = Number(
    await poolQuery.getTotalSymptomAllPeople("blurred")
  );
  result.blurredVision.count = blurredVisionTrueRecords;
  result.blurredVision.percentage = Number(
    result.blurredVision.count / totalRecords
  );

  const weakHealingTrueRecords = Number(
    await poolQuery.getTotalSymptomAllPeople("slowhealing")
  );
  result.weakHealing.count = weakHealingTrueRecords;
  result.weakHealing.percentage = Number(
    result.weakHealing.count / totalRecords
  );

  const tinglingTrueRecords = Number(
    await poolQuery.getTotalSymptomAllPeople("tingling")
  );
  result.tingling.count = tinglingTrueRecords;
  result.tingling.percentage = Number(result.tingling.count / totalRecords);

  const dryIthcySkinTrueRecords = Number(
    await poolQuery.getTotalSymptomAllPeople("dry")
  );
  result.dryIthcySkin.count = dryIthcySkinTrueRecords;
  result.dryIthcySkin.percentage = Number(
    result.dryIthcySkin.count / totalRecords
  );

  const weightChangeTrueRecords = Number(
    await poolQuery.getTotalSymptomAllPeople("weightChange")
  );
  result.weightLoss.count = weightChangeTrueRecords;
  result.weightLoss.percentage = Number(result.weightLoss.count / totalRecords);

  const moodChangeTrueRecords = Number(
    await poolQuery.getTotalSymptomAllPeople("moodChange")
  );
  result.moodChanges.count = moodChangeTrueRecords;
  result.moodChanges.percentage = Number(
    result.moodChanges.count / totalRecords
  );
  result.count = totalRecords;
  result.totalCount = totalRecords;

  return result;
};

export const calculateReport = async (
  filterIDs: Array<{ identificationid: number }>
) => {
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

  const urinationObj = await calculateFieldStat("urination", filterIDs);
  result.urination = urinationObj.symptomResult;

  const thirstObj = await calculateFieldStat("thirst", filterIDs);
  result.thirst = thirstObj.symptomResult;

  const hungerObj = await calculateFieldStat("hunger", filterIDs);
  result.hunger = hungerObj.symptomResult;

  const fatigueObj = await calculateFieldStat("fatigue", filterIDs);
  result.fatigue = fatigueObj.symptomResult;

  const blurObj = await calculateFieldStat("blurred", filterIDs);
  result.blurredVision = blurObj.symptomResult;

  const weakObj = await calculateFieldStat("slowhealing", filterIDs);
  result.weakHealing = weakObj.symptomResult;

  const tinglingObj = await calculateFieldStat("tingling", filterIDs);
  result.tingling = tinglingObj.symptomResult;

  const dryIthcySkinObj = await calculateFieldStat("dry", filterIDs);
  result.dryIthcySkin = dryIthcySkinObj.symptomResult;

  const weightChangeObj = await calculateFieldStat("weightChange", filterIDs);
  result.weightLoss = weightChangeObj.symptomResult;

  const moodChangeObj = await calculateFieldStat("moodChange", filterIDs);
  result.moodChanges = moodChangeObj.symptomResult;

  result.totalCount = await Number(
    await poolQuery.getTotalRecordsInSymptomResults()
  );
  result.count = filterIDs.length;

  return result;
};

const calculateFieldStat = async (
  symptom: string,
  ids: Array<{ identificationid: number }>
) => {
  let symptomResult: FieldStats = {
    count: 0,
    percentage: 0,
  };
  let count = 0;
  let totalCount = 0;

  let totalFromDatabase = await poolQuery.getTotalSymptomAllPeople(symptom);
  totalCount = Number(totalFromDatabase);

  for (const filterID of ids) {
    let filterCount = await poolQuery.getTotalSymptomFilteredPeople(
      symptom,
      filterID.identificationid
    );
    count += Number(filterCount);
  }
  symptomResult.count = Number(count);
  if (count == 0 && totalCount == 0) {
    symptomResult.percentage = 0;
  } else {
    symptomResult.percentage = Number(count / totalCount);
  }
  return {
    symptomResult: symptomResult,
    totalCount: totalCount,
  };
};
