import { SubmitFeedbackUseCase } from "./submit-feedback-use-case";

const createFeedbackSpy = jest.fn();
const sendEmailSpy = jest.fn();

const submitFeedback = new SubmitFeedbackUseCase(
  { create: createFeedbackSpy },
  { sendMail: sendEmailSpy }
);

describe('Submit feedback', () => {
  it('should be able to submit feedback', async () => {
    // Espera que quando chamar a função ela finalize e não retorne nenhum erro
    await expect(submitFeedback.execute({
      type: 'BUG',
      comment: 'example comment',
      screenshot: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUg',
    })).resolves.not.toThrow();

    expect(createFeedbackSpy).toHaveBeenCalled();
    expect(sendEmailSpy).toHaveBeenCalled();
  });

  it('should not be able to submit feedback without type', async () => {
    // Espera que quando chamar a função ela finalize e retorne um erro
    await expect(submitFeedback.execute({
      type: '',
      comment: 'example comment',
      screenshot: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUg',
    })).rejects.not.toThrow();
  });

  it('should not be able to submit feedback without comment', async () => {
    // Espera que quando chamar a função ela finalize e retorne um erro
    await expect(submitFeedback.execute({
      type: 'BUG',
      comment: '',
      screenshot: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUg',
    })).rejects.not.toThrow();
  });

  it('should not be able to submit feedback with an invalid screenshot', async () => {
    // Espera que quando chamar a função ela finalize e retorne um erro
    await expect(submitFeedback.execute({
      type: 'BUG',
      comment: 'ta tudo bugado',
      screenshot: 'test.jpg',
    })).rejects.not.toThrow();
  });
});
