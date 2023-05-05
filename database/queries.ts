import { identification, lifeStyleResult, reportEntries, symptomResult } from "../models/type";

const pool = require("./config").pool;

// Identification Queries
exports.getID = async (id: number) => {
    let result: identification | undefined;
    await pool.query("SELECT * FROM identifications where ID = $1", [id]).then((res: any) => (result = res.rows)).catch((e: Error) => {
        throw e;
    });
    return result;
}

exports.createID = async (inputID: identification) => {
    const { firstName, lastName, age, height, weight, gender, email, familyHasDiabetes } = inputID;
    let resultID: number | undefined;
    await pool.query("INSERT INTO identifications (firstName, lastName,  age, height, weight, gender, email, familyHasDiabetes) VALUES ($1,$2,$3,$4, $5, $6, $7, $8, $9) RETURNING id ", [firstName, lastName, age, height, weight, gender, email, familyHasDiabetes]).then((res: any) => {
        resultID = res.rows[0].id;
    }).catch((e: Error) => {
        throw e;
    });

    return resultID;
};

// Symptom Queries
exports.getSymptomResultBasedOnID = async (identificationID: number) => {
    let result: symptomResult | undefined;
    await pool.query("SELECT * FROM symptomresults where identificationid = $1", [identificationID]).then((res: any) => (result = res.rows)).catch((e: Error) => {
        throw e;
    });
    return result;
}

exports.createSymptomResult = async (inputSymptom: symptomResult, identificationID: number) => {
    const { urination, thrist, hunger, fatigue, blurred, slowhealing, tingling, dry, weightChange, moodChange } = inputSymptom;

    await pool.query("INSERT INTO symptomresults (urination, thrist, hunger, fatigue, blurred, slowhealing, tingling, dry, weightChange, moodChange) VALUES ($1,$2,$3,$4, $5, $6, $7, $8, $9, $10, $11) RETURNING id ", [identificationID, urination, thrist, hunger, fatigue, blurred, slowhealing, tingling, dry, weightChange, moodChange]).then((res: any) => {
        res = res.rows[0].id;
    }).catch((e: Error) => {
        throw e;
    });
};


// Lifestyle Queries
exports.getLifestyle = async (lifestyleID: number) => {
    let result: lifeStyleResult | undefined;
    await pool.query("SELECT * FROM lifestyleresults where id = $1", [lifestyleID]).then((res: any) => (result = res.rows)).catch((e: Error) => {
        throw e;
    });
    return result;
}
exports.createLifestyleResult = async (question1: string, question2: string, question3: string, question4: string, question5: string, identificationID: number) => {
    let resultID: number | undefined;
    await pool.query("INSERT INTO lifestyleresults (identificationID, question1, question2, question3, question4, question5) VALUES ($1,$2,$3,$4, $5, $6) RETURNING id ", [identificationID, question1, question2, question3, question4, question5]).then((res: any) => {
        resultID = res.rows[0].id;
    }).catch((e: Error) => {
        throw e;
    });
    return resultID;
};


// Entries Queries
exports.getEntries = async (id: number) => {
    let result: reportEntries | undefined;
    await pool.query("SELECT * FROM reportentries where id = $1 ", [id]).then((res: any) => {
        result = res.rows[0].id;
    }).catch((e: Error) => {
        throw e;
    });
    return result;
}

exports.createEntries = async (identificationID: number, symptomID: number, lifestyleID: number) => {
    let resultID: number | undefined;
    await pool.query("INSERT INTO reportentries (identificationid, symptomid, lifestyleid) VALUES ($1,$2,$3) RETURNING id ", [identificationID, symptomID, lifestyleID]).then((res: any) => {
        resultID = res.rows[0].id;
    }).catch((e: Error) => {
        throw e;
    });
    return resultID;
}