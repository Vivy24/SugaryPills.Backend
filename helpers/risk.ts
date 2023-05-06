// question1: Array<string>, question2: string, question3: string, question4: Array<string>, question5: Array<string>

import { LifeStyleResult, SurveyResult, SymptomResult } from "../models/type";

export const calculateRisk = function (lifestyleInput: LifeStyleResult, symptomResult: SymptomResult) {
    let result: SurveyResult = {
        totalPoint: 0,
        risk: 'unknown',
        hasMoreThan3Symptoms: false,
    }
    let total = 0;
    const question1 = lifestyleInput.question1.split(",");
    question1.indexOf("None") > -1 && question1.splice(question1.indexOf("None"), 1);
    const question4 = lifestyleInput.question4.split(",");
    const question5 = lifestyleInput.question5.split(",");
    question5.indexOf("Nope") > -1 && question5.splice(question5.indexOf("Nope"), 1);

    total += question1.length;
    total += question4.length;
    total += question5.length;

    switch (lifestyleInput.question2) {
        case '2-5 times a week':
            total += 1;
            break;
        case 'everyday':
            total += 2;
            break;
    }

    switch (lifestyleInput.question3) {
        case 'once a quarter':
            total += 1;
            break;
        case 'once a year':
            total += 2;
            break;
    }
    result.totalPoint = total;
    if (result.totalPoint > 0 && result.totalPoint < 6) {
        result.risk = 'low';

    }
    else if (result.totalPoint > 5 && result.totalPoint < 12) {
        result.risk = 'moderate';

    }
    else if (result.totalPoint > 13 && result.totalPoint < 17) {
        result.risk = 'high';

    }

    let countTrueSymptoms = 0;
    countTrueSymptoms = Object.values(symptomResult).filter(symptom => symptom === true).length;

    result.hasMoreThan3Symptoms = countTrueSymptoms > 2 ? true : false;

    return result;
}