const {sequelizeRead,sequelizeWrite} = require('../database/db')
const {QueryTypes} = require('sequelize')

const addColumn = async () =>{
    let query = `ALTER TABLE books ADD COLUMN type VARCHAR(255);`
    const result = await sequelizeWrite.query(query, { type: QueryTypes.INSERT, raw: true })
    return result
}

const updateBooksType = async()=>{
    let query = `UPDATE books
        SET type = CASE 
                    WHEN RAND() < 0.33 THEN 'Regular'
                    WHEN RAND() < 0.66 THEN 'Fiction'
                    ELSE 'Novel'
                END;`
    const result = await sequelizeWrite.query(query, { type: QueryTypes.INSERT, raw: true })
    return result
}

updateBooksType()