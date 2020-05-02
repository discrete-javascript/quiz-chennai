import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getQuizQA } from "./store/actions/quizQA";
import Pagination from "./components/pagination/pagination";
import QuizCard from "./components/quiz-card/quiz.card";

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
      <QuizCard
        questionSerialNo={++index}
        question={i.question.questionName}
        answers={i.answers}
      />
    ));
  };

  render() {
    const { quizQA } = this.state;

    if (!quizQA.length) {
      return null;
    }
    return (
      <div>
        {this.quizCards()}
        <div className="d-flex flex-row py-4 align-items-center">
          <Pagination
            totalRecords={quizQA.length}
            pageLimit={1}
            pageNeighbours={1}
            onPageChanged={this.onPageChanged}
          />
        </div>
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
