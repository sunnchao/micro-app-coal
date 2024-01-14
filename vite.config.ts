import { ConfigEnv, UserConfig } from 'vite';
import { userConfig as baseUserConfig, loadCurrentEnv } from '../../../vite.config.base';
import { wrapperEnv } from '@shared/utils';
import { resolve as pathResolve, join as pathJoin } from 'path';

export default ({ command }: ConfigEnv): UserConfig => {
  const root = process.cwd();

  const currentEnv = loadCurrentEnv(command, root);
  const env = wrapperEnv(currentEnv);

  return {
    ...baseUserConfig,
    base: env.VITE_APP_BASE_URL,
    resolve: Object.assign({}, baseUserConfig.resolve, {
      alias: [
        {
          find: '@/',
          replacement: `${pathResolve('src')}/`,
        },
        {
          find: '@root/',
          replacement: `${pathJoin(__dirname, '..', '..', '/')}`,
        },
      ],
    }),
    server: Object.assign({}, baseUserConfig.server, {
      port: env.VITE_APP_PORT,
    }),
  } as UserConfig;
};
