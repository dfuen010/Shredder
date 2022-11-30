import React, {type PropsWithChildren} from 'react';
import CreateAccount from './src/components/Screen/CreateAccount';
import SignInScreen from './src/components/Screen/SignInScreen';
import Weight from './src/components/Screen/Weight';
import Height from './src/components/Screen/Height';
import Exercises from './src/components/Exercise/Exercises';
import Meals from './src/components/Meal/Meals';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Homepage from './src/components/Screen/homepage';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen
          name="Login"
          component={SignInScreen}
          options={{title: 'Login'}}
        />
        <Stack.Screen
          name="CreateAccount"
          component={CreateAccount}
          options={{title: 'Create Account'}}
        />
        <Stack.Screen
            name="Homepage"
            component={Homepage}
            options={{ title: 'Go to Homepage' }}
          />
        <Stack.Screen
          name="AddHeight"
          component={Height}
          options={{title: 'Update Height'}}
        />
        <Stack.Screen
          name="AddWeight"
          component={Weight}
          options={{title: 'Update Weight'}}
        />
        <Stack.Screen
          name="ViewExercise"
          component={Exercises}
          options={{title: 'View Exercise'}}
        />
        <Stack.Screen
          name="ViewMeals"
          component={Meals}
          options={{title: 'View Meals'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default App;
