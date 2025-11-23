import { ActionType } from 'enum/Action';
import { Action } from 'Action';
import { ActionObject } from 'model/ActionObject';
import { actionFactory } from "ActionFactory";

export class Loop implements Action {
  public static type: string = ActionType.CONDITION;
  private readonly expression: string;
  private readonly trueActions: ActionObject[];
  private readonly falseActions: ActionObject[];

  public constructor(node: ActionObject) {
    this.expression = node.expression as string;
    this.trueActions = node.trueActions as ActionObject[];
    this.falseActions = node.falseActions as ActionObject[];
  }

  public execute(): void {
    Loop.runActions(eval(this.expression) ? this.trueActions : this.falseActions);
  }

  private static runActions(actions: ActionObject[]): void {
    const subActions: Action[] = actions.map(actionFactory.createAction);
    for (const action of subActions) {
      action.execute();
    }
  }
}
