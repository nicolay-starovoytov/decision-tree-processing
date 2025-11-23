import { ActionType } from 'enum/Action';
import { Action } from 'action/Action';
import { ActionObject } from 'model/ActionObject';
import { actionFactory } from 'ActionFactory';

export class Condition implements Action {
  public static type: ActionType = ActionType.CONDITION;
  private readonly expression: string;
  private readonly trueActions: ActionObject[];
  private readonly falseActions: ActionObject[];

  public constructor(node: ActionObject) {
    this.expression = node.expression as string;
    this.trueActions = node.trueActions as ActionObject[];
    this.falseActions = node.falseActions as ActionObject[];
  }

  public execute(): void {
    Condition.runActions(eval(this.expression) ? this.trueActions : this.falseActions);
  }

  private static runActions(actions: ActionObject[]): void {
    const subActions: Action[] = actions.map(actionFactory.createAction);
    for (const action of subActions) {
      action.execute();
    }
  }
}
