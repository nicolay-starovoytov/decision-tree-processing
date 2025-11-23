export class InputValidator {
  private static instance: InputValidator | null = null;

  public static getInstance(): InputValidator {
    if (this.instance === null) {
      this.instance = new InputValidator();
    }
    return this.instance;
  }

  public validateJSONTree({ tree }: { tree: string }): boolean {
    let treeObj;
    try {
      treeObj = JSON.parse(tree);
    } catch (_err) {
      throw new Error(`Invalid JSON format for tree`);
    }

    if (!Array.isArray(treeObj.actions)) {
      throw new Error('JSON should contain actions property as array of actions');
    }
    return true;
  }
}

export const inputValidator = InputValidator.getInstance();
