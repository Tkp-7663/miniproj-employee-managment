import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import EmployeeList from './screens/EmployeeList';
import EmployeeDetail from './screens/EmployeeDetail';
import EmployeeForm from './screens/EmployeeForm';

const Stack = createStackNavigator();

export default function App() {
	return (
		<NavigationContainer theme={navTheme}>
			<Stack.Navigator
				initialRouteName="EmployeeList"
				screenOptions={{
					headerStyle: { backgroundColor: '#2c3e50' },
					headerTintColor: '#fff',
					headerTitleStyle: { fontWeight: 'bold' }
				}}
			>
				<Stack.Screen
					name="EmployeeList"
					component={EmployeeList}
					options={({ navigation }) => ({
						title: 'Employees List',
						headerRight: () => (
							<TouchableOpacity
								style={{ marginRight: 15 }}
								onPress={() =>
									navigation.navigate('EmployeeForm', {
										mode: 'add'
									})
								}
							>
								<Ionicons
									name="add-circle"
									size={28}
									color="#27ae60"
								/>
							</TouchableOpacity>
						)
					})}
				/>
				<Stack.Screen
					name="EmployeeDetail"
					component={EmployeeDetail}
					options={{ title: 'Employee Details' }}
				/>
				<Stack.Screen
					name="EmployeeForm"
					component={EmployeeForm}
					options={({ route }) => ({
						title:
							route.params?.mode === 'edit'
								? 'Edit Employee'
								: 'Add Employee'
					})}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	);
}

const navTheme = {
	...DefaultTheme,
	colors: { ...DefaultTheme.colors, background: '#ecf0f1' }
};
