import { exercise, food, identification, lifeStyleResult, reportEntries, symptomResult } from "../models/type";

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
    const { firstName, lastName, age, height, weight, BMI, gender, email, familyHasDiabetes, isIndigenous } = inputID;
    let resultID: number | undefined;
    await pool.query("INSERT INTO identifications (firstName, lastName,  age, height, weight, BMI, gender, email, familyHasDiabetes, isIndigenous) VALUES ($1,$2,$3,$4, $5, $6, $7, $8, $9, $10) RETURNING id ", [firstName, lastName, age, height, weight, BMI, gender, email, familyHasDiabetes, isIndigenous]).then((res: any) => {
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
    const { fatigue, blurredVision, tingling, weightChange, thirst, infections, cuts, erection } = inputSymptom;

    await pool.query("INSERT INTO symptomresults (identificationId,fatigue, blurredVision, tingling, weightChange, thirst, infections, cuts, erection) VALUES ($1,$2,$3,$4, $5, $6, $7, $8) RETURNING id ", [identificationID, fatigue, blurredVision, tingling, weightChange, thirst, infections, cuts, erection]).then((res: any) => {
        res = res.rows[0].id;
    }).catch((e: Error) => {
        throw e;
    });
};

// Exercise Queries
exports.getExceristListBasedOnlifestyleID = async (lifestyleID: number) => {
    let result: Array<exercise> | undefined;
    await pool.query("SELECT * FROM exercise where lifestyleid = $1", [lifestyleID]).then((res: any) => (result = res.rows)).catch((e: Error) => {
        throw e;
    });
    return result;
}
exports.createExercise = async (exercise: exercise, lifestyleID: number) => {
    const { name, level } = exercise;

    await pool.query("INSERT INTO exercise (lifestyleid, name, level) VALUES ($1,$2,$3) RETURNING id ", [lifestyleID, name, level]).then((res: any) => {
        res = res.rows[0].id;
    }).catch((e: Error) => {
        throw e;
    });
};

// Food Queries
exports.getFoodListBasedOnlifestyleID = async (lifestyleID: number) => {
    let result: Array<food> | undefined;
    await pool.query("SELECT * FROM food where lifestyleid = $1", [lifestyleID]).then((res: any) => (result = res.rows)).catch((e: Error) => {
        throw e;
    });
    return result;
}
exports.createFood = async (exercise: exercise, lifestyleID: number) => {
    const { name, level } = exercise;

    await pool.query("INSERT INTO food (lifestyleid, name, level) VALUES ($1,$2,$3) RETURNING id ", [lifestyleID, name, level]).then((res: any) => {
        res = res.rows[0].id;
    }).catch((e: Error) => {
        throw e;
    });
};

// Lifestyle Queries
exports.getLifestyle = async (lifestyleID: number) => {
    let result: lifeStyleResult | undefined;
    await pool.query("SELECT * FROM lifestyleresult where id = $1", [lifestyleID]).then((res: any) => (result = res.rows)).catch((e: Error) => {
        throw e;
    });
    return result;
}
exports.createLifestyleResult = async (smoke: string, stressed: string, mentalillness: string, cupsofwater: string, identificationID: number) => {
    let resultID: number | undefined;
    await pool.query("INSERT INTO lifestyleresult (identificationID, smoke, stressed, mentalillness, cupsofwater) VALUES ($1,$2,$3,$4, $5) RETURNING id ", [identificationID, smoke, stressed, mentalillness, cupsofwater]).then((res: any) => {
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