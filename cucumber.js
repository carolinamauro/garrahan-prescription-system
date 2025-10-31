module.exports = {
  default: {
    require: ['features/support/env.js', 'features/step_definitions/**/*.js'], // step definitions
    format: ['progress', 'json:reports/cucumber-report.json'],
    publishQuiet: true,
  },
};
