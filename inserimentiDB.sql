BEGIN TRANSACTION;

CREATE TABLE IF NOT EXISTS "DEGREE" (
  	"COD_DEGREE" VARCHAR(25),
	"TITLE_DEGREE"	VARCHAR(25),
	PRIMARY KEY("COD_DEGREE")
);

CREATE TABLE IF NOT EXISTS "STUDENT" (
    "ID" VARCHAR(50),
	"NAME" VARCHAR(25),
  	"SURNAME" VARCHAR(25),
  	"GENDER" VARCHAR(25),
    "NATIONALITY" VARCHAR(25),
    "EMAIL" VARCHAR(50),
    "ENROLLMENT_YEAR" VARCHAR(25),
    "COD_DEGREE" INTEGER NOT NULL,
    FOREIGN KEY("COD_DEGREE") REFERENCES "DEGREE"("COD_GEDREE"),
  	PRIMARY KEY("ID")
);

CREATE TABLE IF NOT EXISTS "STUD_AUTH0" (
	"ID" VARCHAR(50),
	"ID_AUTH0" VARCHAR(50),
    FOREIGN KEY("ID") REFERENCES "STUDENT"("ID"),
  	PRIMARY KEY("ID")
);

CREATE TABLE IF NOT EXISTS "TEACHER_AUTH0" (
	"ID" VARCHAR(50),
	"ID_AUTH0" VARCHAR(50),
    FOREIGN KEY("ID") REFERENCES "TEACHER"("ID"),
  	PRIMARY KEY("ID")
);

CREATE TABLE IF NOT EXISTS "TEACHER" (
    "ID" VARCHAR(50),
	"NAME"	VARCHAR(25),
  	"SURNAME" VARCHAR(25),
    "EMAIL" VARCHAR(50),
  	"COD_GROUP" VARCHAR(25),
    "COD_DEPARTMENT" VARCHAR(25),
    FOREIGN key("COD_GROUP") REFERENCES "GROUP"("COD_GROUP"),
    FOREIGN key("COD_DEPARTMENT") REFERENCES "DEPARTMENT"("COD_DEPARTMENT"),
  	PRIMARY KEY("ID")
);

CREATE TABLE IF NOT EXISTS "CAREER"(
  	"ID" VARCHAR(50),
  	"COD_COURSE" VARCHAR(25),
    "TITLE_COURSE" VARCHAR(25),
    "CFU" VARCHAR(25),
    "GRADE" INTEGER, 
  	"DATE" VARCHAR(25),
  	FOREIGN KEY("ID") REFERENCES "STUDENT"("ID"),
  	PRIMARY KEY("ID","COD_COURSE")
);

CREATE TABLE IF NOT EXISTS "THESIS"(
  "ID_THESIS" INTEGER NOT NULL,
  "TITLE" VARCHAR(25),
  "DESCRIPTION"  VARCHAR(500),
  "REQUIRED_KNOWLEDGE" VARCHAR(100),
  "NOTES" VARCHAR(500), 
  "EXPIRATION_DATE" VARCHAR(25),
  "LEVEL" VARCHAR(25),
  "DEGREE" VARCHAR(25),
  "SUPERVISOR" VARCHAR(50),
  "TYPE" VARCHAR(25),
  FOREIGN key("DEGREE") REFERENCES "DEGREE"("COD_DEGREE"),
  FOREIGN key("SUPERVISOR") REFERENCES "TEACHER"("ID"),
  PRIMARY KEY("ID_THESIS" AUTOINCREMENT)
);

CREATE TABLE IF NOT EXISTS "THESIS_PROPOSAL"(
  "STUDENT" VARCHAR(50),  
  "THESIS" INTEGER NOT NULL,
  "STATE" INTEGER NOT NULL, /**1 ACCETTATA - 0 NON ACCETTATA**/
  FOREIGN key("THESIS") REFERENCES "THESIS"("ID_THESIS"),
  FOREIGN key("STUDENT") REFERENCES "STUDENT"("ID"),
  PRIMARY KEY("STUDENT","THESIS")
);

CREATE TABLE IF NOT EXISTS "THESIS_STATUS"(
  "THESIS" INTEGER NOT NULL,
  "STATE" INTEGER NOT NULL, /**stato può assumere 3 valori --> 1: attiva - 0: archiviata**/
  FOREIGN key("THESIS") REFERENCES "TESI"("ID_THESIS"),
  PRIMARY KEY("THESIS")
);

CREATE TABLE IF NOT EXISTS "CO_SUPERVISORS"(
  "THESIS" INTEGER NOT NULL,
  "TEACHER" VARCHAR(25),
  FOREIGN key("THESIS") REFERENCES "THESIS"("ID_THESIS"),
  FOREIGN key("TEACHER") REFERENCES "TEACHER"("ID"),
  PRIMARY key("THESIS","TEACHER")
);

CREATE TABLE IF NOT EXISTS "KEYWORD"(
  "THESIS" INTEGER NOT NULL,
  "KEYWORD" VARCHAR(25),
  FOREIGN key("THESIS") REFERENCES "THESIS"("ID_THESIS"),
  PRIMARY key("THESIS","KEYWORD")
);

CREATE TABLE IF NOT EXISTS "GROUP"(
  "COD_GROUP" VARCHAR(25),
  "NAME" VARCHAR(25),
    PRIMARY KEY("COD_GROUP")
);

CREATE TABLE IF NOT EXISTS "DEPARTMENT"(
  "COD_DEPARTMENT" VARCHAR(25),
  "NAME" VARCHAR(25),
   PRIMARY KEY("COD_DEPARTMENT")
);

COMMIT;

/**TRACCIATO RECORD**/


/**
Scrivere gli inserimenti nel DB e caricarli su github. Dividere ogni blocco una tabella
**/


INSERT INTO "DEGREE" VALUES("LM-53", "Laurea magistrale in Ingegneria Dei Materiali");
INSERT INTO "DEGREE" VALUES("LM-29", "Laurea magistrale in Ingegneria Elettronica");
INSERT INTO "DEGREE" VALUES("LM-31", "Laurea magistrale in Ingegneria Gestionale");
INSERT INTO "DEGREE" VALUES("LM-33", "Laurea magistrale in Ingegneria Meccanica");
INSERT INTO "DEGREE" VALUES("LM-25", "Laurea magistrale in Mechatronic Engineering");
INSERT INTO "DEGREE" VALUES("LM-32", "Laurea magistrale in Ingegneria Infortmatica");
INSERT INTO "DEGREE" VALUES("LM-20", "Laurea magistrale in Ingegneria Aerospaziale");
INSERT INTO "DEGREE" VALUES("LM-21", "Laurea magistrale in Ingegneria Biomedica");

INSERT INTO "STUDENT" VALUES("s319852", "Evelina Marija", "Bratuhina", "F", "Lettone", "s319852@studenti.polito.it", "2022", "LM32");
INSERT INTO "STUDENT" VALUES("s313373", "Fabio", "Mangani", "M", "Italiana", "s313373@studenti.polito.it", "2022", "LM32");
INSERT INTO "STUDENT" VALUES("s297632", "Luke", "Smith", "M", "Inglese", "s297632@studenti.polito.it", "2021", "LM25");
INSERT INTO "STUDENT" VALUES("s317977", "Giacomo", "Cauda", "M", "Italiana", "s317977@studenti.polito.it", "2022", "LM29");
INSERT INTO "STUDENT" VALUES("s317642", "Gerardo", "Maruotti", "M", "Italiana", "s3317642@studenti.polito.it", "2022", "LM20");

INSERT INTO "GROUP" VALUES("GR-16", "Software Engineering Group");
INSERT INTO "GROUP" VALUES("GR-05", "Electronic Cad and Reliabilty Check");
INSERT INTO "GROUP" VALUES("GR-13", "Metodi Formali");
INSERT INTO "GROUP" VALUES("GR-04", "Database and Data Mining Group");
INSERT INTO "GROUP" VALUES("GR-10", "Intelligent and Interactive System Group");


INSERT INTO "DEPARTMENT" VALUES("DAUIN", "Dipartimento di Automatica e Informatica");
INSERT INTO "DEPARTMENT" VALUES("DIMEAS", "Dipartimento di INGEGNERIA MECCANICA E AEROSPAZIALE");
INSERT INTO "DEPARTMENT" VALUES("DET", "Dipartimento di Elettronica e Telecomunicazioni");
INSERT INTO "DEPARTMENT" VALUES("DISAT", "Dipartimento Scienza Applicata e Tecnologia");
INSERT INTO "DEPARTMENT" VALUES("DIGEP", "Dipartimento di Ingegneria Gestionale e della Produzione");

INSERT INTO "TEACHER" VALUES("d123456", "Marco", "Torchiano", );
