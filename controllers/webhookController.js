const Webhook = require("../model/webhook");
const City = require("../model/city");
const helper = require("../config/helper");

exports.getWebhooksInCity = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (!id) return next(new Error("Id is required", 400));
        const city = await City.findByPk(id, {
            include: ["webhooks", "temperatures"]
        });

        // Send using axios to each of the urls
        res.status(200).json({
            status: "success",
            message: "City Webhooks retrieved successfully",
            response: city
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
};

exports.postWebhook = async (req, res, next) => {
    try {
        let request = ["cityId", "callback_url"];
        let data = helper.validateParams(req, next, request);
        const cityId = data.cityId;
        const cityExists = await City.findByPk(cityId);
        if (!cityExists) return next(new Error("City not found", 404));
        const callback_url = data.callback_url;
        const webhook = await Webhook.create({
            cityId,
            callback_url
        });
        res.status(201).json({
            status: "success",
            message: "Webhook created successfully",
            response: webhook
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
};

exports.deleteWebhook = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (!id) return next(new Error("Id is required", 400));
        const webhook = await Webhook.findByPk(id);
        if (!webhook) return next(new Error("Webhook not found", 404));
        await webhook.destroy();
        res.status(200).json({
            status: "success",
            message: "Webhook deleted successfully",
            response: webhook
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
};

exports.demoUrl = async (req, res, next) => {
    // Create a demo url for the webhook
    try {
        let request = ["callback_url", "city_id", "min", "max", "timestamp"];
        let data = helper.validateParams(req, next, request);

        // Save to database or send as an email or text message

        res.status(200).json({
            status: "success",
            message: "Message received successfully",
            response: data
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
};