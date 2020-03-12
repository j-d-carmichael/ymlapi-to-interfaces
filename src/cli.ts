import commander from 'commander';
import ParseThenOutput from '@/ParseThenOutput';

commander
  .option('-i, --input [path]', 'The relative path to the yml file eg "../rabbitmq/build/asyncapi.yml"')
  .option('-o, --output [path]', `The relative path to the output directory eg "./rabbitmq/interfaces/"`);
commander.parse(process.argv);

ParseThenOutput.init(commander.input, commander.output)
  .catch((e) => {
    console.error('SORRY SOMETHING WENT WRONG:');
    console.error(e);
  });
