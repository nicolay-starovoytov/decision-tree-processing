import { ActionType } from 'enum/Action';
import { Action } from 'Action';
import { logger } from 'logger';

export class SendEmail implements Action {
  public static type: string = ActionType.SEND_EMAIL;
  private readonly sender: string;
  private readonly receiver: string;
  private readonly message: string;

  public constructor(node: any) {
    this.sender = node.sender;
    this.receiver = node.receiver;
    this.message = node.message;
  }

  public execute(): void {
    logger.info(`Sending Email from ${this.sender} to ${this.receiver}: ${this.message}`);
  }
}
