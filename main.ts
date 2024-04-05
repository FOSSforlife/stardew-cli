// Usage: tsx main.ts crops parsnip
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import MiniSearch from 'minisearch';
import crops from './data/crops.json';

let miniSearch = new MiniSearch({
  fields: ['name', 'seed.name'], // fields to index for full-text search
  storeFields: ['name', 'price', 'phaseDays'], // fields to return with search results
});

// Index all documents
miniSearch.addAll(
  Object.values(crops).map((crop) => ({ ...crop, id: crop.indexOfHarvest }))
);

yargs(hideBin(process.argv))
  .command(
    'crops [query]',
    'search for crops',
    (yargs) => {
      return yargs.positional('query', {
        describe: 'query',
      });
    },
    (argv) => {
      let results = miniSearch.search(argv.query as string);
      console.log(results);
    }
  )
  .parse();
