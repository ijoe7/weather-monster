const City = require("../model/city");
const Temperature = require("../model/temperature");
const helper = require("../config/helper");

exports.getForecast = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (!id) return next(new Error("Id is required", 400));
        const city = await City.findByPk(id, {
            include: ["temperatures"]
        });
        if (!city) return next(new Error("City not found", 404));
        let total_max = 0;
        let total_min = 0;
        for (let i = 0; i < city.temperatures.length; i++) {
            total_max += city.temperatures[i].max;
            total_min += city.temperatures[i].min;
        }
        response = {
            cityId: id,
            max: total_max / city.temperatures.length,
            min: total_min / city.temperatures.length,
            sample: city.temperatures.length
        }
        res.status(200).json({
            status: "success",
            message: "Forecast retrieved successfully",
            response
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
};