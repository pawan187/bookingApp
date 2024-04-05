const fs = require('fs')
const cvsParser = require('csv-parser')
const {Sequelize, QueryTypes} = require('sequelize');
const moment = require('moment')

let readSequelize
let writeSequelize

const initDb = async ()=>{
    readSequelize = new Sequelize(
        "demo",
          "root",
          "root123", {
          host: "localhost",
          dialect: 'mysql',
          pool: {
            max: 1000,
            min: 0,
            acquire: 30000,
            idle: 10000
          }
      });
    writeSequelize = new Sequelize(
        "demo",
          "root",
          "root123", {
          host: "localhost",
          dialect: 'mysql',
          pool: {
            max: 1000,
            min: 0,
            acquire: 30000,
            idle: 10000
          }
      });
}

const data = []
const insertCustomers = async (data)=>{
    let query = `INSERT INTO demo.customers (id, name) VALUES :insertData`
    const insertData = data.map((e) => {
        return [ e['id'], e['name']];
    });
    const result = await writeSequelize.query(query, { replacements:{insertData}, type: QueryTypes.INSERT, raw: true })
    return result
}

const insertBooks = async (data)=>{
    console.log(data)
    let query = `INSERT IGNORE INTO demo.books (id, author_name, book_name) VALUES :insertData`
    const insertData = data.map((e) => {
        return [ e['id'], e['author_name'], e['book_name']];
    });
    const result = await writeSequelize.query(query, { replacements:{insertData}, type: QueryTypes.INSERT, raw: true })
    return result
}

const insertBookings = async (data)=>{
    console.log(data)
    let query = `INSERT INTO demo.bookingDetails (customerId, bookId, lend_date, days_to_return) VALUES :insertData`
    const insertData = data.map((e) => {
        return [ e['customerId'], e['bookId'], e['lend_date'], e['days_to_return']];
    });
    const result = await writeSequelize.query(query, { replacements:{insertData}, type: QueryTypes.INSERT, raw: true })
    return result
}

const writeToDB = async (data)=>{
    // const customers = []
    // const books = []
    const bookings = []
    for(let row of data){
        // let customer = {
        //     'id': row.customer_id, 
        //     'name': row.customer_name
        // }
        // customers.push(customer)
        for(let book of JSON.parse(row.books)){
            let bookDetails = {
                'customerId' : row.customer_id,
                'bookId': book.book_id,
                'lend_date': book.lend_date,
                'days_to_return':book.days_to_return
            }
            bookings.push(bookDetails)
        }
    }
    // await insertCustomers(customers)
    // await insertBooks(books)
    // await insertBookings(bookings)
}

const mainFunction = async ()=>{
    await initDb()

    fs.createReadStream('data.csv')
    .pipe(cvsParser())
    .on('data',(row)=>{
        data.push(row)
    })
    .on('end',async ()=>{
        await  writeToDB(data)
    })
}

mainFunction()