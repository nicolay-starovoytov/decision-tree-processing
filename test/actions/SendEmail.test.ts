import { Action } from 'action/Action';
import { SendEmail } from 'action/SendEmail';
import { ActionObject } from 'model/ActionObject';
import { ActionType } from 'enum/Action';
import { logger } from 'logger';

describe('SendEmail tests', () => {
  describe('execute()', () => {
    it('should log email message, sender and receiver', () => {
      const consoleInfoSpy = jest.spyOn(logger, 'info').mockImplementation((): any => {});

      const actionObject: ActionObject = {
        type: ActionType.SEND_EMAIL,
        sender: 'sender@mail.com',
        receiver: 'receiver@mail.com',
        message: 'Test email message',
      };

      const action: Action = new SendEmail(actionObject);
      action.execute();

      expect(consoleInfoSpy).toHaveBeenCalledWith(
        `Sending Email from ${actionObject.sender} to ${actionObject.receiver}: ${actionObject.message}`
      );

      consoleInfoSpy.mockRestore();
    });
  });
});
