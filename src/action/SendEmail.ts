import { ActionType } from 'enum/Action';
import { Action } from 'action/Action';
import { ActionObject } from 'model/ActionObject';
import { logger } from 'logger';

export class SendEmail implements Action {
  public static type: string = ActionType.SEND_EMAIL;
  private readonly sender: string;
  private readonly receiver: string;
  private readonly message: string;

  public constructor(node: ActionObject) {
    this.sender = node.sender as string;
    this.receiver = node.receiver as string;
    this.message = node.message as string;
  }

  public execute(): void {
    logger.info(`Sending Email from ${this.sender} to ${this.receiver}: ${this.message}`);
  }
}
