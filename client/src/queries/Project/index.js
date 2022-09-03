import {gql} from "@apollo/client";

const GET_PROJECTS = gql`
	query getClients {
		projects {
			id
			name
			description
            status
            client
		}
	}
`;
export {GET_PROJECTS};
