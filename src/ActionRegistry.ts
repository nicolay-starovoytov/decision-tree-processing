import { ActionRegistered } from 'error/ActionRegistered';
import { ActionNotRegistered } from 'error/ActionNotRegistered';
import { ActionType } from 'enum/Action';
import { ActionObject } from 'model/ActionObject';
import { Action } from 'action/Action';

export class ActionRegistry {
  private static instance: ActionRegistry | null = null;

  private readonly actions: Map<ActionType, new (node: ActionObject) => Action> = new Map();

  public static getInstance(): ActionRegistry {
    if (this.instance === null) {
      this.instance = new ActionRegistry();
    }
    return this.instance;
  }

  public registerAction(type: ActionType, action: new (node: ActionObject) => Action): void {
    if (this.actions.has(type)) {
      throw new ActionRegistered(type);
    }

    this.actions.set(type, action);
  }

  public getAction(type: ActionType): new (node: ActionObject) => Action {
    const action = this.actions.get(type);
    if (!action) {
      throw new ActionNotRegistered(type);
    }
    return action;
  }
}

export const actionRegistry = ActionRegistry.getInstance();
