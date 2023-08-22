import { useState, useEffect } from "react";
// import UserProfile from "./UserProfile";

import "./Bills.css";

export default function Bills({users}) {
	const [bills, setBills] = useState([]);
	const [billsInfo, setBillsInfo] = useState([]);
	const [name, setName] = useState([]);
	
	console.log(bills[0].id_user); 

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

	useEffect(() => {
		getBillsInfo()
	}, []);


	function getBillsInfo(bills){
		console.log(bills.id_user);
		const userFound = users.find(user =>user.id === id_user);
		// console.log(userFound);
		setBillsInfo(userFound);
		setName(userFound => ({...userFound, name: userFound.name}))
	}

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
				{bills.map(bill => (
					<li key = {bill.id}>
						<div>{bill.due_date.split("T")[0]} </div>
						<div>{bill.paid_date && bill.paid_date.split("T")[0]} </div>
						<div>{bill.category} </div>
						<div>{bill.provider} </div>
						<div>{bill.amount} </div>
						<div>{`${bill.status !== 0 ? "Paid" : "Unpaid"} `} </div>
						<div>{bill.id_user} </div>
					</li>
				))}
			</ul>
		</div>
	)
}
