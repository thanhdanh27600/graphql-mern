const Client = require("../models/Client");
const Project = require("../models/Project");

const {
	GraphQLObjectType,
	GraphQLID,
	GraphQLString,
	GraphQLSchema,
	GraphQLList,
	GraphQLNonNull,
	GraphQLEnumType,
} = require("graphql");

const ClientType = new GraphQLObjectType({
	name: "Client",
	fields: () => ({
		id: {type: GraphQLID},
		name: {type: GraphQLString},
		email: {type: GraphQLString},
		phone: {type: GraphQLString},
	}),
});

const ProjectType = new GraphQLObjectType({
	name: "Project",
	fields: () => ({
		id: {type: GraphQLID},
		name: {type: GraphQLString},
		status: {type: GraphQLString},
		description: {type: GraphQLString},
		client: {
			type: ClientType,
			resolve(parent, arg) {
				return Client.findById(parent.clientId);
			},
		},
	}),
});

const RootQuery = new GraphQLObjectType({
	name: "RootQueryType",
	fields: {
		clients: {
			type: new GraphQLList(ClientType),
			resolve(parents, args) {
				return Client.find();
			},
		},
		client: {
			type: ClientType,
			args: {id: {type: GraphQLID}},
			resolve(parent, args) {
				return Client.findById(arg.id);
			},
		},
		projects: {
			type: new GraphQLList(ProjectType),
			resolve(parents, args) {
				return Project.find();
			},
		},
		project: {
			type: ProjectType,
			args: {id: {type: GraphQLID}},
			resolve(parent, args) {
				return Project.findById(args.id);
			},
		},
	},
});

// Mutations
const mutation = new GraphQLObjectType({
	name: "Mutation",
	fields: {
		addClient: {
			type: ClientType,
			args: {
				name: {type: GraphQLNonNull(GraphQLString)},
				email: {type: GraphQLNonNull(GraphQLString)},
				phone: {type: GraphQLNonNull(GraphQLString)},
			},
			resolve(parent, args) {
				const client = new Client({
					name: args.name,
					email: args.email,
					phone: args.phone,
				});
				return client.save();
			},
		},
		deleteClient: {
			type: ClientType,
			args: {
				id: {type: GraphQLNonNull(GraphQLID)},
			},
			resolve(parent, args) {
				return Client.findByIdAndRemove(args.id);
			},
		},
		deleteAllClient: {
			type: ClientType,
			resolve(parent, args) {
				return Client.remove();
			},
		},
		// Project
		addProject: {
			type: ProjectType,
			args: {
				name: {type: GraphQLNonNull(GraphQLString)},
				description: {type: GraphQLNonNull(GraphQLString)},
				status: {
					type: new GraphQLEnumType({
						name: "ProjectStatus",
						values: {
							new: {value: "Not Started"},
							progress: {value: "In Progress"},
							completed: {value: "Completed"},
						},
					}),
					defaultValue: "Not Started",
				},
				clientId: {type: GraphQLNonNull(GraphQLID)},
			},
			resolve(parent, args) {
				const {name, description, status, clientId} = args;
				const project = new Project({name, description, status, clientId});
				return project.save();
			},
		},
		deleteProject: {
			type: ProjectType,
			args: {
				id: {type: GraphQLNonNull(GraphQLID)},
			},
			resolve(parent, args) {
				return Project.findByIdAndRemove(args.id);
			},
		},
		deleteAllProject: {
			type: ProjectType,
			resolve(parent, args) {
				return Project.remove();
			},
		},
	},
});

module.exports = new GraphQLSchema({
	query: RootQuery,
	mutation: mutation,
});
