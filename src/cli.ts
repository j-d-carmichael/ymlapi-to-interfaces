import commander from 'commander';
import ParseThenOutput from '@/ParseThenOutput';

const inputArgs = commander
  .option('-i, --input [path]', 'The relative path to the yml file eg "../rabbitmq/build/asyncapi.yml"')
  .option('-o, --output [path]', `The relative path to the output directory eg "./rabbitmq/interfaces/"`);

ParseThenOutput.init(inputArgs.program.input, inputArgs.program.input)
  .catch((e) => {
    console.error('SORRY SOMETHING WENT WRONG:');
    console.error(e);
  });
