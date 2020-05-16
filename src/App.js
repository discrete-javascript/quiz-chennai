import React from 'react';
import { Switch, Route } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import ScoreCard from './components/score-card/score.card';
import SignIn from './components/sign-in/sign.in';
import SignUp from './components/sign-up/sign.up';
import QuizContainer from './components/quiz-card/quiz-container';

class App extends React.PureComponent {
  render() {
    return (
      <div>
        <CssBaseline />
        <Container maxWidth="sm">
          <Grid
            container
            direction="column"
            justify="flex-start"
            alignItems="center"
          >
            {/* <Switch> */}
            <Route exact path={['/mobile/quiz', '/sign-in']}>
              <SignIn />
            </Route>
            <Route exact path="/sign-up">
              <SignUp />
            </Route>
            <Route exact path="/questions">
              <QuizContainer />
            </Route>
            <Route exact path="/score-card">
              <ScoreCard />
            </Route>
            {/* </Switch> */}
          </Grid>
        </Container>
      </div>
    );
  }
}

export default App;
