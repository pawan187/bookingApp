module.exports.configData = {
    'oldcharges' : 1,
    'charges' : {
        'Regular': 1.5, 
        'Fiction': 3,
        'Novel' : 1.5
    },
    'chargesByDays' : {
        'Regular': {
            'minimumDays' : 2,
            'minimumRent' : 2,
            'normalRent' : 1.5,
        }, 
        'Fiction': {
            'minimumDays' : 0,
            'minimumRent' : 0,
            'normalRent' : 3,
        },
        'Novel' : {
            'minimumDays' : 3,
            'minimumRent' : 4.5,
            'normalRent' : 1.5,
        }, 
    }
}