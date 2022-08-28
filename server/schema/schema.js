const Client = require("../models/Client");
const Project = require("../models/Project");

const {
	GraphQLObjectType,
	GraphQLID,
	GraphQLString,
	GraphQLSchema,
	GraphQLList,
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

module.exports = new GraphQLSchema({query: RootQuery});
