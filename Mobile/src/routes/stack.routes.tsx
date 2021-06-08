import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { Welcome } from '../pages/Welcome';

const stackRoutes = createStackNavigator();


const AppRoutes : React.FunctionComponent = () => (
	<stackRoutes.Navigator
		headerMode="none"
		screenOptions={{
			cardStyle: {
				backgroundColor: '#fff'
			}
		}}
	>
		<stackRoutes.Screen
			name="Welcome"
			component={Welcome}
		/>
		
	</stackRoutes.Navigator>
)

export default AppRoutes;