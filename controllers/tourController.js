// exports.checkID = (req, res, next, val) => {
//     console.log(`Tour ID is ${val}`);

const Tour = require("../models/tourModel");

//     if (req.params.id * 1 > tours.length) {
//         return res.status(404).json({
//             status: 'fail',
//             message: 'Invalid ID',
//         });
//     }

//     next();
// };

exports.getTours = (req, res) => {
    res.status(200).json({
        status: 'success',
        requestedAt: req.requestTime,
        // count: tours.length,
        // data: {
        //     tours: tours,
        // },
    });
};

exports.getTour = (req, res) => {
    const id = req.params.id * 1;

    res.status(200).json({
        status: 'success',
        // data: {
        //   tour,  
        // },
    });
};

exports.createTour = async (req, res) => {
    try {
        // const newTour = new Tour({});
        // newTour.save();

        const newTour = await Tour.create(req.body);

        res.status(201).json({
            status: "success",
            data: {
                tour: newTour,
            },
        });

    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: 'Invalid data sent!'
        });
    }


};

exports.updateTour = (req, res) => {
    res.status(200).json({
        status: 'success',
        message: '<Updated tour here...>',
    });
};

exports.deleteTour = (req, res) => {
    res.status(204).json({
        status: 'success',
    });
};
