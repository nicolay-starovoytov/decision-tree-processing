import { Action } from 'action/Action';
import { Loop } from 'action/Loop';
import { ActionObject } from 'model/ActionObject';
import { ActionType } from 'enum/Action';
import { actionFactory } from 'ActionFactory';

describe('Loop tests', () => {
  describe('execute()', () => {
    it('should execute subtree actions specified number of times', () => {
      const mockAction1: Action = { execute: jest.fn() };
      const mockAction2: Action = { execute: jest.fn() };

      const actionFactoryCreateActionSpy = jest.spyOn(actionFactory, 'createAction');
      actionFactoryCreateActionSpy.mockReturnValueOnce(mockAction1).mockReturnValueOnce(mockAction2);

      const loopNode: ActionObject = {
        type: ActionType.LOOP,
        count: 3,
        subtree: [
          { type: ActionType.SEND_SMS },
          { type: ActionType.SEND_EMAIL }
        ]
      };

      const loopAction = new Loop(loopNode);

      loopAction.execute();

      expect(actionFactoryCreateActionSpy).toHaveBeenCalledTimes(2);
      expect(mockAction1.execute).toHaveBeenCalledTimes(3);
      expect(mockAction2.execute).toHaveBeenCalledTimes(3);
    });
  });
});
