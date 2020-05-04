import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getQuizQA } from './store/actions/quizQA';
import Pagination from './components/pagination/pagination';
import QuizCard from './components/quiz-card/quiz.card';
import Loader from './components/base/loader';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import ButtonGroup from './components/base/buttongroup';

class App extends React.PureComponent {
  state = {
    quizQA: this.props.quizQA,
    currentQuestion: [],
    currentPage: null,
    totalPages: null,
  };

  componentDidMount() {
    this.props.getQuizQA();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.quizQA.length !== this.props.quizQA.length) {
      this.setState({
        quizQA: this.props.quizQA,
      });
    }
  }

  onPageChanged = (data) => {
    const { quizQA } = this.state;
    const { currentPage, totalPages, pageLimit } = data;

    const offset = (currentPage - 1) * pageLimit;
    const currentQuestion = quizQA.slice(offset, offset + pageLimit);

    this.setState({ currentPage, currentQuestion, totalPages });
  };

  quizCards = () => {
    return this.state.currentQuestion.map((i, index) => (
      <Fragment key={index}>
        <QuizCard
          questionSerialNo={++index}
          question={i.question.questionName}
          answers={i.answers}
        />
        <ButtonGroup />
      </Fragment>
    ));
  };

  render() {
    const { quizQA } = this.state;

    if (!quizQA.length) {
      return <Loader />;
    }
    return (
      <div>
        <React.Fragment>
          <CssBaseline />
          <Container maxWidth="sm">
            <Grid
              container
              direction="column"
              justify="flex-start"
              alignItems="center"
            >
              <Grid item xs={12}>
                <Typography variant="h5" gutterBottom>
                  Quiz
                </Typography>
              </Grid>
              <Grid item xs={12}>
                {this.quizCards()}
              </Grid>
              <Grid item xs={12}>
                <Pagination
                  totalRecords={quizQA.length}
                  pageLimit={1}
                  pageNeighbours={1}
                  onPageChanged={this.onPageChanged}
                />
              </Grid>
            </Grid>
          </Container>
        </React.Fragment>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    quizQA: state.quizReducer.quizQA,
  };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getQuizQA,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(App);
