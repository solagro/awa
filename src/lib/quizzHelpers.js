const capitalize = text => text[0].toUpperCase() + text.slice(1);

const parseQuestions = rawAnswers => rawAnswers.split('\n').map(rawAnswer => {
  const firstSpaceIndex = rawAnswer.indexOf(' ');

  const valid = rawAnswer.substr(0, firstSpaceIndex) === 'V';
  const text = rawAnswer.substr(firstSpaceIndex + 1);
  return { valid, text };
});

export const processQuizzTexts = (
  {
    answers: answersEn,
    answer_i18n: answersI18n,
    fields,
  },
  i18n,
) => {
  const allAnswers = [
    { language: 'en', answers: answersEn },
    ...answersI18n,
  ].reduce((acc, curr) => ({ ...acc, [curr.language]: curr.answers }), {});

  const allTexts = ['en', 'fr', 'es', 'et', 'de'].reduce((acc, lang) => {
    return fields[`markdownQuestion${capitalize(lang)}`]
      ? {
        ...acc,
        [lang]: {
          question: fields[`markdownQuestion${capitalize(lang)}`].childMarkdownRemark.html,
          explanation: fields[`markdownExplanation${capitalize(lang)}`].childMarkdownRemark.html,
          answers: allAnswers[lang],
        },
      } : acc;
  }, {});

  const [question, rawAnswers, explanation] = ['question', 'answers', 'explanation']
    .map(textElement => (
      (allTexts[i18n.language] && allTexts[i18n.language][textElement])
        ? allTexts[i18n.language][textElement]
        : allTexts.en[textElement]
    ));

  const answers = parseQuestions(rawAnswers);

  return {
    question,
    answers,
    explanation,
  };
};

export default processQuizzTexts;
