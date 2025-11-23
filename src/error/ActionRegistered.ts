import { ActionType } from 'enum/Action';

export class ActionRegistered extends Error {
  constructor(actionType: ActionType) {
    super(`Action of type '${actionType}' was already registered.`);
  }
}
