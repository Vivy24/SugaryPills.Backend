
INSERT INTO identifications (age, height, weight, gender, email, familyHasDiabetes, isPregnant) VALUES (40, '160', '68', 'female', 'eliale@example.com', false, false);
INSERT INTO identifications (age, height, weight, gender, email, familyHasDiabetes, isPregnant) VALUES (25, '150', '58', 'female', 'alasie@example.com', true, false);
INSERT INTO identifications (age, height, weight, gender, email, familyHasDiabetes, isPregnant) VALUES (48, '170', '60', 'male', 'sose@example.com', false, false);
INSERT INTO identifications (age, height, weight, gender, email, familyHasDiabetes, isPregnant) VALUES (50, '155', '70', 'female', 'pilip@example.com', true, false);
INSERT INTO identifications (age, height, weight, gender, email, familyHasDiabetes, isPregnant) VALUES (30, '175', '67', 'male', 'hensley@example.com', true, false);


INSERT INTO symptomresults (identificationid, urination, thirst,  hunger, fatigue, blurred, slowhealing, tingling, dry, weightchange, moodchange) VALUES (1, true, false, false, true, false, false, false, false, false, false);
INSERT INTO symptomresults (identificationid, urination, thirst,  hunger, fatigue, blurred, slowhealing, tingling, dry, weightchange, moodchange) VALUES (2, true, false, false, true, true, true, true, false , true, true);
INSERT INTO symptomresults (identificationid, urination, thirst,  hunger, fatigue, blurred, slowhealing, tingling, dry, weightchange, moodchange) VALUES (3, false, false, false, true, false, false, false, true, false, false);
INSERT INTO symptomresults (identificationid, urination, thirst,  hunger, fatigue, blurred, slowhealing, tingling, dry, weightchange, moodchange) VALUES (4, false, false, false, true, true, true, true , false , true , false);
INSERT INTO symptomresults (identificationid, urination, thirst,  hunger, fatigue, blurred, slowhealing, tingling, dry, weightchange, moodchange) VALUES (5, true, false, false, true, false, false, false, true, false, false);

INSERT INTO lifestyleresults (identificationid, question1, question2, question3, question4, question5) VALUES (1, 'sugar,salt', 'once', 'quarter', 'air pollution, lack of clean drinking water', 'historical trauma');
INSERT INTO lifestyleresults (identificationid, question1, question2, question3, question4, question5) VALUES (2, 'sugar,salt', 'everyday', 'year', 'air pollution, exposure to toxins', 'historical trauma, financial issue');
INSERT INTO lifestyleresults (identificationid, question1, question2, question3, question4, question5) VALUES (3, 'white bread', 'once', 'quarter', 'air pollution', 'happy');
INSERT INTO lifestyleresults (identificationid, question1, question2, question3, question4, question5) VALUES (4, 'sugar,salt,flour', '2-5 times', 'month', 'air pollution', 'other reasons');
INSERT INTO lifestyleresults (identificationid, question1, question2, question3, question4, question5) VALUES (5, 'none', 'once', 'quarter', 'lack of clean drinking water', 'happy');