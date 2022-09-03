import {useMutation} from "@apollo/client";
import {FaTrash} from "react-icons/fa";
import {GET_CLIENTS} from "../../queries/Client";
import {DELETE_CLIENT} from "../../mutations/Client";

export const ClientRow = ({client}) => {
	const [handleDelete] = useMutation(DELETE_CLIENT, {
		variables: {
			id: client.id,
		},
		// refetchQueries: [{query: GET_CLIENTS}],
		update(cache, {data: {deleteClient}}) {
			const {clients} = cache.readQuery({query: GET_CLIENTS});
			cache.writeQuery({
				query: GET_CLIENTS,
				data: {
					clients: clients.filter((client) => client.id !== deleteClient.id),
				},
			});
		},
	});
	return (
		<tr>
			<td>{client.id}</td>
			<td>{client.name}</td>
			<td>{client.email}</td>
			<td>{client.phone}</td>
			<td>
				<button className="btn btn-danger btn-sm" onClick={handleDelete}>
					<FaTrash />
				</button>
			</td>
		</tr>
	);
};
