import {
  Identification,
  LifeStyleResult,
  SurveyAnswer,
  SymptomResult,
} from "../models/type";
import { pool } from "./config";

export module poolQuery {
  export const getSurveyById = async (id: number) => {
    let result: SurveyAnswer | undefined;
    await pool
      .query(
        "SELECT * FROM identifications JOIN symptomresults ON symptomresults.identificationid = identifications.id JOIN lifestyleresults ON lifestyleresults.identificationid = identifications.id WHERE identifications.id = $1",
        [id]
      )
      .then((res: any) => {
        const data = res.rows[0];
        result = {
          identification: {
            gender: data.gender,
            age: data.age,
            height: data.height,
            weight: data.weight,
            email: data.email,
            familyHasDiabetes: data.familyhasdiabetes,
            isPregnant: data.ispregnant,
          },
          symptoms: {
            urination: data.urination,
            thirst: data.thirst,
            hunger: data.hunger,
            fatigue: data.fatigue,
            blurred: data.blurredvision,
            slowhealing: data.weakhealing,
            tingling: data.tingling,
            dry: data.dryithcyskin,
            weightChange: data.weightchange,
            moodChanges: data.moodchange,
          },
          lifestyle: {
            question1: {
              bread: data.question1.includes("bread"),
              sugar: data.question1.includes("sugar"),
              salt: data.question1.includes("salt"),
              flour: data.question1.includes("flour"),
            },
            question2: data.question2,
            question3: data.question3,
            question4: {
              airPollution: data.question4.includes("air pollution"),
              waterPollution: data.question4.includes(
                "lack of clean drinking water"
              ),
              toxins: data.question4.includes("exposure to toxins"),
            },
            question5: {
              trauma: data.question5.includes("historical trauma"),
              finances: data.question5.includes("financial issue"),
              other: data.question5.includes("other reasons"),
            },
          },
        };
      })
      .catch((e: Error) => {
        throw e;
      });
    return result;
  };

  export const createID = async (inputID: Identification) => {
    const {
      age,
      height,
      weight,
      gender,
      email,
      familyHasDiabetes,
      isPregnant,
    } = inputID;
    let resultID: number | undefined;
    await pool
      .query(
        "INSERT INTO identifications (age, height, weight, gender, email, familyHasDiabetes, isPregnant) VALUES ($1,$2,$3,$4, $5, $6, $7) RETURNING id ",
        [age, height, weight, gender, email, familyHasDiabetes, isPregnant]
      )
      .then((res: any) => {
        resultID = res.rows[0].id;
      })
      .catch((e: Error) => {
        throw e;
      });

    return resultID;
  };

  export const getTotalRecordsInSymptomResults = async () => {
    let result: number | undefined;
    await pool
      .query("SELECT COUNT (*) FROM symptomresults")
      .then((res: any) => {
        result = res.rows[0].count;
      })
      .catch((e: Error) => {
        throw e;
      });

    return result;
  };
  // Symptom Queries
  export const getSymptomResultBasedOnID = async (identificationID: number) => {
    let result: SymptomResult | undefined;
    await pool
      .query("SELECT * FROM symptomresults where identificationid = $1", [
        identificationID,
      ])
      .then((res: any) => (result = res.rows))
      .catch((e: Error) => {
        throw e;
      });
    return result;
  };

  export const createSymptomResult = async (
    inputSymptom: SymptomResult,
    identificationID: number
  ) => {
    const {
      urination,
      thirst,
      hunger,
      fatigue,
      blurredVision,
      weakHealing,
      tingling,
      dryIthcySkin,
      weightChange,
      moodChange,
    } = inputSymptom;

    await pool
      .query(
        "INSERT INTO symptomresults (identificationID, urination, thirst, hunger, fatigue, blurredVision, weakHealing, tingling, dryIthcySkin, weightChange, moodChange) VALUES ($1,$2,$3,$4, $5, $6, $7, $8, $9, $10, $11) RETURNING id ",
        [
          identificationID,
          urination,
          thirst,
          hunger,
          fatigue,
          blurredVision,
          weakHealing,
          tingling,
          dryIthcySkin,
          weightChange,
          moodChange,
        ]
      )
      .then((res: any) => {
        res = res.rows[0].id;
      })
      .catch((e: Error) => {
        throw e;
      });
  };

  export const getTotalSymptomAllPeople = async (symptom: string) => {
    let result: number | undefined;
    let query = `SELECT count(CASE WHEN ${symptom} IS TRUE THEN 1 END) FROM symptomresults`;

    await pool
      .query(query)
      .then((res: any) => (result = res.rows[0].count))
      .catch((e: Error) => {
        throw e;
      });
    return result;
  };

  export const getTotalSymptomFilteredPeople = async (
    symptom: string,
    identificationID: number
  ) => {
    let result: number | undefined;
    let query = `SELECT count(CASE WHEN ${symptom} IS TRUE THEN 1 END) FROM symptomresults WHERE identificationid = ${identificationID}`;
    await pool
      .query(query)
      .then((res: any) => (result = res.rows[0].count))
      .catch((e: Error) => {
        throw e;
      });

    return result as number;
  };

  // Lifestyle Queries
  export const getLifestyle = async (lifestyleID: number) => {
    let result: LifeStyleResult | undefined;
    await pool
      .query("SELECT * FROM lifestyleresults where id = $1", [lifestyleID])
      .then((res: any) => (result = res.rows))
      .catch((e: Error) => {
        throw e;
      });
    return result;
  };
  export const createLifestyleResult = async (
    lifestyleInput: LifeStyleResult,
    identificationID: number
  ) => {
    const {
      question1,
      question2,
      question3,
      question4,
      question5,
    } = lifestyleInput;
    let resultID: number | undefined;
    await pool
      .query(
        "INSERT INTO lifestyleresults (identificationID, question1, question2, question3, question4, question5) VALUES ($1,$2,$3,$4, $5, $6) RETURNING id ",
        [
          identificationID,
          question1,
          question2,
          question3,
          question4,
          question5,
        ]
      )
      .then((res: any) => {
        resultID = res.rows[0].id;
      })
      .catch((e: Error) => {
        throw e;
      });
    return resultID;
  };

  export const getArrayOfIDFromLifestyle = async (
    filterRequest: LifeStyleResult
  ) => {
    let result: Array<{ identificationid: number }> | undefined;

    let query = "SELECT identificationid FROM lifestyleresults WHERE";
    if (filterRequest.question1) {
      for (const filter of filterRequest.question1.split(",")) {
        query += ` LOWER(question1) LIKE '%${filter}%' AND`;
      }
    }

    if (filterRequest.question2) {
      query += ` LOWER(question2) LIKE '%${filterRequest.question2}%' AND`;
    }

    if (filterRequest.question3) {
      query += ` LOWER(question3) LIKE '%${filterRequest.question3}%' AND`;
    }

    if (filterRequest.question4) {
      for (const filter of filterRequest.question4.split(",")) {
        query += ` LOWER(question4) LIKE '%${filter}%' AND`;
      }
    }

    if (filterRequest.question5) {
      for (const filter of filterRequest.question5.split(",")) {
        query += ` LOWER(question5) LIKE '%${filter}%' AND`;
      }
    }
    if (query.includes("AND")) {
      query = query.substring(0, query.length - 3);
    } else {
      query = query.substring(0, query.length - 5);
    }

    await pool
      .query(query)
      .then((res: any) => (result = res.rows))
      .catch((e: Error) => {
        throw e;
      });
    return result;
  };

  export const getAllSurvey = async () => {
    let result: Array<SurveyAnswer> = [];
    await pool
      .query(
        "SELECT * FROM identifications JOIN symptomresults ON symptomresults.identificationid = identifications.id JOIN lifestyleresults ON lifestyleresults.identificationid = identifications.id"
      )
      .then((res: any) => {
        for (const rows of res.rows) {
          const formattedSurveyAnswer: SurveyAnswer = {
            identification: {
              gender: rows.gender,
              age: rows.age,
              height: rows.height,
              weight: rows.weight,
              email: rows.email,
              familyHasDiabetes: rows.familyhasdiabetes,
              isPregnant: rows.ispregnant,
            },
            symptoms: {
              urination: rows.urination,
              thirst: rows.thirst,
              hunger: rows.hunger,
              fatigue: rows.fatigue,
              blurred: rows.blurredvision,
              slowhealing: rows.weakhealing,
              tingling: rows.tingling,
              dry: rows.dryithcyskin,
              weightChange: rows.weightchange,
              moodChanges: rows.moodchange,
            },
            lifestyle: {
              question1: {
                bread: rows.question1.includes("bread"),
                sugar: rows.question1.includes("sugar"),
                salt: rows.question1.includes("salt"),
                flour: rows.question1.includes("flour"),
              },
              question2: rows.question2,
              question3: rows.question3,
              question4: {
                airPollution: rows.question4.includes("air pollution"),
                waterPollution: rows.question4.includes(
                  "lack of clean drinking water"
                ),
                toxins: rows.question4.includes("exposure to toxins"),
              },
              question5: {
                trauma: rows.question5.includes("historical trauma"),
                finances: rows.question5.includes("financial issue"),
                other: rows.question5.includes("other reasons"),
              },
            },
          };
          result.push(formattedSurveyAnswer);
          // console.log(rows);
        }
      })
      .catch((e: Error) => {
        throw e;
      });
    return result;
  };
}
