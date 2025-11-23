import { ActionType } from 'enum/Action';
import { Action } from 'action/Action';
import { actionFactory } from 'ActionFactory';
import { ActionObject } from 'model/ActionObject';

export class Loop implements Action {
  public static type: ActionType = ActionType.LOOP;
  private readonly count: number;
  private readonly subtree: ActionObject[];

  public constructor(node: ActionObject) {
    this.count = node.count as number;
    this.subtree = node.subtree as ActionObject[];
  }

  public execute(): void {
    const subActions: Action[] = this.subtree.map(actionFactory.createAction);
    for (let i = 0; i < this.count; i++) {
      for (const action of subActions) {
        action.execute();
      }
    }
  }
}
