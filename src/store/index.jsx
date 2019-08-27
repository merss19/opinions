import configureStoreDev from './configureStore.dev';
import configureStoreProd from './configureStore.prod';
import environment from 'environments/environment';

const configureStore = environment.production
  ? configureStoreProd
  : configureStoreDev;

export default configureStore.store;
