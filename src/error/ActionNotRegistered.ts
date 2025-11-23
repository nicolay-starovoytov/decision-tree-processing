import { ActionType } from 'enum/Action';

export class ActionNotRegistered extends Error {
  constructor(actionType: ActionType) {
    super(`Action of type '${actionType}' was not registered.`);
  }
}
