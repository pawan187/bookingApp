const {sequelizeRead,sequelizeWrite} = require('../../database/db')
const {QueryTypes} = require('sequelize')

module.exports.fetchBookingDetails = async () =>{
    let query = `select b.name,c.book_name, a.lend_date, a.days_to_return from bookingDetails a join customers b on a.customerId = b.id join books c on a.bookId = c.id where a.days_to_return > 15  and a.lend_date > '2023-05-01';`
    const result = await sequelizeWrite.query(query, { type: QueryTypes.SELECT, raw: true })
    return result
}
module.exports.fetchAvailabilityByBookName = async (data) =>{
    let query = `select a.lend_date, a.days_to_return from bookingDetails a join books b on a.bookId = b.id where b.book_name = :book_name;`
    const result = await sequelizeWrite.query(query, { replacements : data, type: QueryTypes.SELECT, raw: true })
    return result
}