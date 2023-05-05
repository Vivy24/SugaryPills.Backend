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

export interface SurveyAnswer {
    identification: Identification,
    lifestyle: Lifestyle,
    symptoms: Symptoms
}


export interface Lifestyle {
    question1: Question1;
    question2: string;
    question3: string;
    question4: Question4;
    question5: Question5;
}

export interface Question1 {
    bread: boolean;
    sugar: boolean;
    salt: null;
    flour: null;
}

export interface Question4 {
    airPollution: null;
    waterPollution: boolean;
    toxins: boolean;
}

export interface Question5 {
    trauma: boolean;
    finances: boolean;
    other: null;
}

export interface Symptoms {
    urination: boolean;
    thirst: boolean;
    hunger: boolean;
    fatigue: null;
    blurred: null;
    slowhealing: null;
    tingling: boolean;
    dry: null;
    weightChange: null;
    moodChanges: null;
}
