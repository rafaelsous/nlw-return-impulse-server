"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const submit_feedback_service_1 = require("./submit-feedback-service");
const createFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn();
const submitFeedbackService = new submit_feedback_service_1.SubmitFeedbackService({ create: createFeedbackSpy }, { sendMail: sendMailSpy });
describe('Submit feedback', () => {
    it('should be able to submit a feedback', async () => {
        await expect(submitFeedbackService.execute({
            type: 'BUG',
            comment: 'My test comment',
            screenshot: 'data:image/png;base64',
        })).resolves.not.toThrow();
        expect(createFeedbackSpy).toHaveBeenCalled();
        expect(sendMailSpy).toHaveBeenCalled();
    });
    it('should not be able to submit a feedback without type', () => {
        expect(submitFeedbackService.execute({
            type: '',
            comment: 'My test comment',
            screenshot: 'data:image/png;base64',
        })).rejects.toThrowError();
    });
    it('should not be able to submit a feedback without comment', () => {
        expect(submitFeedbackService.execute({
            type: 'BUG',
            comment: '',
            screenshot: 'data:image/png;base64',
        })).rejects.toThrowError();
    });
    it('should not be able to submit a feedback with invalid screenshot format', () => {
        expect(submitFeedbackService.execute({
            type: 'BUG',
            comment: 'My test comment',
            screenshot: 'test.png',
        })).rejects.toThrowError();
    });
});
