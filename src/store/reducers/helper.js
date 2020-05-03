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

export const validateAnswer = (answers, selectedValue) => {
  console.log(answers);
  const getValidatedAnswer = answers[selectedValue.question];
  if (getValidatedAnswer.length === 1) {
    return {
      score: getValidatedAnswer.includes(selectedValue.answer),
    };
  }
  return {
    score: {
      [selectedValue.question]: getValidatedAnswer.includes(
        selectedValue.answer
      ),
    },
  };
  console.log(getValidatedAnswer);
};
