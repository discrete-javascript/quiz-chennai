const findCorrectAnswer = (answers) =>
  answers
    .filter((answer) => answer.correct_answer === 'Y')
    .map((i) => i.pk_answerid);

export const getAnswers = (QAs) =>
  QAs.reduce(
    (acc, curr) => ({
      ...acc,
      [curr.question.pk_questionid]: !!curr.answers.length
        ? findCorrectAnswer(curr.answers)
        : null,
    }),
    0
  );
