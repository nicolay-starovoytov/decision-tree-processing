import { ActionType } from 'enum/Action';
import { Action } from 'Action';
import { actionFactory } from "ActionFactory";

export class Loop implements Action {
  public static type: string = ActionType.LOOP;
  private readonly count: number;
  private readonly subtree: any[];

  public constructor(node: any) {
    this.count = node.count;
    this.subtree = node.subtree;
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
