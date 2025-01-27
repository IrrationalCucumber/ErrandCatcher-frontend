/**
 * WRITTEN BY: ADREAN
 * 10/15/24
 * Component for dipslaying comments and feedbacks by/of users
 */
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useAuth } from "../AuthContext";
import { Card, CardContent, List, ListItem } from "@mui/joy";
import StarRating from "../Display/StarRating";
import { DisplayDate } from "../DisplayDate";

function Feedback() {
  return <div></div>;
}

export default Feedback;

/**
 * Component to Display feedback of Catcher
 */
export function MyFeedback({ id }) {
  const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
  const [myFeedback, setMyFeedback] = useState([]);
  //get all the feedback of user
  useEffect(() => {
    //fetch data in backend
    const fetchFeedback = async () => {
      try {
        const res = await axios.get(`${apiBaseUrl}/my-feedbacks/${id}`);
        setMyFeedback(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    //refresh feedback every 1 seconds
    const refresh = setInterval(fetchFeedback, 30000);
    return () => clearInterval(refresh);
  }, [apiBaseUrl, id]);
  return (
    <>
      {myFeedback.map((feedback) => (
        <List key={feedback.feedbackID}>
          <ListItem>
            <Card
              invertedColors={false}
              orientation="horizontal"
              size="lg"
              variant="soft"
              sx={{
                width: "100%",
                "--Card-radius": "0px",
                "--Card-padding": "20px",
                "&:hover": {
                  boxShadow: "md",
                  borderColor: "neutral.outlinedHoverBorder",
                },
              }}
            >
              <CardContent>
                <StarRating rating={feedback.feedbackRate} />
                <i>
                  "{feedback.feedbackComment}" <b>-{feedback.username}</b>
                </i>
                {DisplayDate(feedback.feedbackDate)}
              </CardContent>
            </Card>
          </ListItem>
        </List>
      ))}
    </>
  );
}

/**
 * FEEDBACK LIST for EMployer
 */
export function MyPostedFeedback() {
  const { user } = useAuth();
  const [feedback, setFeedback] = useState([]);
  const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
  //fetch posted feedback of employer
  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const res = await axios.get(
          `${apiBaseUrl}/posted-feedbacks/${user.userID}`
        );
        setFeedback(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    //refresh list every 5 sec
    const refresh = setInterval(fetchFeedback, 5000);
    return () => clearInterval(refresh);
  }, [apiBaseUrl, user.userID]);
  return (
    <>
      {feedback.map((fb) => (
        <List key={fb.feedbackID}>
          <ListItem>
            <Card
              invertedColors={false}
              orientation="horizontal"
              size="lg"
              variant="soft"
              sx={{
                width: "100%",
                "--Card-radius": "0px",
                "--Card-padding": "20px",
                "&:hover": {
                  boxShadow: "md",
                  borderColor: "neutral.outlinedHoverBorder",
                },
              }}
            >
              <CardContent>
                <StarRating rating={fb.feedbackRate} />
                {/* CHANGE TO CATCHER */}
                <i>
                  "{fb.feedbackComment}" <b>-{fb.username}</b>
                </i>
                {DisplayDate(fb.feedbackDate)}
              </CardContent>
            </Card>
          </ListItem>
        </List>
      ))}
    </>
  );
}
