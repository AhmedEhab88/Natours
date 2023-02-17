const express = require('express');
const fs = require('fs');

const tours = JSON.parse(
    fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

const getTours = (req, res) => {
    res.status(200).json({
        status: 'success',
        requestedAt: req.requestTime,
        count: tours.length,
        data: {
            tours: tours,
        },
    });
};

const getTour = (req, res) => {
    const id = req.params.id * 1;
    const tour = tours.find((el) => el.id === id);

    if (!tour) {
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid ID',
        });
    }

    res.status(200).json({
        status: 'success',
        data: {
            tour,
        },
    });
};

const createTour = (req, res) => {
    const newId = tours[tours.length - 1].id + 1;
    const newTour = Object.assign({ id: newId }, req.body);

    tours.push(newTour);

    fs.writeFile(
        `${__dirname}/dev-data/data/tours-simple.json`,
        JSON.stringify(tours),
        (err) => {
            res.status(201).json({
                status: 'success',
                data: {
                    tour: newTour,
                },
            });
        }
    );
};

const updateTour = (req, res) => {
    if (req.params.id * 1 > tours.length) {
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid ID',
        });
    }

    res.status(200).json({
        status: 'success',
        message: '<Updated tour here...>',
    });
};

const deleteTour = (req, res) => {
    if (req.params.id * 1 > tours.length) {
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid ID',
        });
    }

    res.status(204).json({
        status: 'success',
    });
};

const router = express.Router();

router
    .route('/')
    .get(getTours)
    .post(createTour);
router
    .route('/:id')
    .get(getTour)
    .patch(updateTour)
    .delete(deleteTour);

module.exports = router;