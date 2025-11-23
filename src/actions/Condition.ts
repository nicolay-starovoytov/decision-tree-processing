import { ActionType } from 'enum/Action';
import { Action } from 'Action';
import { actionFactory } from "ActionFactory";

export class Loop implements Action {
  public static type: string = ActionType.CONDITION;
  private readonly expression: string;
  private readonly trueActions: any[];
  private readonly falseActions: any[];

  public constructor(node: any) {
    this.expression = node.expression;
    this.trueActions = node.trueActions;
    this.falseActions = node.falseActions;
  }

  public execute(): void {
    Loop.runActions(eval(this.expression) ? this.trueActions : this.falseActions);
  }

  private static runActions(actions: any[]): void {
    const subActions: Action[] = actions.map(actionFactory.createAction);
    for (const action of subActions) {
      action.execute();
    }
  }
}
