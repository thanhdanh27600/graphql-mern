import {useMutation} from "@apollo/client";
import {useState} from "react";
import {FaUser} from "react-icons/fa";
import {ADD_CLIENT} from "../../mutations/Client";
import {GET_CLIENTS} from "../../queries/Client";

const initialData = {
	name: "",
	email: "",
	phone: "",
};

export const AddClientModal = () => {
	const [data, setData] = useState(initialData);
	const [addClient] = useMutation(ADD_CLIENT, {
		variables: data,
		update(cache, {data: {addClient}}) {
			const {clients} = cache.readQuery({query: GET_CLIENTS});
			cache.writeQuery({
				query: GET_CLIENTS,
				data: {clients: [...clients, addClient]},
			});
		},
	});
	const resetForm = () => {
		setData(initialData);
		window.bootstrap.Modal.getInstance(
			document.getElementById("exampleModal")
		).hide();
	};
	const getFormData = (field) => data[field];
	const setFormData = (e) =>
		setData((oldData) => ({...oldData, [e.target.id]: e.target.value}));
	const onSubmit = (e) => {
		e.preventDefault();
		if (!data.email || !data.name || !data.phone) {
			return alert("Fields are required");
		}
		addClient();
		resetForm();
	};
	return (
		<>
			<button
				type="button"
				className="btn btn-primary"
				data-bs-toggle="modal"
				data-bs-target="#exampleModal"
			>
				<div className="d-flex align-items-center">
					<FaUser className="icon" />
					Add Client
				</div>
			</button>

			<div
				className="modal fade"
				id="exampleModal"
				tabIndex="-1"
				role="dialog"
				aria-labelledby="exampleModalLabel"
				aria-hidden="true"
			>
				<div className="modal-dialog" role="document">
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title" id="exampleModalLabel">
								Add client
							</h5>
							<button
								type="button"
								className="btn-close"
								data-bs-dismiss="modal"
								aria-label="Close"
							></button>
						</div>
						<div className="modal-body">
							<form onSubmit={onSubmit}>
								<div className="mb-3">
									<label className="form-label" htmlFor="">
										Name
									</label>
									<input
										type="text"
										className="form-control"
										id="name"
										value={getFormData("name")}
										onChange={setFormData}
									/>
								</div>
								<div className="mb-3">
									<label className="form-label" htmlFor="">
										Email
									</label>
									<input
										type="email"
										className="form-control"
										id="email"
										value={getFormData("email")}
										onChange={setFormData}
									/>
								</div>
								<div className="mb-3">
									<label className="form-label" htmlFor="">
										Phone
									</label>
									<input
										type="text"
										className="form-control"
										id="phone"
										value={getFormData("phone")}
										onChange={setFormData}
									/>
								</div>
								<div className="modal-footer">
									<button className="btn btn-secondary">Submit</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};
