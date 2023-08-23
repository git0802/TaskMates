import { useState, useEffect } from "react";

import "./Bills.css";

export default function Bills({users}) {
	const [bills, setBills] = useState([]);

	useEffect(() => {
		getBills()
	}, []);

	const getBills = () => {
		fetch("/api/bills")
			.then(response => response.json())
			.then(bills => {
				setBills(bills);
			})
			.catch(error => {
				console.log(error);
			});
	};

	// const displayName = (id) => {
	// 	return users && users.map(user => user.id === id ? (<p key={user.id}>{user.name}</p>) : null);
	// };

	const assignUserToBill = (e, billId, id_user ) => {
		console.log(billId, id_user, "User with id:", e, "user has been assigned");
		id_user = e;
		const id = billId;
		console.log(bills.billId);
		console.log(billId, id_user, "User with id:", e, "user has been assigned");
		console.log(bills.billId);
		bills.find(bill => bill.id === billId ? bill.id_user = id_user : "");
		fetch("/assign/:id")
		.then(response => response.json())
		.then(bills => {
			setBills(bills);
		})
		.catch(error => {
			console.log(error);
		});
	}

	const displayName = (billId, id_user) => {
		if (users) {
		let user = users.find((user) => user.id === id_user);
			if (user) {
				return <p>{user.name}</p>;
			} else {
				return (
					<select onChange={(e) => assignUserToBill(e.target.value, billId, id_user)}>
						<option value="">--Select a user--</option>
						{users.map((user) => (
						<option key={user.id} value={user.id}>{user.name}</option>
					))}
					</select>
				)
			}
		}
	};

	return (
		<div className="bills-main">
			<div className="bills-header">
				<div><a href="#">DUE DATE</a></div>
				<div><a href="#">PAID DATE</a></div>
				<div><a href="#">CATEGORY</a></div>
				<div><a href="#">PROVIDER</a></div>
				<div><a href="#">AMOUNT</a></div>
				<div><a href="#">STATUS</a></div>
				<div><a href="#">ASSIGNED TO</a></div>
			</div>
			<ul className="bills-content">
				{bills.map(({id, due_date, paid_date, category, provider, amount, status, id_user}) => (
					<li key = {id}>
						<div>{due_date.split("T")[0]} </div>
						<div>{paid_date && paid_date.split("T")[0]} </div>
						<div>{category} </div>
						<div>{provider} </div>
						<div>{amount} </div>
						<div>{`${status !== 0 ? "Paid" : "Unpaid"} `} </div>
						<div>
							{displayName(id, id_user)}
						</div>
					</li>
				))}
			</ul>
		</div>
	)
}
