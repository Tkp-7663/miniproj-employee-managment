import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function EmployeeDetail({ route, navigation }) {
	const { employee: initialEmployee } = route.params;
	const [employee, setEmployee] = useState(initialEmployee);

	const fetchEmployee = async () => {
		try {
			const res = await fetch(
				`https://dimensional-bridger-overly.ngrok-free.dev/employees/${employee.id}`
			);
			const data = await res.json();
			setEmployee(data);
		} catch (err) {
			console.log('Fetch employee error:', err);
		}
	};

	const deleteEmployeeAsync = async () => {
		try {
			console.log(`Deleting employee id: ${employee.id}`);
			await fetch(`https://dimensional-bridger-overly.ngrok-free.dev/employees/${employee.id}`, {
				method: 'DELETE'
			});
			console.log('Delete success');
			navigation.goBack();
		} catch (err) {
			console.log('Delete error:', err);
		}
	};

	const deleteEmployee = () => {
		Alert.alert('Confirm', 'Are you sure to delete?', [
			{ text: 'Cancel', style: 'cancel' },
			{
				text: 'Delete',
				style: 'destructive',
				onPress: deleteEmployeeAsync
			}
		]);
	};

	return (
		<View style={{ flex: 1, backgroundColor: '#f2f4f6' }}>
			{/* Profile Card */}
			<View style={styles.card}>
				<Ionicons
					name="person-circle-outline"
					size={100}
					color="#555"
					style={{ marginBottom: 15 }}
				/>
				<Text style={styles.name}>{employee.Full_Name}</Text>

				<View style={styles.detailContainer}>
					<Text style={styles.detailLabel}>Job Title:</Text>
					<Text style={styles.detailText}>{employee.Job_Title}</Text>
				</View>

				<View style={styles.detailContainer}>
					<Text style={styles.detailLabel}>Hire Date:</Text>
					<Text style={styles.detailText}>{employee.Hire_Date}</Text>
				</View>

				<View style={styles.detailContainer}>
					<Text style={styles.detailLabel}>Location:</Text>
					<Text style={styles.detailText}>{employee.Location}</Text>
				</View>

				<View style={styles.detailContainer}>
					<Text style={styles.detailLabel}>Experience:</Text>
					<Text style={styles.detailText}>
						{employee.Experience_Years} years
					</Text>
				</View>
			</View>

			{/* Actions */}
			<View style={styles.actions}>
				<TouchableOpacity
					style={styles.editBtn}
					onPress={() =>
						navigation.navigate('EmployeeForm', {
							mode: 'edit',
							employee,
							onSave: fetchEmployee
						})
					}
				>
					<Text style={styles.btnText}>Edit</Text>
				</TouchableOpacity>
				<TouchableOpacity
					activeOpacity={0.7}
					style={styles.deleteBtn}
					onPress={deleteEmployee}
				>
					<Text style={styles.btnText}>Delete</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	card: {
		backgroundColor: '#fff',
		margin: 20,
		marginTop: 30,
		paddingVertical: 30,
		paddingHorizontal: 20,
		borderRadius: 12,
		alignItems: 'center',
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.1,
		shadowRadius: 6,
		elevation: 4
	},
	name: {
		fontSize: 24,
		fontWeight: 'bold',
		marginBottom: 20,
		textAlign: 'center'
	},
	detailContainer: {
		width: '100%',
		flexDirection: 'row',
		marginBottom: 12,
		paddingHorizontal: 10
	},
	detailLabel: {
		fontWeight: '600',
		width: 110,
		color: '#555'
	},
	detailText: {
		flex: 1,
		textAlign: 'left',
		color: '#333'
	},
	actions: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		paddingHorizontal: 20,
		marginTop: 20
	},
	editBtn: {
		backgroundColor: '#2980b9',
		padding: 15,
		borderRadius: 8,
		width: '40%',
		alignItems: 'center'
	},
	deleteBtn: {
		backgroundColor: '#c0392b',
		padding: 15,
		borderRadius: 8,
		width: '40%',
		alignItems: 'center'
	},
	btnText: { color: '#fff', fontWeight: '600' }
});
