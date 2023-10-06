import { useState, useEffect } from "react";
import "../styling/Bills.css";

export default function Bills({ users }) {
  const [bills, setBills] = useState([]);

  useEffect(() => {
    getBills();
  }, []);

  const getBills = () => {
    fetch("/api/bills")
      .then((response) => response.json())
      .then((bills) => {
        setBills(bills);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // const displayName = (id) => {
  // 	return users && users.map(user => user.id === id ? (<p key={user.id}>{user.name}</p>) : null);
  // };

  const assignUserToBill = async (e, billId, user_id) => {
    //console.log(billId, user_id, "User with id:", e, "user has been assigned");
    user_id = e;
    console.log(billId);
    try {
      const result = await fetch(`/api/bills/assign/${billId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_id: user_id }),
      });
      // console.log(user_id);
      const data = await result.json();
      //setBills(data);
    } catch (error) {
      console.log(error);
    }
  };

  const displayName = (billId, user_id) => {
    if (users) {
      let user = users.find((user) => user.id === user_id);
      if (user) {
        return <p>{user.name}</p>;
      } else {
        return (
          <select
            onChange={(e) => assignUserToBill(e.target.value, billId, user_id)}
          >
            <option value="">--Select a user--</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
        );
      }
    }
  };

  return (
    <div className="bills-main">
      <div className="bills-header">
        <div>
          <a href="#">DUE DATE</a>
        </div>
        <div>
          <a href="#">PAID DATE</a>
        </div>
        <div>
          <a href="#">CATEGORY</a>
        </div>
        <div>
          <a href="#">PROVIDER</a>
        </div>
        <div>
          <a href="#">AMOUNT</a>
        </div>
        <div>
          <a href="#">STATUS</a>
        </div>
        <div>
          <a href="#">ASSIGNED TO</a>
        </div>
      </div>
      <ul className="bills-content">
        {bills.map(
          ({
            id,
            due_date,
            paid_date,
            category,
            provider,
            amount,
            status,
            user_id,
          }) => (
            <li key={id}>
              <div>{due_date.split("T")[0]} </div>
              <div>{paid_date && paid_date.split("T")[0]} </div>
              <div>{category} </div>
              <div>{provider} </div>
              <div>{amount} </div>
              <div>{`${status !== 0 ? "Paid" : "Unpaid"} `} </div>
              <div>{displayName(id, user_id)}</div>
            </li>
          )
        )}
      </ul>
    </div>
  );
}
