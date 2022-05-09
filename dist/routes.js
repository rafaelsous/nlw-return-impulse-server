"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const express_1 = __importDefault(require("express"));
const nodemailer_mail_adapter_1 = require("./adapters/nodemailer/nodemailer-mail-adapter");
const prisma_feedbacks_repository_1 = require("./repositories/prisma/prisma-feedbacks-repository");
const submit_feedback_service_1 = require("./services/submit-feedback-service");
exports.routes = express_1.default.Router();
exports.routes.post('/feedbacks', async (request, response) => {
    const { type, comment, screenshot } = request.body;
    const prismaFeedbacksRepository = new prisma_feedbacks_repository_1.PrismaFeedbacksRepository();
    const nodeMailerMailAdapter = new nodemailer_mail_adapter_1.NodeMailerMailAdapter();
    const submitFeedbackService = new submit_feedback_service_1.SubmitFeedbackService(prismaFeedbacksRepository, nodeMailerMailAdapter);
    await submitFeedbackService.execute({
        type,
        comment,
        screenshot,
    });
    return response.status(201).send();
});
