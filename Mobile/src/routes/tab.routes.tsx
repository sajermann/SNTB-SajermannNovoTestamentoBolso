import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Welcome } from '../pages/Welcome';
import { About } from '../pages/About';
import { MaterialIcons } from '@expo/vector-icons';

const AppTab = createBottomTabNavigator();

const TabsRoutes = () => {
	return (
		<AppTab.Navigator
			tabBarOptions={{
				activeTintColor: '#32B768',
				inactiveTintColor: '#52665A',
				labelPosition: 'below-icon',
				style:{
					paddingVertical: 0,
					height: 58,
					paddingBottom: 5
				},

			}}>
				<AppTab.Screen 
					name="Home"
					component={Welcome}
					options={{
						tabBarIcon: (({ size, color}) => (
							<MaterialIcons
								name="home"
								size={size}
								color={color}
							/>
						))
					}}
				/>
				<AppTab.Screen 
					name="Sobre"
					component={About}
					options={{
						tabBarIcon: (({ size, color}) => (
							<MaterialIcons
								name="info"
								size={size}
								color={color}
							/>
						))
					}}
				/>
			</AppTab.Navigator>
	)
}

export default TabsRoutes;