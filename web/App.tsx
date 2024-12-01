/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import RootNavigator from './src/navigations/root/RootNavigator';
import ReactQueryProvider from './src/providers/ReactQueryProvider';

function App(): React.JSX.Element {
  return (
    <ReactQueryProvider>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </ReactQueryProvider>
  );
}

export default App;
