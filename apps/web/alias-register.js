import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import moduleAlias from 'module-alias';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const rootDir = resolve(__dirname, 'src');
moduleAlias.addAliases({
  '@': rootDir,
  'app': resolve(rootDir, 'app'),
});
