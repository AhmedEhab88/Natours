// exports.checkID = (req, res, next, val) => {
//     console.log(`Tour ID is ${val}`);

//     if (req.params.id * 1 > tours.length) {
//         return res.status(404).json({
//             status: 'fail',
//             message: 'Invalid ID',
//         });
//     }

//     next();
// };

const Tour = require('../models/tourModel');

exports.getTours = async (req, res) => {
    try {
        // BUILD THE QUERY

        //1) Filtering

        //Hard copy of the req.query object
        const queryObj = { ...req.query };
        const excludedFields = ['page', 'limit', 'sort', 'fields'];
        excludedFields.forEach((el) => delete queryObj[el]);

        //2) Advanced Filtering
        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(
            /\b(gte|gt|lt|lte)\b/g,
            (match) => `$${match}`
        );

        const query = Tour.find(JSON.parse(queryStr));

        //EXECUTE THE QUERY
        const tours = await query;

        // const query = Tour.find().where('duration').equals(5);

        //RETURN THE RESPONSE
        res.status(200).json({
            status: 'success',
            requestedAt: req.requestTime,
            count: tours.length,
            data: {
                tours: tours,
            },
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err,
        });
    }
};

exports.getTour = async (req, res) => {
    try {
        const tour = await Tour.findById(req.params.id);
        res.status(200).json({
            status: 'success',
            data: {
                tour,
            },
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err,
        });
    }
};

exports.createTour = async (req, res) => {
    try {
        // const newTour = new Tour({});
        // newTour.save();

        const newTour = await Tour.create(req.body);

        res.status(201).json({
            status: 'success',
            data: {
                tour: newTour,
            },
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: 'Invalid data sent!',
        });
    }
};

exports.updateTour = async (req, res) => {
    try {
        const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true, //This is to run all the validators while updating to check if incoming req is correct.
        });
        res.status(200).json({
            status: 'success',
            data: {
                tour,
            },
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err,
        });
    }
};

exports.deleteTour = async (req, res) => {
    try {
        await Tour.findByIdAndDelete(req.params.id);

        res.status(204).json({
            status: 'success',
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err,
        });
    }
};
