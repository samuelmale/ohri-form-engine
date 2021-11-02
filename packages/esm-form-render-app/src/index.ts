import { defineConfigSchema, getAsyncLifecycle } from '@openmrs/esm-framework';
import { backendDependencies } from './openmrs-backend-dependencies';

const importTranslation = require.context('../translations', false, /.json$/, 'lazy');

function setupOpenMRS() {
  const moduleName = '@openmrs/esm-form-render-app';

  const options = {
    featureName: 'form-render',
    moduleName,
  };

  defineConfigSchema(moduleName, {});

  return {
    pages: [
      {
        load: getAsyncLifecycle(() => import('./root'), options),
        route: /^form-render-test/,
      },
    ],
    extensions: [],
  };
}

export { backendDependencies, importTranslation, setupOpenMRS };
