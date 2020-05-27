const categories = ['climate-change', 'agricultural-impacts', 'adaptation'];
const languages = ['fr', 'de', 'et', 'es'];

module.exports = {
  backend: {
    name: 'github',
    repo: 'solagro/awa',
  },

  media_library: {
    name: 'cloudinary',
    output_filename_only: false,
    use_transformations: false,
    use_secure_url: true,
    config: {
      cloud_name: 'solagro',
      api_key: 511656513188816,
    },
  },

  collections: [
    { theme: 'north', name: 'quiz-n', label: 'Quiz: North' },
    { theme: 'atlantic', name: 'quiz-a', label: 'Quiz: Atlantic' },
    { theme: 'continental', name: 'quiz-c', label: 'Quiz: Continental' },
    { theme: 'meridional', name: 'quiz-m', label: 'Quiz: Meridional' },
  ].map(({ theme, ...rest }) => ({
    name: 'quiz',
    extension: 'json',
    label: 'Quiz question/answer',
    folder: `content/quiz/${theme}`,
    create: true,
    delete: true,
    editor: { preview: false },
    ...rest,
    fields: [
      { label: 'Theme', name: 'theme', widget: 'hidden', default: theme },
      { label: 'Category', name: 'category', widget: 'select', options: categories },
      { label: 'Title (used only for technical references', name: 'title', widget: 'string' },
      { label: 'Order', name: 'order', widget: 'number' },
      { label: 'Question (en)', name: 'question', widget: 'markdown' },
      {
        label: 'Question translations',
        name: 'question-i18n',
        widget: 'list',
        fields: [
          { label: 'Language', name: 'language', widget: 'select', options: languages },
          { label: 'Question', name: 'question', widget: 'markdown' },
        ],
      },
      { label: 'Answers (en)', name: 'answers', widget: 'text' },
      {
        label: 'Answer translations',
        name: 'answer-i18n',
        widget: 'list',
        fields: [
          { label: 'Language', name: 'language', widget: 'select', options: languages },
          { label: 'Answers', name: 'answers', widget: 'text' },
        ],
      },
      { label: 'Explanation (en)', name: 'explanation', widget: 'markdown' },
      {
        label: 'Explanation translations',
        name: 'explanation-i18n',
        widget: 'list',
        fields: [
          { label: 'Language', name: 'language', widget: 'select', options: languages },
          { label: 'Explanation', name: 'explanation', widget: 'markdown' },
        ],
      },
      { label: 'Learn more (en)', name: 'learn-more', widget: 'markdown', required: false },
      {
        label: 'Learn more translations',
        name: 'learn-more-i18n',
        widget: 'list',
        fields: [
          { label: 'Language', name: 'language', widget: 'select', options: languages },
          { label: 'Learn more', name: 'learn-more', widget: 'markdown' },
        ],
      },
    ],
  })),
};
