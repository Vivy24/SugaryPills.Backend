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
        const { urination, thrist, hunger, fatigue, blurred, slowhealing, tingling, dry, weightChange, moodChange } = inputSymptom;

        await pool.query("INSERT INTO symptomresults (identificationID, urination, thrist, hunger, fatigue, blurred, slowhealing, tingling, dry, weightChange, moodChange) VALUES ($1,$2,$3,$4, $5, $6, $7, $8, $9, $10, $11) RETURNING id ", [identificationID, urination, thrist, hunger, fatigue, blurred, slowhealing, tingling, dry, weightChange, moodChange]).then((res: any) => {
            res = res.rows[0].id;
        }).catch((e: Error) => {
            throw e;
        });
    };


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


    export const getArrayOfIDFromLifestyle = async (filter1: Array<string>, filter2: string, filter3: string, filter4: Array<string>, filter5: Array<string>) => {
        let result: Array<number> | undefined;

        let query = 'SELECT identificationid FROM lifestyleresults WHERE';
        if (filter1) {
            for (const filter of filter1) {
                query += `LOWER(question1) LIKE '%${filter}$%' AND`;
            }
        }

        if (filter2) {
            query += `LOWER(question2) LIKE '%${filter2}$%' AND`;
        }

        if (filter3) {
            query += `LOWER(question3) LIKE '%${filter3}$%' AND`;
        }

        if (filter4) {
            for (const filter of filter4) {
                query += `LOWER(question4) LIKE '%${filter}$%' AND`;
            }
        }

        if (filter5) {
            for (const filter of filter5) {
                query += `LOWER(question5) LIKE '%${filter}$%' AND`;
            }
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
