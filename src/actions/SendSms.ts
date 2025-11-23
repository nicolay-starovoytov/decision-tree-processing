import { ActionType } from 'enum/Action';
import { Action } from 'Action';
import { logger } from 'logger';

export class SendSms implements Action {
  public static type: string = ActionType.SEND_SMS;
  private readonly phoneNumber: string;
  private readonly message: string;

  public constructor(node: any) {
    this.phoneNumber = node.phoneNumber;
    this.message = node.message;
  }

  public execute(): void {
    logger.info(`Sending SMS to ${this.phoneNumber}: ${this.message}`);
  }
}
