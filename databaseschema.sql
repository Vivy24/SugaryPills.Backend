CREATE TABLE identifications (
    ID SERIAL PRIMARY KEY,
    firstName VARCHAR(50) NOT NULL,
    lastName VARCHAR(50) NOT NULL,
    age INT NOT NULL, 
    height VARCHAR(10) NOT NULL,
    weight VARCHAR(10) NOT NULL,
    BMI VARCHAR(10),
    gender VARCHAR(10) NOT NULL,
    email VARCHAR(320) NOT NULL,
    familyHasDiabetes BOOLEAN NOT NULL, 
    isIndigenous BOOLEAN NOT NULL
);

CREATE TABLE symptomResults (
    ID SERIAL PRIMARY KEY, 
    identificationID int NOT NULL,
    fatigue BOOLEAN NOT NULL,
    blurredVision BOOLEAN NOT NULL,
    tingling BOOLEAN NOT NULL,
    weightChange BOOLEAN NOT NULL,
    thirst BOOLEAN NOT NULL,
    infections BOOLEAN NOT NULL,
    cuts BOOLEAN NOT NULL,
    erection BOOLEAN NOT NULL,
    FOREIGN KEY (identificationID) REFERENCES identifications(id)
);

CREATE TABLE lifestyleResult (
    ID SERIAL PRIMARY KEY,
    identificationID int NOT NULL,
    smoke VARCHAR(20),
    stressed VARCHAR(20) NOT NULL,
    mentalIllness VARCHAR (100) NOT NULL,
    cupsOfWater VARCHAR(20) NOT NULL,
    FOREIGN KEY (identificationID) REFERENCES identifications(id)
);


CREATE TABLE exercise (
    ID SERIAL PRIMARY KEY, 
    lifeStyleID INT NOT NULL,
    name VARCHAR(100) NOT NULL, 
    level VARCHAR(20) NOT NULL,
    FOREIGN KEY (lifeStyleID) REFERENCES lifestyleResult(id)
);

CREATE TABLE food (
    ID SERIAL PRIMARY KEY, 
    lifeStyleID INT NOT NULL,
    name VARCHAR(100) NOT NULL, 
    level VARCHAR(20) NOT NULL,
    FOREIGN KEY (lifeStyleID) REFERENCES lifestyleResult(id)
);



CREATE TABLE reportEntries (
    ID SERIAL PRIMARY KEY,
    identificationID INT, 
    symptomID INT, 
    lifeStyleID INT,
    FOREIGN KEY (identificationID) REFERENCES identifications(id),
    FOREIGN KEY (symptomID) REFERENCES symptomResults(id),
    FOREIGN KEY (lifeStyleID) REFERENCES lifestyleResult(id)
);