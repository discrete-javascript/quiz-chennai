import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
// import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
// import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { useSelector, useDispatch } from 'react-redux';

const useStyles = makeStyles({
  root: {
    minWidth: 500,
    maxHeight: 1000,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function ScoreCard() {
  const classes = useStyles();

  const quizQALength = useSelector((state) => state.quizReducer.quizQA).length;
  const getSelection = useSelector(
    (state) => state.quizReducer.partialSelection
  );
  const calculateAnswer = () => {
    if (Object.keys(getSelection).length > 0) {
      const filterCorrectAnswer = Object.keys(getSelection).filter(
        (i) => getSelection[i]
      );
      return filterCorrectAnswer.length;
    }
  };

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography variant="h5" component="h2">
          Score
        </Typography>
        <Typography variant="body2" component="p">
          {calculateAnswer()}/{quizQALength}
        </Typography>
      </CardContent>
      {/* <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions> */}
    </Card>
  );
}
