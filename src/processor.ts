import yargs from 'yargs/yargs';
import { hideBin } from 'yargs/helpers';
import { logger } from 'logger';

import { treeRunner } from 'TreeRunner';
import { inputValidator } from "validator/InputValidator";

const options: any = yargs(hideBin(process.argv))
  .options({
    tree: {
      alias: 't',
      describe: 'Tree with actions to be processed in JSON format. See README for details',
      string: true,
      demandOption: true
    }
  })
  .check(inputValidator.validateJSONTree)
  .argv;

process.on('unhandledRejection', (error: Error) => {
  logger.error(`Error during processing tree: ${error.message}`);
});

(async () => {
  await treeRunner.run(JSON.parse(options.tree) as any);
})();
