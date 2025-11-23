import { ActionType } from 'enum/Action';
import { Action } from 'action/Action';
import { ActionObject } from 'model/ActionObject';
import { logger } from 'logger';

export class SendSms implements Action {
  public static type: ActionType = ActionType.SEND_SMS;
  private readonly phoneNumber: string;
  private readonly message: string;

  public constructor(node: ActionObject) {
    this.phoneNumber = node.phoneNumber as string;
    this.message = node.message as string;
  }

  public execute(): void {
    logger.info(`Sending SMS to ${this.phoneNumber}: ${this.message}`);
  }
}
