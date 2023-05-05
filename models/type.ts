// database model
export interface Identification {
    age: number;
    height?: string;
    weight?: string;
    gender: string;
    email: string;
    familyHasDiabetes: boolean;
    isPregnant: boolean;
}

export interface SymptomResult {
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

export interface LifeStyleResult {
    question1: string;
    question2: string;
    question3: string;
    question4: string;
    question5: string;
}

export interface ReportEntries {
    identification: Identification;
    symptoms: SymptomResult;
    lifestyles: LifeStyleResult;
}


// calculation model 
export interface surveyResult {
    totalPoint: number,
    risk: string
}


// report prototypes
export interface ReportResult {
    urination: FieldStats,
    thirst: FieldStats,
    hunger: FieldStats,
    fatigue: FieldStats,
    blurredVision: FieldStats,
    weakHealing: FieldStats,
    tingling: FieldStats,
    dryIthcySkin: FieldStats,
    weightLoss: FieldStats,
    count: number,
    totalCount: number
}

export interface FieldStats {
    count: number,
    percentage: number,
}