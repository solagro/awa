const capitalize = text => text[0].toUpperCase() + text.slice(1);
const isLive = typeof window !== 'undefined';

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
    fields,
  },
  i18n,
) => {
  /**
   * Create an unique object with all answers translations
   */
  const allAnswers = [
    { language: 'en', answers: answersEn },
    ...(answersI18n || []),
  ].reduce((acc, curr) => ({ ...acc, [curr.language]: curr.answers }), {});

  /**
   * Avoid to throw when field does not exists
   */
  const getHtmlFromNodeFields = (object, type, lang) => {
    try {
      const key = `markdown${capitalize(type)}${capitalize(lang)}`;
      const mainNode = object[key];
      const remarkNode = mainNode.childMarkdownRemark;
      return remarkNode.htmlAst;
    } catch (e) {
      if (isLive) {
        // eslint-disable-next-line no-console
        console.error(`No "${type}" for current node`, object);
        // eslint-disable-next-line no-console
        console.error(e);
      }
      return undefined;
    }
  };

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
          question: getHtmlFromNodeFields(fields, 'question', lang),
          explanation: getHtmlFromNodeFields(fields, 'explanation', lang),
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

export default processQuizTexts;
