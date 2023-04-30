export interface identification {
    firstName: string;
    lastName: string;
    age: number;
    height?: string;
    weight?: string;
    BMI: string;
    gender: string;
    email: string;
    familyHasDiabetes: boolean;
    isIndigenous: boolean;
}

export interface symptomResult {
    fatigue: boolean;
    blurredVision: boolean;
    tingling: boolean;
    weightChange: boolean;
    thirst: boolean;
    infections: boolean;
    cuts: boolean;
    erection: boolean;
}

export interface exercise {
    name: string;
    level: string;
}

export interface food {
    name: string;
    level: string;
}

export interface lifeStyleResult {
    smoke: string;
    stressed: string;
    mentalIllness: Array<string>;
    cupsOfWater: string;
    food: Array<food>;
    exercise: Array<exercise>;
}

export interface reportEntries {
    identification: identification;
    symptom: symptomResult;
    lifestyle: lifeStyleResult;
}