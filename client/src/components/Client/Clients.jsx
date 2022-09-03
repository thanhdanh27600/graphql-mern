import {useQuery} from "@apollo/client";
import {GET_CLIENTS} from "../../queries/Client";
import {Spinner} from "../widgets/Spinner";
import {ClientRow} from "./ClientRow";

export const Clients = () => {
	const {loading, error, data} = useQuery(GET_CLIENTS);
	if (loading) return <Spinner />;
	if (error) return <p>Something went wrong.</p>;
	return (
		<table className="table table-hover mt-3">
			<thead>
				<tr>
					<th>ID</th>
					<th>Name</th>
					<th>Email</th>
					<th>Phone</th>
					<th></th>
				</tr>
			</thead>
			<tbody>
				{data.clients.map((client) => (
					<ClientRow key={client.id} client={client} />
				))}
			</tbody>
		</table>
	);
};
