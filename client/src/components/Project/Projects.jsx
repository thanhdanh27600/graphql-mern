import {useQuery} from "@apollo/client";
import {GET_PROJECTS} from "../../queries/Project";
import {Spinner} from "../widgets/Spinner";
import { ProjectCard } from "./ProjectCard";

export const Projects = () => {
	const {loading, error, data} = useQuery(GET_PROJECTS);
	if (loading) return <Spinner />;
	if (error) return <p>Something went wrong.</p>;
	return (
		<>
			{data.projects.length > 0 ? (
				<div>
					<div className="row">
						{data.projects.map((project) => (
							<ProjectCard key={project.id} project={project} />
						))}
					</div>
				</div>
			) : (
				<p>No Project.</p>
			)}
		</>
	);
};
