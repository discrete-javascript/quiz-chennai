import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import { red } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "500px",
    maxWidth: 500,
  },
}));

export default function RecipeReviewCard(props) {
  const classes = useStyles();
  const { questionSerialNo, question, answers } = props;
  const [value, setValue] = React.useState("female");

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <Card className={classes.root}>
      <CardHeader title={"Question"} subheader={question} />
      <CardContent>
        <FormControl component="fieldset">
          <FormLabel component="legend">Answers</FormLabel>
          <RadioGroup
            aria-label="Answers"
            name="Answers"
            value={value}
            onChange={handleChange}
          >
            {!!answers.length &&
              answers.map((i) => (
                <FormControlLabel
                  value={i.answer}
                  control={<Radio />}
                  label={i.answer}
                />
              ))}
          </RadioGroup>
        </FormControl>
      </CardContent>
    </Card>
  );
}
