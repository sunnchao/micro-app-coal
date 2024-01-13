import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { loadCurrentEnv, userConfig as baseUserConfig } from '../../vite.config.base';
import { wrapperEnv } from '@shared/utils';

// https://vitejs.dev/config/
export default ({ command, mode }) => {
  const root = process.cwd();
  const currentEnv = loadCurrentEnv(command, root);
  const env = wrapperEnv(currentEnv);

  console.log('root', root, env);

  return defineConfig({
    plugins: [vue()],
    base: env.VITE_APP_NAME,
    server: Object.assign({}, baseUserConfig.server, {
      port: env.VITE_APP_PORT,
    }),
  });
};
