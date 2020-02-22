import React, { useEffect, useState, useCallback } from "react";
import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";
import { makeStyles, Theme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import {
  getAnswer,
  removeAnswer as serviceRemoveAnswer
} from "../../services/answer.service";
import { Loading } from "../Layout/Loading";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import CardContent from "@material-ui/core/CardContent";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme: Theme) => ({
  layout: {
    width: "auto",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3)
    }
  },
  table: {
    minWidth: 650
  }
}));

type Props = {
  id: string;
};

export const AnswersMain: React.FC<Props> = props => {
  const classes = useStyles(props);
  const [loaded, setLoaded] = useState<boolean>(false);
  const [answers, setAnswers] = useState<any>([]);

  const getAnswers = useCallback(async () => {
    const data: any = await getAnswer(props.id);
    setAnswers(data);
  }, [props.id]);

  useEffect(() => {
    if (!loaded) {
      getAnswers();
      setLoaded(true);
    }
  }, [getAnswers, loaded]);

  const returnSensibleDate = (dateString: string) => {
    const date = new Date(dateString);
    var monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec"
    ];

    var day = date.getDate();
    var monthIndex = date.getMonth();
    var year = date.getFullYear();

    return day + " " + monthNames[monthIndex] + " " + year;
  };

  const removeAnswer = async (id: string) => {
    if (window.confirm("Are you sure you want to delete the answer?")) {
      await serviceRemoveAnswer(id);
      setAnswers(answers.filter((item: any) => item.uuid !== id));
    }
  };

  return (
    <Container maxWidth="md">
      <Paper className={classes.paper}>
        <Typography variant="h4">Answers</Typography>
        {loaded === false ? (
          <Loading />
        ) : (
          <div>
            {answers.map((answer: any) => (
              <div key={answer.uuid} style={{ marginTop: "0.5rem" }}>
                <Card>
                  <CardContent>
                    <Grid container>
                      <Grid item xs={11}>
                        <div>
                          <Typography variant="h6">{answer.uuid}</Typography>
                        </div>
                        <div>
                          <Typography>
                            {returnSensibleDate(answer.created_at)}
                          </Typography>
                        </div>
                        <div style={{ marginTop: "0.5rem" }}>
                          <Link
                            to={`/answer/${answer.uuid}`}
                            style={{
                              textDecoration: "none",
                              fontSize: "14px",
                              color: "#ff9999"
                            }}
                          >
                            View
                          </Link>
                        </div>
                      </Grid>
                      <Grid item xs={1}>
                        <IconButton
                          style={{ color: "#ff9999" }}
                          component="span"
                          aria-label="delete-answer"
                          onClick={() => removeAnswer(answer.uuid)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        )}
      </Paper>
    </Container>
  );
};
