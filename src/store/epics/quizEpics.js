import { filter, mapTo, map, mergeMap } from "rxjs/operators";
import { ajax } from "rxjs/ajax";
import { ofType } from "redux-observable";
import { Observable, from } from "rxjs";
import { getQuizQA, setQuizQA } from "../actions/quizQA";
import ApiClient from "../services";
import { GET_QUIZ_QA } from "../actions/constants";

const quizEpic = (action$) =>
  action$.pipe(
    ofType(GET_QUIZ_QA),
    mergeMap((action) =>
      ajax
        .getJSON(
          "https://spring-jdbc.cfapps.io/findAllQuestionwithAnswerforAll"
        )
        .pipe(map((response) => setQuizQA(response)))
    )
  );

export default quizEpic;
