
const router = require('express').Router();


const ControllersPath = '../app/controllers/';
const BookingController = require(`${ControllersPath}BookingController`);

router.get('/', BookingController.getBookingDetails)
router.get('/book-availability/:book_name',BookingController.getAvailabilityOfBook)
router.post('/lending-charges',BookingController.getLendingCharge)
router.post('/lending-charges-with-charges',BookingController.getLendingChargeWithType)

module.exports = router;
