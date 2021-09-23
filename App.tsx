import React, { useEffect } from 'react';
import '~/src/initial-imports';
import AppNavigation from './src/navigation/AppNavigation';
//import { enableScreens } from 'react-native-screens';
import { Provider } from 'react-redux';
import { store, persistor } from '~/src/app/store';
import { PersistGate } from 'redux-persist/integration/react';
import { logline } from './src/app/utils/debug';

//enableScreens(true);

const App: () => Node = () => {
  useEffect(() => {
    //initialize();
    logline('[Hermes]', !!global.HermesInternal);
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AppNavigation />
      </PersistGate>
    </Provider>
  );
};

export default App;
