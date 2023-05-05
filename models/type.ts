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
    thirst: boolean;
    hunger: boolean;
    fatigue: boolean;
    blurredVision: boolean;
    weakHealing: boolean;
    tingling: boolean;
    dryIthcySkin: boolean;
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

// calculation model 
export interface SurveyResult {
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
    moodChanges: FieldStats;
    count: number,
    totalCount: number
}

export interface FieldStats {
    count: number,
    percentage: number,
}