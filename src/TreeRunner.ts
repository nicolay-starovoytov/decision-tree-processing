import fs from 'fs';
import path from 'path';

import { actionFactory } from "ActionFactory";
import { actionRegistry } from "ActionRegistry";
import { ActionType } from "enum/Action";
import { Action } from "Action";

export class TreeRunner {
  private static readonly ACTIONS_FOLDER: string = 'actions';
  private static readonly ACTIONS_FILE_EXTENSION: string = '.ts';
  private static readonly FUNCTION: string = 'function';

  private static instance: TreeRunner | null = null;

  private actionsRegistered: boolean = false;

  public static getInstance(): TreeRunner {
    if (this.instance === null) {
      this.instance = new TreeRunner();
    }
    return this.instance;
  }

  public async run(tree: { actions: { type: ActionType }[] }): Promise<void> {
    await this.registerActions();
    const actions: Action[] = tree.actions.map(actionFactory.createAction);
    for (const action of actions) {
      action.execute();
    }
  }

  private async registerActions(): Promise<void> {
    if (this.actionsRegistered) {
      return;
    }

    const actionsDir = path.join(__dirname, TreeRunner.ACTIONS_FOLDER);
    const files = fs.readdirSync(actionsDir).filter(f => f.endsWith(TreeRunner.ACTIONS_FILE_EXTENSION));

    for (const file of files) {
      const filePath = path.join(actionsDir, file);

      const module = await import(filePath);
      const Class = module.default || module[Object.keys(module)[0]];
      if (typeof Class === TreeRunner.FUNCTION) {
        actionRegistry.registerAction(Class.type, Class);
      }
    }
    this.actionsRegistered = true;
  }
}

export const treeRunner = TreeRunner.getInstance();
