const City = require('../model/city');
const helper = require('../config/helper');

exports.createCity = async (req, res, next) => {
    try {
        let request = ['name', 'latitude', 'longitude'];
        let data = helper.validateParams(req, next, request);
        const name = data.name;
        const latitude = data.latitude;
        const longitude = data.longitude;
        const city = await City.create({
            name,
            latitude,
            longitude
        })
        res.status(201).json({
            status: 'success',
            message: 'City created successfully',
            response: city
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
};

exports.updateCity = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (!id) return next(new Error('Id is required', 400));
        const { name, latitude, longitude } = req.body;
        const city = await City.findByPk(id);
        if (!city) return next(new Error('City not found', 404));
        const updatedCity = await city.update({
            name: name || city.name,
            latitude: latitude || city.latitude,
            longitude: longitude || city.longitude
        });
        res.status(200).json({
            status: 'success',
            message: 'City updated successfully',
            response: updatedCity
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
};

exports.deleteCity = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (!id) return next(new Error('Id is required', 400));
        const city = await City.findByPk(id);
        if (!city) return next(new Error('City not found', 404));
        await city.destroy();
        res.status(200).json({
            status: 'success',
            message: 'City deleted successfully',
            response: city
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
};