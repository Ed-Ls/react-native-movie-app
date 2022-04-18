import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Home from '../screens/Home';
import Detail from '../screens/Detail';
import NavBar from './NavBar';
import Search from '../screens/Search';
import Colors from '../themes/Colors';

const Stack = createStackNavigator();

class MainNavigation extends React.PureComponent {
  render() {
    return (
      <Stack.Navigator
        headerMode={'screen'}
        screenOptions={{
          headerStyle: {elevation: 0},
          cardStyle: {backgroundColor: Colors.black},
        }}>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            headerTransparent: true,
            header: ({navigation}) => (
              <NavBar navigation={navigation} main={true} />
            ),
          }}
        />
        <Stack.Screen
          name="Detail"
          component={Detail}
          options={{
            headerTransparent: true,
            header: ({navigation}) => <NavBar navigation={navigation} />,
          }}
        />
        <Stack.Screen
          name="Search"
          component={Search}
          options={{
            headerTransparent: true,
            header: ({navigation}) => <NavBar navigation={navigation} />,
          }}
        />
      </Stack.Navigator>
    );
  }
}

export default MainNavigation;
