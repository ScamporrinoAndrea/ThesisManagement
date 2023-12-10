const sqlite3 = require('sqlite3');
const dbModule = require('../db.js');
let db;

exports.createTestDb = async () => {
    return new Promise((resolve, reject) => {
        db = new sqlite3.Database(':memory:');
        const tables = [`CREATE TABLE IF NOT EXISTS "DEGREE" (
        "COD_DEGREE"	VARCHAR(25),
        "TITLE_DEGREE"	VARCHAR(100),
        PRIMARY KEY("COD_DEGREE")
    )`,
            `CREATE TABLE IF NOT EXISTS "GROUP" (
        "COD_GROUP"	VARCHAR(25),
        "NAME"	VARCHAR(25),
        PRIMARY KEY("COD_GROUP")
    )`,
            `CREATE TABLE IF NOT EXISTS "DEPARTMENT" (
        "COD_DEPARTMENT"	VARCHAR(25),
        "NAME"	VARCHAR(25),
        PRIMARY KEY("COD_DEPARTMENT")
    )`,
            `CREATE TABLE IF NOT EXISTS "STUDENT" (
        "ID"	VARCHAR(50),
        "NAME"	VARCHAR(25),
        "SURNAME"	VARCHAR(25),
        "GENDER"	VARCHAR(25),
        "NATIONALITY"	VARCHAR(25),
        "EMAIL"	VARCHAR(50),
        "ENROLLMENT_YEAR"	VARCHAR(25),
        "COD_DEGREE"	VARCHAR(25),
        PRIMARY KEY("ID"),
        FOREIGN KEY("COD_DEGREE") REFERENCES "DEGREE"("COD_DEGREE")
    )`,
            `CREATE TABLE IF NOT EXISTS "TEACHER" (
        "ID"	VARCHAR(50),
        "NAME"	VARCHAR(25),
        "SURNAME"	VARCHAR(25),
        "EMAIL"	VARCHAR(50),
        "COD_GROUP"	VARCHAR(25),
        "COD_DEPARTMENT"	VARCHAR(25),
        PRIMARY KEY("ID"),
        FOREIGN KEY("COD_DEPARTMENT") REFERENCES "DEPARTMENT"("COD_DEPARTMENT"),
        FOREIGN KEY("COD_GROUP") REFERENCES "GROUP"("COD_GROUP")
    )`,
            `CREATE TABLE IF NOT EXISTS "STUD_AUTH0" (
        "ID"	VARCHAR(50),
        "ID_AUTH0"	VARCHAR(50),
        PRIMARY KEY("ID"),
        FOREIGN KEY("ID") REFERENCES "STUDENT"("ID")
    )`,
            `CREATE TABLE IF NOT EXISTS "TEACHER_AUTH0" (
        "ID"	VARCHAR(50),
        "ID_AUTH0"	VARCHAR(50),
        PRIMARY KEY("ID"),
        FOREIGN KEY("ID") REFERENCES "TEACHER"("ID")
    )`,
            `CREATE TABLE IF NOT EXISTS "CAREER" (
        "ID"	VARCHAR(50),
        "COD_COURSE"	VARCHAR(25),
        "TITLE_COURSE"	VARCHAR(25),
        "CFU"	VARCHAR(25),
        "GRADE"	INTEGER,
        "DATE"	VARCHAR(25),
        PRIMARY KEY("ID","COD_COURSE"),
        FOREIGN KEY("ID") REFERENCES "STUDENT"("ID")
    )`,
            `CREATE TABLE IF NOT EXISTS "THESIS" (
        "ID_THESIS"	INTEGER NOT NULL,
        "TITLE"	VARCHAR(25),
        "DESCRIPTION"	VARCHAR(500),
        "REQUIRED_KNOWLEDGE"	VARCHAR(100),
        "NOTES"	VARCHAR(500),
        "EXPIRATION_DATE"	VARCHAR(25),
        "LEVEL"	VARCHAR(25),
        "DEGREE"	VARCHAR(25),
        "SUPERVISOR"	VARCHAR(50),
        PRIMARY KEY("ID_THESIS" AUTOINCREMENT),
        FOREIGN KEY("DEGREE") REFERENCES "DEGREE"("COD_DEGREE"),
        FOREIGN KEY("SUPERVISOR") REFERENCES "TEACHER"("ID")
    )`,
            `CREATE TABLE IF NOT EXISTS "THESIS_APPLICATION" (
        "ID_APPLICATION"	INTEGER NOT NULL,
        "STUDENT"	VARCHAR(50),
        "THESIS"	INTEGER NOT NULL,
        "STATE"	INTEGER NOT NULL,
        "APPLICATION_DATE" VARCHAR(50),
        PRIMARY KEY("ID_APPLICATION" AUTOINCREMENT),
        FOREIGN KEY("THESIS") REFERENCES "THESIS"("ID_THESIS"),
        FOREIGN KEY("STUDENT") REFERENCES "STUDENT"("ID")
    )`,
            `CREATE TABLE IF NOT EXISTS "THESIS_STATUS" (
        "THESIS"	INTEGER NOT NULL,
        "STATE"	INTEGER NOT NULL,
        PRIMARY KEY("THESIS"),
        FOREIGN KEY("THESIS") REFERENCES "THESIS"("ID_THESIS")
    )`,
            `CREATE TABLE IF NOT EXISTS "CO_SUPERVISOR" (
        "THESIS"	INTEGER NOT NULL,
        "NAME"	VARCHAR(25),
        "SURNAME"	VARCHAR(25),
        "EMAIL"	VARCHAR(50),
        PRIMARY KEY("THESIS","EMAIL"),
        FOREIGN KEY("THESIS") REFERENCES "THESIS"("ID_THESIS")
    )`,
            `CREATE TABLE IF NOT EXISTS "KEYWORD" (
        "THESIS"	INTEGER NOT NULL,
        "KEYWORD"	VARCHAR(25),
        PRIMARY KEY("THESIS","KEYWORD"),
        FOREIGN KEY("THESIS") REFERENCES "THESIS"("ID_THESIS")
    )`,
            `CREATE TABLE IF NOT EXISTS "TYPE" (
        "THESIS"	INTEGER NOT NULL,
        "TYPE"	VARCHAR(25),
        PRIMARY KEY("THESIS","TYPE"),
        FOREIGN KEY("THESIS") REFERENCES "THESIS"("ID_THESIS")
    )`,
            `CREATE TABLE IF NOT EXISTS "VIRTUAL_CLOCK" (
        "data"	VARCHAR(50)
    )`
        ];

        db.serialize(() => {
            tables.forEach(sql => {
                db.run(sql, (err) => {
                    if (err) {
                        reject(err);
                    }
                });
            });
        });
        dbModule.init(db);
        resolve();
    });
}


exports.insertDegree = (n) => {
    return new Promise((resolve, reject) => {
        const query = `INSERT INTO "DEGREE" ("COD_DEGREE","TITLE_DEGREE") VALUES (?, ?)`;
        db.run(query, ["cod_deg" + n, "title" + n], function (err) {
            if (err) {
                console.error("Errore durante l'inserimento:", err);
                reject(err);
            } else {
                resolve();
            }
        });
    });
}

exports.insertGroup = (n) => {
    return new Promise((resolve, reject) => {
        const query = `INSERT INTO "GROUP" ("COD_GROUP","NAME") VALUES (?, ?)`;
        db.run(query, ["cod_group" + n, "name" + n], function (err) {
            if (err) {
                console.error("Errore durante l'inserimento:", err);
                reject(err);
            } else {
                resolve();
            }
        });
    });
}

exports.insertDepartment = (n) => {
    return new Promise((resolve, reject) => {
        const query = `INSERT INTO "DEPARTMENT" ("COD_DEPARTMENT","NAME") VALUES (?, ?)`;
        db.run(query, ["cod_dep" + n, "name" + n], function (err) {
            if (err) {
                console.error("Errore durante l'inserimento:", err);
                reject(err);
            } else {
                resolve();
            }
        });
    });
}

exports.insertStudent = (n) => {
    return new Promise((resolve, reject) => {
        const query = `INSERT INTO "STUDENT" ("ID","NAME","SURNAME","GENDER","NATIONALITY","EMAIL","ENROLLMENT_YEAR","COD_DEGREE") VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
        db.run(query, ["id" + n, "name" + n, "surname" + n, "gender" + n, "nationaliy" + n, "enrollament_y" + n, "cod_d" + n], function (err) {
            if (err) {
                console.error("Errore durante l'inserimento:", err);
                reject(err);
            } else {
                resolve();
            }
        });
    });
}

exports.insertCarrer = (n, date) => {
    return new Promise((resolve, reject) => {
        const query = `INSERT INTO "CAREER" ("ID","COD_COURSE","TITLE_COURSE","CFU","GRADE","DATE") VALUES (?, ?, ?, ?, ?, ?)`;
        db.run(query, ["id" + n, "cod_c" + n, "title_c" + n, "cfu" + n, n, date], function (err) {
            if (err) {
                console.error("Errore durante l'inserimento:", err);
                reject(err);
            } else {
                resolve();
            }
        });
    });
}

exports.insertThesis = (n, date) => {
    return new Promise((resolve, reject) => {
        const query = `INSERT INTO "THESIS" ("ID_THESIS","TITLE","DESCRIPTION","REQUIRED_KNOWLEDGE","NOTES","EXPIRATION_DATE","LEVEL","DEGREE","SUPERVISOR") VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        db.run(query, [n, "title" + n, "description" + n, "req_know" + n, "notes" + n, date, "level" + n, "degree" + n, "supervisor" + n], function (err) {
            if (err) {
                console.error("Errore durante l'inserimento:", err);
                reject(err);
            } else {
                resolve();
            }
        });
    });
}

exports.insertThesisAppliation = (n, state, date) => {
    return new Promise((resolve, reject) => {
        const query = `INSERT INTO "THESIS_APPLICATION" ("ID_APPLICATION","STUDENT","THESIS","STATE","APPLICATION_DATE") VALUES (?, ?, ?, ? ,?)`;
        db.run(query, [n, "student" + n, n, state, date], function (err) {
            if (err) {
                console.error("Errore durante l'inserimento:", err);
                reject(err);
            } else {
                resolve();
            }
        });
    });
}

exports.insertCoSupervisor = (n) => {
    return new Promise((resolve, reject) => {
        const query = `INSERT INTO "CO_SUPERVISOR" ("THESIS","NAME","SURNAME","EMAIL") VALUES (?, ?, ?, ?)`;
        db.run(query, [n, "name" + n, "surname" + n, "email" + n], function (err) {
            if (err) {
                console.error("Errore durante l'inserimento:", err);
                reject(err);
            } else {
                resolve();
            }
        });
    });
}

exports.insertThesisStatus = (n, state) => {
    return new Promise((resolve, reject) => {
        const query = `INSERT INTO "THESIS_STATUS" ("THESIS","STATE") VALUES (?, ?)`;
        db.run(query, [n, state], function (err) {
            if (err) {
                console.error("Errore durante l'inserimento:", err);
                reject(err);
            } else {
                resolve();
            }
        });
    });
}

exports.insertType = (n) => {
    return new Promise((resolve, reject) => {
        const query = `INSERT INTO "TYPE" ("THESIS","TYPE") VALUES (?, ?)`;
        db.run(query, [n, "type" + n], function (err) {
            if (err) {
                console.error("Errore durante l'inserimento:", err);
                reject(err);
            } else {
                resolve();
            }
        });
    });
}

exports.insertKeyword = (n) => {
    return new Promise((resolve, reject) => {
        const query = `INSERT INTO "KEYWORD" ("THESIS","KEYWORD") VALUES (?, ?)`;

        db.run(query, [n, "keyword" + n], function (err) {
            if (err) {
                console.error("Errore durante l'inserimento:", err);
                reject(err);
            } else {
                resolve();
            }
        });
    });
}

exports.insertTeacher = (n) => {
    return new Promise((resolve, reject) => {
        const query = `INSERT INTO "TEACHER" ("ID","NAME","SURNAME","EMAIL","COD_GROUP","COD_DEPARTMENT") VALUES (?, ?, ?, ?, ?, ?)`;

        db.run(query, [n, "name" + n, "surname" + n, "email" + n, "cod_g" + n, "cod_d" + n], function (err) {
            if (err) {
                console.error("Errore durante l'inserimento:", err);
                reject(err);
            } else {
                resolve();
            }
        });
    });
}