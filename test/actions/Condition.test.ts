import { Action } from 'action/Action';
import { Condition } from 'action/Condition';
import { ActionObject } from 'model/ActionObject';
import { ActionType } from 'enum/Action';
import { actionFactory } from 'ActionFactory';

describe('Condition tests', () => {
  describe('execute()', () => {
    let trueActionMock: Action;
    let falseActionMock: Action;

    beforeEach(() => {
      trueActionMock = { execute: jest.fn() };
      falseActionMock = { execute: jest.fn() };
    });

    it('should run trueActions when expression is true', () => {
      const actionObject: ActionObject = {
        type: Condition.type,
        expression: '5 > 3',
        trueActions: [{ type: ActionType.SEND_SMS }],
        falseActions: [{ type: ActionType.SEND_EMAIL }]
      };

      const conditionAction = new Condition(actionObject);

      jest.spyOn(actionFactory, 'createAction')
        .mockImplementation((action) => {
          if (action.type === ActionType.SEND_SMS) {
            return trueActionMock
          }
          if (action.type === ActionType.SEND_EMAIL) {
            return falseActionMock
          }
          throw new Error('Unknown action type');
        });

      conditionAction.execute();

      expect(trueActionMock.execute).toHaveBeenCalled();
      expect(falseActionMock.execute).not.toHaveBeenCalled();
    });

    it('should run falseActions when expression is false', () => {
      const actionObject: ActionObject = {
        type: Condition.type,
        expression: '5 < 3',
        trueActions: [{ type: ActionType.SEND_SMS }],
        falseActions: [{ type: ActionType.SEND_EMAIL }]
      };

      const conditionAction = new Condition(actionObject);

      jest.spyOn(actionFactory, 'createAction')
        .mockImplementation((action) => {
          if (action.type === ActionType.SEND_SMS) {
            return trueActionMock
          }
          if (action.type === ActionType.SEND_EMAIL) {
            return falseActionMock
          }
          throw new Error('Unknown action type');
        });

      conditionAction.execute();

      expect(trueActionMock.execute).not.toHaveBeenCalled();
      expect(falseActionMock.execute).toHaveBeenCalled();
    });
  });
});
