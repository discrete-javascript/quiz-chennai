import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getQuizQA } from '../../store/actions/quizQA';
import Pagination from '../pagination/pagination';
import QuizCard from '../quiz-card/quiz.card';
import Loader from '../base/loader';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import ButtonGroup from '../base/buttongroup';
import { redirect } from '../../store/actions/redirectActions';

class QuizContainer extends React.PureComponent {
  state = {
    quizQA: this.props.quizQA,
    currentQuestion: [],
    currentPage: null,
    totalPages: null,
  };

  paginationRef = React.createRef();

  componentDidMount() {
    if (this.props.user.length > 0) {
      this.props.getQuizQA();
    } else {
      this.props.redirect('/sign-in');
    }
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
        <QuizCard question={i.question.questionName} answers={i.answers} />
        <ButtonGroup
          paginationRef={this.paginationRef}
          currentPage={this.state.currentPage}
          pageLength={this.props.quizQA.length}
        />
      </Fragment>
    ));
  };

  render() {
    const { quizQA } = this.state;

    if (!quizQA.length) {
      return <Loader />;
    }
    return (
      <React.Fragment>
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
            totalRecords={this.state.quizQA.length}
            pageLimit={1}
            pageNeighbours={5}
            onPageChanged={this.onPageChanged}
            ref={this.paginationRef}
          />
        </Grid>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    quizQA: state.quizReducer.quizQA,
    user: state.authReducer.user,
  };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getQuizQA,
      redirect,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(QuizContainer);
