import MiniSearch from 'minisearch';
import crops from '../data/crops.json';

import { CommandModule, Argv, Options, ArgumentsCamelCase } from 'yargs';

export interface MyOptions extends Options {
  query: string;
}

export class CropsCommand<U extends MyOptions> implements CommandModule<{}, U> {
  public command = 'crops [query]';
  public describe = 'search for crops';

  public builder = (args: Argv): Argv<U> => {
    args.positional('query', {
      describe: 'query',
    });
    return args as unknown as Argv<U>;
  };

  public handler = async (args: ArgumentsCamelCase<U>) => {
    let miniSearch = new MiniSearch({
      fields: ['name', 'seed.name'], // fields to index for full-text search
      storeFields: ['name', 'price', 'phaseDays'], // fields to return with search results
      searchOptions: {
        fuzzy: 0.2,
      },
    });

    // Index all documents
    miniSearch.addAll(
      Object.values(crops).map((crop) => ({ ...crop, id: crop.indexOfHarvest }))
    );

    let results = miniSearch.search(args.query);
    console.log(results);
  };
}
