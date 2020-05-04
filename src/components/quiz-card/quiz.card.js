import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import { validateAnswer } from '../../store/actions/quizQA';
import { red } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '500px',
    maxWidth: 500,
  },
}));

function QuizCard(props) {
  const classes = useStyles();
  const { question, answers } = props;

  //useDispatch is hooks specifically from react-redux

  const dispatch = useDispatch();
  const answerSelected = useSelector((state) => state.quizReducer.userAnswers);

  const handleChange = (event, questionID) => {
    dispatch(validateAnswer(questionID, event.target.value));
  };

  const isChecked = (questionID, answerID) => {
    return Object.keys(answerSelected).length > 0
      ? answerSelected[questionID]
        ? answerSelected[questionID][answerID]
          ? answerSelected[questionID][answerID]
          : false
        : false
      : false;
  };

  return (
    <Card className={classes.root}>
      <CardHeader title={'Question'} subheader={question} />
      <CardContent>
        <FormControl component="fieldset">
          <FormLabel component="legend">Answers</FormLabel>
          {!!answers.length &&
            answers.map((i) => (
              <RadioGroup
                aria-label="Answers"
                name="Answers"
                value={i.pk_answerid}
                key={i.pk_answerid}
              >
                <FormControlLabel
                  value={i.pk_answerid}
                  control={
                    <Radio
                      checked={isChecked(i.fk_questionid, i.pk_answerid)}
                      onChange={(e) => handleChange(e, i.fk_questionid)}
                    />
                  }
                  label={i.answer}
                  data-qid={i.fk_questionid}
                  key={i.pk_answerid}
                />
              </RadioGroup>
            ))}
        </FormControl>
      </CardContent>
    </Card>
  );
}

export default QuizCard;
