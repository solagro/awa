const capitalize = text => text[0].toUpperCase() + text.slice(1);

/**
 * Transform raw questions String into array of qualified answers
 *
 * @param {*} rawAnswers Raw answers texts with EOL (\n) as separator
 * @returns {Array} Array of answers
 */
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
  /**
   * Create an unique object with all answers translations
   */
  const allAnswers = [
    { language: 'en', answers: answersEn },
    ...answersI18n,
  ].reduce((acc, curr) => ({ ...acc, [curr.language]: curr.answers }), {});

  /**
   * Get Markdown version of each text:
   * {
   *   en: {
   *     question: markdownQuestionEn,
   *     explanation: markdownQuestionEn,
   *     answers: rawAnswersEn
   *   },
   *   fr: {
   *     question: markdownQuestionFr,
   *     explanation: markdownQuestionFr,
   *     answers: rawAnswersFr
   *   },
   *   ...
   * }
   */
  const allTexts = ['en', 'fr', 'es', 'et', 'de']
    .reduce((acc, lang) => (fields[`markdownQuestion${capitalize(lang)}`]
      ? {
        ...acc,
        [lang]: {
          question: fields[`markdownQuestion${capitalize(lang)}`].childMarkdownRemark.html,
          explanation: fields[`markdownExplanation${capitalize(lang)}`].childMarkdownRemark.html,
          answers: allAnswers[lang],
        },
      } : acc), {});

  /**
   * Get right texts according current language and available translations.
   */
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
