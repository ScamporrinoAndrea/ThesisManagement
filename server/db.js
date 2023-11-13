'use strict';

const sqlite = require('sqlite3');
const crypto = require('crypto');
const { Console } = require('console');


const db = new sqlite.Database('thesis_management.db', (err) => {
    if(err) throw err;
  });
  


  exports.getKeywords = () => {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT DISTINCT keyword FROM KEYWORD';
      db.all(sql, [], (err, rows) => {
        if (err) { 
            reject(err); 
            return;
        }
        else {
            let keywords=[];
            rows.forEach((elem)=>(
                keywords.push(elem.KEYWORD)
            ));
            resolve(keywords);
        }
      });
    });
  };
  

  exports.getTypes = () => {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT DISTINCT type FROM TYPE';
      db.all(sql, [], (err, rows) => {
        if (err) { 
            reject(err); 
            return;
        }
        else {
            let types=[];
            rows.forEach((elem)=>
                types.push(elem.TYPE)
            )
            resolve(types)
        }
      });
    });
  };
  
  exports.getTeachers = () => {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT NAME,SURNAME, EMAIL FROM TEACHER';
      db.all(sql, [], (err, rows) => {
        if (err) { 
            reject(err); 
            return;
        }
        else {
            const teachers=rows.map((elem)=>({
                name: elem.NAME,
                surname: elem.SURNAME,
                email: elem.EMAIL
            }));

            resolve(teachers)
        }
      });
    });
  };

  exports.getCdS = () => {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM DEGREE';
      db.all(sql, [], (err, rows) => {
        if (err) { 
            reject(err); 
            return;
        }
        else {
            const cds=rows.map((elem)=> ({
                cod_degree: elem.COD_DEGREE,
                title_degree: elem.TITLE_DEGREE
            }))
            resolve(cds)
        }
      });
    });
  };

  exports.getGroupSupervisorAndCoSupervisor = (idThesis) => {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT G.name as group_name, g.cod_group as cod_group FROM TEACHER TE JOIN CO_SUPERVISOR CS ON TE.EMAIL = CS.email join "GROUP" G ON G.cod_group = TE.cod_group WHERE  CS.THESIS=? UNION SELECT  G.name as group_name, g.cod_group as cod_group FROM TEACHER TE JOIN THESIS T ON T.SUPERVISOR = TE.ID join "GROUP" G ON G.cod_group = TE.cod_group WHERE T.id_thesis=?';
      db.all(sql, [idThesis, idThesis], (err, rows) => {
        if (err) { 
            reject(err); 
            return;
        }
        else {
            const groups=rows.map((elem)=> ({
                cod_group: elem.cod_group,
                group_name: elem.group_name,
            }))
            resolve(groups)
        }
      });
    });
  };

  exports.insertThesis = (title,description,req_know,notes,exp_date,level,degree,supervisor) => {
    return new Promise((resolve, reject) => {
      const sql = 'INSERT INTO thesis (title, description, required_knowledge, notes, expiration_date, level, degree, supervisor) VALUES(?, ?, ?, ?, ?, ?, ?, ?)';
      db.run(sql, [title,description,req_know,notes,exp_date,level,degree,supervisor], function (err) {
        if (err) {
          console.log(err)
          reject(err);
          return;
        }
        resolve(this.lastID);
      });
    });
  };

  exports.insertCoSupervisor = (id, name, surname, email) => {
    return new Promise((resolve, reject) => {
      const sql = 'INSERT INTO co_supervisor (thesis, name, surname, email) VALUES(?, ?, ?, ?)';
      db.run(sql, [id, name, surname, email], function (err) {
        if (err) {
          console.log(err)
          reject(err);
          return;
        }
        resolve(this.lastID);
      });
    });
  };

  exports.insertKeyword = (id, keyword) => {
    return new Promise((resolve, reject) => {
      const sql = 'INSERT INTO keyword (thesis, keyword) VALUES(?, ?)';
      db.run(sql, [id, keyword], function (err) {
        if (err) {
          console.log(err)
          reject(err);
          return;
        }
        resolve(this.lastID);
      });
    });
  };


