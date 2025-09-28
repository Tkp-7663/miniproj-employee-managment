import { useEffect, useState } from 'react';
import {
	View,
	Text,
	FlatList,
	TextInput,
	TouchableOpacity,
	StyleSheet
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function EmployeeList({ navigation }) {
	const [employees, setEmployees] = useState([]);
	const [search, setSearch] = useState('');

	const fetchEmployees = async () => {
		try {
			console.log(
				'Fetching employees from https://dimensional-bridger-overly.ngrok-free.dev/employees ...'
			);
			const res = await fetch(
				'https://dimensional-bridger-overly.ngrok-free.dev/employees'
			);
			const data = await res.json();
			console.log('Employees fetched:', data);
			setEmployees(data);
		} catch (e) {
			console.log('Fetch employees error:', e);
		}
	};

	useEffect(() => {
		const unsubscribe = navigation.addListener('focus', fetchEmployees);
		return unsubscribe;
	}, [navigation]);

	const filtered = employees.filter((emp) => {
		const query = search.toLowerCase();
		return (
			emp.Full_Name.toLowerCase().includes(query) ||
			emp.Job_Title.toLowerCase().includes(query)
		);
	});
	return (
		<View style={{ flex: 1 }}>
			{/* Search */}
			<TextInput
				placeholder="Search employee..."
				placeholderTextColor="#aaa"
				value={search}
				onChangeText={setSearch}
				style={styles.searchBox}
			/>

			{/* List */}
			<FlatList
				data={filtered}
				keyExtractor={(item) => item.id.toString()}
				renderItem={({ item }) => (
					<TouchableOpacity
						style={styles.item}
						onPress={() =>
							navigation.navigate('EmployeeDetail', {
								employee: item
							})
						}
					>
						<Ionicons
							name="person-circle-outline"
							size={40}
							color="#555"
						/>
						<View style={{ marginLeft: 10 }}>
							<Text style={styles.name}>{item.Full_Name}</Text>
							<Text style={styles.job}>{item.Job_Title}</Text>
						</View>
					</TouchableOpacity>
				)}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	searchBox: {
		margin: 10,
		borderWidth: 1,
		borderRadius: 8,
		padding: 8,
		borderColor: '#ccc'
	},
	item: {
		flexDirection: 'row',
		alignItems: 'center',
		padding: 12,
		borderBottomWidth: 1,
		borderColor: '#eee',
		backgroundColor: '#fff'
	},
	name: { fontSize: 16, fontWeight: '600' },
	job: { color: '#666' }
});
