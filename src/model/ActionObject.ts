import { ActionType } from 'enum/Action';

export interface ActionObject {
  type: ActionType;
  [key: string]: string | number | ActionObject | ActionObject[];
}
