import { Action } from 'action/Action';
import { SendSms } from 'action/SendSms';
import { ActionObject } from 'model/ActionObject';
import { ActionType } from 'enum/Action';
import { logger } from "logger";

describe('Condition tests', () => {
  describe('execute()', () => {
    it('should log sms message and number', () => {
      const consoleInfoSpy = jest.spyOn(logger, 'info').mockImplementation((): any => {});

      const actionObject: ActionObject = {
        type: ActionType.SEND_SMS,
        phoneNumber: '+1234567890',
        message: 'Test SMS message'
      };

      const action: Action = new SendSms(actionObject);
      action.execute();

      expect(consoleInfoSpy).toHaveBeenCalledWith('Sending SMS to +1234567890: Test SMS message');

      consoleInfoSpy.mockRestore();
    });
  });
});
