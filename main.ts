// Usage: tsx main.ts crops parsnip
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { CropsCommand } from './commands/crops';

const yargsParser = yargs(hideBin(process.argv));

for (const command of [new CropsCommand()]) {
  yargsParser.command(command);
}

yargsParser.parse();
