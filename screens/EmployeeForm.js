import { useState } from 'react';
import {
	View,
	Text,
	TextInput,
	StyleSheet,
	TouchableOpacity,
	Alert
} from 'react-native';

export default function EmployeeForm({ route, navigation }) {
	const { mode, employee } = route.params || {};

	const [Full_Name, setFullName] = useState(
		employee ? employee.Full_Name : ''
	);
	const [Job_Title, setJobTitle] = useState(
		employee ? employee.Job_Title : ''
	);
	const [Hire_Date, setHireDate] = useState(
		employee ? employee.Hire_Date : ''
	);
	const [Location, setLocation] = useState(employee ? employee.Location : '');
	const [Experience_Years, setExp] = useState(
		employee ? String(employee.Experience_Years) : ''
	);

	const saveEmployee = async () => {
		try {
			console.log('Fetching current employees...');
			const res = await fetch('https://dimensional-bridger-overly.ngrok-free.dev/employees');
			const data = await res.json();
			console.log('Current employees:', data);

			let newId;
			if (mode === 'add') {
				const exists = data.find(
					(e) => e.Full_Name.toLowerCase() === Full_Name.toLowerCase()
				);
				if (exists) {
					Alert.alert(
						'Error',
						'Employee with this name already exists!'
					);
					return;
				}
				const lastId =
					data.length > 0
						? Math.max(...data.map((e) => Number(e.id)))
						: 0;
				newId = String(lastId + 1);
			}

			const method = mode === 'edit' ? 'PUT' : 'POST';
			const url =
				mode === 'edit'
					? `https://dimensional-bridger-overly.ngrok-free.dev/employees/${employee.id}`
					: 'https://dimensional-bridger-overly.ngrok-free.dev/employees';

			const payload = {
				id: mode === 'edit' ? employee.id : newId,
				Full_Name: Full_Name,
				Job_Title: Job_Title,
				Hire_Date: Hire_Date,
				Location: Location,
				Experience_Years: Number(Experience_Years)
			};

			await fetch(url, {
				method,
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(payload)
			});

			if (route.params?.onSave) {
				await route.params.onSave();
			}

			navigation.goBack();
		} catch (err) {
			console.log('Save employee error:', err);
		}
	};

	return (
		<View style={{ flex: 1, padding: 20 }}>
			<Text style={styles.headerText}>
				{mode === 'add' ? 'Add Employee' : 'Edit Employee'}
			</Text>

			<Text style={styles.label}>Full Name</Text>
			<TextInput
				placeholder="Enter full name"
				placeholderTextColor="#aaa"
				value={Full_Name}
				onChangeText={setFullName}
				style={styles.input}
			/>

			<Text style={styles.label}>Job Title</Text>
			<TextInput
				placeholder="Enter job title"
				placeholderTextColor="#aaa"
				value={Job_Title}
				onChangeText={setJobTitle}
				style={styles.input}
			/>

			<Text style={styles.label}>Hire Date</Text>
			<TextInput
				placeholder="YYYY-MM-DD"
				placeholderTextColor="#aaa"
				value={Hire_Date}
				onChangeText={setHireDate}
				style={styles.input}
			/>

			<Text style={styles.label}>Location</Text>
			<TextInput
				placeholder="Enter location"
				placeholderTextColor="#aaa"
				value={Location}
				onChangeText={setLocation}
				style={styles.input}
			/>

			<Text style={styles.label}>Experience Years</Text>
			<TextInput
				placeholder="Enter years"
				placeholderTextColor="#aaa"
				value={Experience_Years}
				onChangeText={setExp}
				keyboardType="numeric"
				style={styles.input}
			/>

			<TouchableOpacity style={styles.saveBtn} onPress={saveEmployee}>
				<Text style={styles.btnText}>Save</Text>
			</TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({
	headerText: {
		fontSize: 22,
		fontWeight: 'bold',
		textAlign: 'center',
		marginVertical: 20
	},
	label: { fontSize: 14, fontWeight: '600', marginBottom: 5 },
	input: {
		borderWidth: 1,
		borderRadius: 8,
		padding: 10,
		marginBottom: 15,
		borderColor: '#ccc',
		backgroundColor: '#fff'
	},
	saveBtn: {
		backgroundColor: '#27ae60',
		padding: 15,
		borderRadius: 8,
		alignItems: 'center',
		marginTop: 20
	},
	btnText: { color: '#fff', fontWeight: '600' }
});
