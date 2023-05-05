import { LifeStyleResult } from "../models/type";

export const mapLifeStyleResult = (inputLifeStyle: any) => {
    let question1Str = "";
    if (inputLifeStyle.question1.bread) {
        question1Str += 'bread,'
    }
    if (inputLifeStyle.question1.sugar) {
        question1Str += 'sugar,'
    }
    if (inputLifeStyle.question1.salt) {
        question1Str += 'salt,'
    }
    if (inputLifeStyle.question1.flour) {
        question1Str += 'flour,'
    }

    let question2Str = "";
    switch (inputLifeStyle.question2) {
        case 'once':
            question2Str = 'once a week';
            break;
        case 'sometimes':
            question2Str = '2-5 times a week';
            break;
        case 'everyday':
            question2Str = 'once a month';
            break;
    }

    let question3Str = "";
    switch (inputLifeStyle.question3) {
        case 'month':
            question3Str = 'once a month';
            break;
        case 'quarter':
            question3Str = 'once a quarter';
            break;
        case 'year':
            question3Str = 'once a year';
            break;
    }


    let question4Str = "";
    if (inputLifeStyle.question4.airPollution) {
        question4Str += 'air pollution,'
    }
    if (inputLifeStyle.question4.waterPollution) {
        question4Str += 'lack of clean drinking water,'
    }
    if (inputLifeStyle.question4.toxins) {
        question4Str += 'exposure to toxins,'
    }


    let question5Str = "";
    if (inputLifeStyle.question5.trauma) {
        question5Str += 'historical trauma,'
    }
    if (inputLifeStyle.question5.finances) {
        question5Str += 'financial issue,'
    }
    if (inputLifeStyle.question5.other) {
        question5Str += 'other reasons,'
    }

    if (question5Str == "") {
        question5Str = "happy,"
    }


    const formattedLifestyle: LifeStyleResult = {
        question1: question1Str.slice(0, question1Str.length - 1),
        question2: question2Str,
        question3: question3Str,
        question4: question4Str.slice(0, question4Str.length - 1),
        question5: question5Str.slice(0, question5Str.length - 1)
    }

    return formattedLifestyle;
}