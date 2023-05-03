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
    urination: boolean;
    thrist: boolean;
    hunger: boolean;
    fatigue: boolean;
    blurred: boolean;
    slowhealing: boolean;
    tingling: boolean;
    dry: boolean;
    weightChange: boolean;
    moodChange: boolean;
}

export interface lifeStyleResult {
    question1: string;
    question2: string;
    question3: string;
    question4: string;
    question5: string;
}

export interface reportEntries {
    identification: identification;
    symptom: symptomResult;
    lifestyle: lifeStyleResult;
}