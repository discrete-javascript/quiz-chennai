import React from 'react';
import { connect, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
// import { useSelector, useDispatch } from 'react-redux';
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

  const [value, setValue] = React.useState('');

  //useDispatch is hooks specifically from react-redux

  const dispatch = useDispatch();

  const handleChange = (event, questionID) => {
    dispatch(validateAnswer(questionID, event.target.value));
    setValue(event.target.value);
  };

  return (
    <Card className={classes.root}>
      <CardHeader title={'Question'} subheader={question} />
      <CardContent>
        <FormControl component="fieldset">
          <FormLabel component="legend">Answers</FormLabel>
          <RadioGroup aria-label="Answers" name="Answers" value={value}>
            {!!answers.length &&
              answers.map((i) => (
                <FormControlLabel
                  value={i.pk_answerid}
                  control={
                    <Radio
                      checked={value === i.pk_answerid}
                      onChange={(e) => handleChange(e, i.fk_questionid)}
                    />
                  }
                  label={i.answer}
                  data-qid={i.fk_questionid}
                  key={i.pk_answerid}
                />
              ))}
          </RadioGroup>
        </FormControl>
      </CardContent>
    </Card>
  );
}

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      validateAnswer,
    },
    dispatch
  );

export default connect(null, mapDispatchToProps)(QuizCard);
