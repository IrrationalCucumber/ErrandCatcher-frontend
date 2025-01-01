import React, { useEffect, useState } from "react";
import { useAuth } from "../components/AuthContext";
import axios from "axios";
import "../pages/history.css";
import NavbarPage from "../components/Navbar/NavBarPage";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import PaymentsOutlinedIcon from "@mui/icons-material/PaymentsOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import PaymentOutlinedIcon from "@mui/icons-material/PaymentOutlined";
import AssignmentIndOutlinedIcon from "@mui/icons-material/AssignmentIndOutlined";
import WorkOutlineOutlinedIcon from "@mui/icons-material/WorkOutlineOutlined";
import StarRating from "../components/Display/StarRating";
import { Star } from "@mui/icons-material";

const History = () => {
  const { user } = useAuth();
  const userID = user.userID;
  const [transactions, setTransactions] = useState([]);
  const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
  // tesing data

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        // const response = await axios.get(
        //   `http://localhost:8800/transactions/${userID}`
        // );
        // setTransactions(response.data);
        // setLoading(false);

        // choose if the user is Employer otherwise Catcher
        const endpoint =
          user.userType === "Employer"
            ? `${apiBaseUrl}/transactionsEmp/${userID}`
            : `${apiBaseUrl}/transactionsCat/${userID}`;

        const response = await axios.get(endpoint);
        setTransactions(response.data);
      } catch (err) {
        console.log("Error fetching transactions:", err);
      }
    };
    fetchTransactions();
  }, [userID, user.userType, apiBaseUrl]);

  return (
    <>
      {/* <Navbar /> */}
      <NavbarPage />
      <div className="history-container">
        <h1
          style={{
            color: "rgb(22, 121, 171",
            fontWeight: "700",
            fontSize: "2.30rem",
          }}
        >
          Transaction History
        </h1>

        {/* apply testing data */}
        {/* {sampletran.length > 0 ? (
          sampletran.map((transaction, index) => { */}

        {/* data from database */}
        {transactions.length > 0 ? (
          transactions.map((transaction, index) => {
            // convert to centavo
            const amountInCents = (transaction.total / 100).toFixed(2);

            // convert to peso php
            const priceInPHP = new Intl.NumberFormat("en-PH", {
              style: "currency",
              currency: "PHP",
            }).format(amountInCents);

            const paidDate = new Date(transaction.paid).toLocaleString();

            return (
              <div className="transaction-card" key={index}>
                <div className="transaction-details">
                  <p>
                    <strong>
                      {" "}
                      <ReceiptOutlinedIcon
                        sx={{
                          color: "#378ce7",
                          marginRight: "4px",
                        }}
                      />
                      Transaction ID:
                    </strong>
                    {transaction.checkoutId}
                  </p>
                  <p>
                    <strong>
                      {" "}
                      <AssignmentIndOutlinedIcon
                        sx={{
                          color: "#378ce7",
                          marginRight: "4px",
                        }}
                      />
                      {transaction.accountType}:
                    </strong>
                    {transaction.userFirstname} {transaction.Lastname}
                  </p>
                  <p>
                    <strong>
                      {" "}
                      <PaymentOutlinedIcon
                        sx={{
                          color: "#378ce7",
                          marginRight: "4px",
                        }}
                      />
                      Payment Intent ID:
                    </strong>
                    {transaction.paymentId}
                  </p>
                  <p>
                    <strong>
                      {" "}
                      <CalendarMonthOutlinedIcon
                        sx={{
                          color: "#378ce7",
                          marginRight: "4px",
                        }}
                      />
                      Date Paid:
                    </strong>
                    {paidDate}
                  </p>
                  <p>
                    <strong>
                      {" "}
                      <PaymentsOutlinedIcon
                        sx={{
                          color: "#378ce7",
                          marginRight: "4px",
                        }}
                      />
                      Total Price:
                    </strong>
                    {priceInPHP}
                  </p>
                  <p>
                    <strong>
                      {" "}
                      <WorkOutlineOutlinedIcon
                        sx={{
                          color: "#378ce7",
                          marginRight: "4px",
                        }}
                      />
                      Errand Type:
                    </strong>
                    {transaction.type}
                  </p>
                  <p>
                    <strong>
                      {" "}
                      <DescriptionOutlinedIcon
                        sx={{
                          color: "#378ce7",
                          marginRight: "4px",
                        }}
                      />
                      Description:
                    </strong>
                    {transaction.description}
                  </p>
                  {transaction.feedbackRate ? (
                    <p>
                      <strong>
                        <Star
                          sx={{
                            color: "#378ce7",
                            marginRight: "4px",
                          }}
                        />
                        Rating:
                        <StarRating rating={transaction.feedbackRate} />{" "}
                        {transaction.feedbackComment
                          ? `'
                      ${transaction.feedbackComment}'`
                          : null}
                      </strong>
                    </p>
                  ) : null}
                </div>
              </div>
            );
          })
        ) : (
          <p>No transactions found.</p>
        )}
      </div>
    </>
  );
};

export default History;
