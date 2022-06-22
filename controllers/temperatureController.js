const Temperature = require("../model/temperature");
const City = require("../model/city");
const helper = require("../config/helper");

exports.postTemperature = async (req, res, next) => {
    try {
        let request = ['cityId', 'max', 'min'];
        let data = helper.validateParams(req, next, request);
        const cityId = data.cityId;
        const cityExists = await City.findByPk(cityId);
        if (!cityExists) return next(new Error("City not found", 404));
        const max = data.max;
        const min = data.min;
        const temperature = await Temperature.create({
            cityId,
            max,
            min
        });
        res.status(201).json({
            status: 'success',
            message: 'Temperature created successfully',
            response: temperature
        });

    } catch (error) {
        console.log(error);
        next(error);
    }
};
