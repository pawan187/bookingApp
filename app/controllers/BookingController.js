
const BookingsService = require('../Services/BookingsService')
const moment = require('moment')
const {configData} = require('../../config/config')

module.exports.getBookingDetails = async  (req,res,next) =>{
    const bookings = await BookingsService.fetchBookingDetails()

    return res.status(200).json(bookings);
}

module.exports.getAvailabilityOfBook = async (req,res,next) =>{
    const book_name = req.params.book_name
    if(!book_name){
        return res.send(400).send({'error_message' :'invalid params'})
    }
    console.log(book_name)
    const result = await BookingsService.fetchAvailabilityByBookName({'book_name' : book_name})
    console.log(result)
    if( result.length === 0){
        return res.status(404).send({'error_message' : 'Request resource is not found.'})
    }

    let latestAvailabilityDate = 0
    for(let row of result ){
        let returnDate = moment(row['lend_date'],'YYYY-MM-dd').add(['days_to_return'],'days')
        if(latestAvailabilityDate === 0){
            latestAvailabilityDate = returnDate
        }
        if(returnDate.valueOf() < latestAvailabilityDate.valueOf()){
            latestAvailabilityDate = returnDate
        }
    }
    const availability = latestAvailabilityDate.format('YYYY-MM-DD')
    return res.status(200).send({isAvailableOn: availability})
}

module.exports.getLendingCharge = async (req,res,next)=>{
    const data = req.body.data
    if(!data){
        return res.status(400).send({'error_message' :'invalid params'})
    }
    console.log(data)
    const query = {
        'customerId' : data['customerId'],
        'bookId': data['bookId']
    }
    const result = await BookingsService.fetchBooking(query)
    console.log(result)
    if( result.length === 0){
        return res.status(404).send({'error_message' : 'Request resource is not found.'})
    }

    let charges = configData.charges;
    let lendingCharges = { ...result[0], 'chages' : result[0]['days_to_return'] * charges }

    return res.status(200).send({charges: lendingCharges})
}