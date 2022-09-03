import {ApolloClient, ApolloProvider, InMemoryCache} from "@apollo/client";
import {AddClientModal} from "./components/Client/AddClientModal";
import {Clients} from "./components/Client/Clients";
import {Projects} from "./components/Project/Projects";
import {Header} from "./components/shared/Header";
import {GRAPHQL_BASE_URL} from "./config/env";

const cache = new InMemoryCache({
	typePolicies: {
		Query: {
			fields: {
				clients: {
					merge(existing, incoming) {
						return incoming;
					},
				},
				projects: {
					merge(existing, incoming) {
						return incoming;
					},
				},
			},
		},
	},
});

const client = new ApolloClient({
	uri: GRAPHQL_BASE_URL,
	cache,
});

function App() {
	return (
		<>
			<ApolloProvider client={client}>
				<Header />
				<div className="container">
					<AddClientModal />
					<Projects />
					<Clients />
				</div>
			</ApolloProvider>
		</>
	);
}

export default App;
