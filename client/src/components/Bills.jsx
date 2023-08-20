import { useState, useEffect } from "react";

import "./Bills.css";

export default function Bills() {
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

	return (
		<div className="bills-main">
			<div className="bills-header">
				<div><a href="#"></a>DUE DATE</div>
				<div><a href="#"></a>PAID DATE</div>
				<div><a href="#"></a>CATEGORY</div>
				<div><a href="#"></a>PROVIDER</div>
				<div><a href="#"></a>AMOUNT</div>
				<div><a href="#"></a>STATUS</div>
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
					</li>
				))}
			</ul>
		</div>
	)
}
