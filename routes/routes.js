
const router = require('express').Router();


const ControllersPath = '../app/controllers/';
const BookingController = require(`${ControllersPath}BookingController`);

router.get('/', BookingController.getBookingDetails)
router.get('/book-availability/:book_name',BookingController.getAvailabilityOfBook)

module.exports = router;
