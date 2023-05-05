import { Identification, LifeStyleResult, ReportEntries, SymptomResult } from "../models/type";
import { pool } from './config';


export module poolQuery {
    export const getID = async (id: number) => {
        let result: Identification | undefined;
        await pool.query("SELECT * FROM identifications where ID = $1", [id]).then((res: any) => (result = res.rows)).catch((e: Error) => {
            throw e;
        });
        return result;
    }

    export const createID = async (inputID: Identification) => {
        const { age, height, weight, gender, email, familyHasDiabetes, isPregnant } = inputID;
        let resultID: number | undefined;
        await pool.query("INSERT INTO identifications (age, height, weight, gender, email, familyHasDiabetes, isPregnant) VALUES ($1,$2,$3,$4, $5, $6, $7) RETURNING id ", [age, height, weight, gender, email, familyHasDiabetes, isPregnant]).then((res: any) => {
            resultID = res.rows[0].id;
        }).catch((e: Error) => {
            throw e;
        });

        return resultID;
    };

    // Symptom Queries
    export const getSymptomResultBasedOnID = async (identificationID: number) => {
        let result: SymptomResult | undefined;
        await pool.query("SELECT * FROM symptomresults where identificationid = $1", [identificationID]).then((res: any) => (result = res.rows)).catch((e: Error) => {
            throw e;
        });
        return result;
    }

    export const createSymptomResult = async (inputSymptom: SymptomResult, identificationID: number) => {
        const { urination, thirst, hunger, fatigue, blurredVision, weakHealing, tingling, dryIthcySkin, weightChange, moodChange } = inputSymptom;

        await pool.query("INSERT INTO symptomresults (identificationID, urination, thirst, hunger, fatigue, blurredVision, weakHealing, tingling, dryIthcySkin, weightChange, moodChange) VALUES ($1,$2,$3,$4, $5, $6, $7, $8, $9, $10, $11) RETURNING id ", [identificationID, urination, thirst, hunger, fatigue, blurredVision, weakHealing, tingling, dryIthcySkin, weightChange, moodChange]).then((res: any) => {
            res = res.rows[0].id;
        }).catch((e: Error) => {
            throw e;
        });
    };

    export const getTotalSymptomAllPeople = async (symptom: string) => {
        let result: number | undefined;
        let query = `SELECT count(CASE WHEN ${symptom} IS TRUE THEN 1 END) FROM symptomresults`
        // await pool.query("SELECT count(*) filter (where $1 is TRUE) from symptomresults", [symptom]).then((res: any) => (result = res.rows[0])).catch((e: Error) => {
        //     throw e;
        // })

        await pool.query(query).then((res: any) => (result = res.rows[0].count)).catch((e: Error) => {
            throw e;
        });
        return result;
    }

    export const getTotalSymptomFilteredPeople = async (symptom: string, identificationID: number) => {
        let result: number | undefined;
        let query = `SELECT count(CASE WHEN ${symptom} IS TRUE THEN 1 END) FROM symptomresults WHERE identificationid = ${identificationID}`
        await pool.query(query).then((res: any) => (result = res.rows[0].count)).catch((e: Error) => {
            throw e;
        });

        return result as number;
    }

    // Lifestyle Queries
    export const getLifestyle = async (lifestyleID: number) => {
        let result: LifeStyleResult | undefined;
        await pool.query("SELECT * FROM lifestyleresults where id = $1", [lifestyleID]).then((res: any) => (result = res.rows)).catch((e: Error) => {
            throw e;
        });
        return result;
    }
    export const createLifestyleResult = async (lifestyleInput: LifeStyleResult, identificationID: number) => {
        const { question1, question2, question3, question4, question5 } = lifestyleInput
        let resultID: number | undefined;
        await pool.query("INSERT INTO lifestyleresults (identificationID, question1, question2, question3, question4, question5) VALUES ($1,$2,$3,$4, $5, $6) RETURNING id ", [identificationID, question1, question2, question3, question4, question5]).then((res: any) => {
            resultID = res.rows[0].id;
        }).catch((e: Error) => {
            throw e;
        });
        return resultID;
    };


    export const getArrayOfIDFromLifestyle = async (filterRequest: LifeStyleResult) => {
        let result: Array<{ identificationid: number }> | undefined;

        let query = 'SELECT identificationid FROM lifestyleresults WHERE';
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
        }
        else {
            query = query.substring(0, query.length - 5);

        }

        await pool.query(query).then((res: any) => (result = res.rows)).catch((e: Error) => {
            throw e;
        });
        return result;
    }


    // Entries Queries
    export const getEntries = async (id: number) => {
        let result: ReportEntries | undefined;
        await pool.query("SELECT * FROM reportentries where id = $1 ", [id]).then((res: any) => {
            result = res.rows[0].id;
        }).catch((e: Error) => {
            throw e;
        });
        return result;
    }

    export const createEntries = async (identificationID: number, symptomID: number, lifestyleID: number) => {
        let resultID: number | undefined;
        await pool.query("INSERT INTO reportentries (identificationid, symptomid, lifestyleid) VALUES ($1,$2,$3) RETURNING id ", [identificationID, symptomID, lifestyleID]).then((res: any) => {
            resultID = res.rows[0].id;
        }).catch((e: Error) => {
            throw e;
        });
        return resultID;
    }
}
// Identification Queries
