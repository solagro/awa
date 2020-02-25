/* eslint-disable import/prefer-default-export */

/**
 * Transform raw questions String into array of qualified answers
 *
 * @param {*} rawAnswers Raw answers texts with EOL (\n) as separator
 * @returns {Array} Array of answers
 */
const parseQuestions = rawAnswers => rawAnswers.trim().split('\n').map(rawAnswer => {
  const firstSpaceIndex = rawAnswer.indexOf(' ');

  const valid = rawAnswer.substr(0, firstSpaceIndex) === 'V';
  const text = rawAnswer.substr(firstSpaceIndex + 1);
  return { valid, text };
});

export const processQuizTexts = (
  {
    answers: answersEn,
    answer_i18n: answersI18n,
  },
  texts = [],
  lang,
) => {
  /**
   * Create an unique object with all answers translations
   */
  const allAnswers = [
    { language: 'en', answers: answersEn },
    ...(answersI18n || []),
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
  const textTree = texts.reduce((acc, { language, type, markdown: { htmlAst } }) => ({
    ...acc,
    [language]: {
      ...acc[language],
      [type]: htmlAst,
      answers: allAnswers[language],
    },
  }), {});

  /**
   * Get right texts according current language and available translations.
   */
  const getLocalText = lng => el => tree =>
    ((tree[lng] && tree[lng][el]) ? tree[lng][el] : undefined);
  const getLocalTextOrEn = lng => el => tree =>
    (getLocalText(lng)(el)(tree) || tree.en[el]);

  return {
    question: getLocalTextOrEn(lang)('question')(textTree),
    answers: parseQuestions(getLocalTextOrEn(lang)('answers')(textTree)),
    explanation: getLocalTextOrEn(lang)('explanation')(textTree),
    'learn-more': getLocalText(lang)('learn-more')(textTree),
  };
};
