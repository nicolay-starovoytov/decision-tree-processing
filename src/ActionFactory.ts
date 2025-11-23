import { ActionType } from 'enum/Action';
import { Action } from 'Action';
import { actionRegistry } from 'ActionRegistry';

export class ActionFactory {
  private static instance: ActionFactory | null = null;

  public static getInstance(): ActionFactory {
    if (this.instance === null) {
      this.instance = new ActionFactory();
    }
    return this.instance;
  }

  public createAction(node: { type: ActionType }): Action {
    const ActionClass = actionRegistry.getAction(node.type);
    return new ActionClass(node);
  }
}

export const actionFactory = ActionFactory.getInstance();
