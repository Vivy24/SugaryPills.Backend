CREATE TABLE identifications (
    ID SERIAL PRIMARY KEY,
    age INT NOT NULL, 
    height VARCHAR(10) NOT NULL,
    weight VARCHAR(10) NOT NULL,
    gender VARCHAR(10) NOT NULL,
    email VARCHAR(320) NOT NULL,
    familyHasDiabetes BOOLEAN NOT NULL, 
    isPregnant BOOLEAN NOT NULL
);

CREATE TABLE symptomResults (
    ID SERIAL PRIMARY KEY, 
    identificationID int NOT NULL,
    urination BOOLEAN NOT NULL,
    thirst BOOLEAN NOT NULL,
    hunger BOOLEAN NOT NULL,
    fatigue BOOLEAN NOT NULL,
    blurred BOOLEAN NOT NULL,
    slowhealing BOOLEAN NOT NULL,
    tingling BOOLEAN NOT NULL,
    dry BOOLEAN NOT NULL,
    weightChange BOOLEAN NOT NULL,
    moodChange BOOLEAN NOT NULL,
    FOREIGN KEY (identificationID) REFERENCES identifications(id)
);

CREATE TABLE lifestyleResults (
    ID SERIAL PRIMARY KEY,
    identificationID int NOT NULL,
    question1 VARCHAR(320),
    question2 VARCHAR(320) NOT NULL,
    question3 VARCHAR (320) NOT NULL,
    question4 VARCHAR(320) NOT NULL,
    question5 VARCHAR(320) NOT NULL,
    FOREIGN KEY (identificationID) REFERENCES identifications(id)
);
