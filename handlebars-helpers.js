const Handlebars = require('handlebars')

Handlebars.registerHelper('ifeq', function (a, b, options) {
  if (a === b) {
    return options.fn(this)
  }
  return options.inverse(this)
})

Handlebars.registerHelper('validate', function (validation, options) {
  if (validation === undefined) {
    return
  }
  return validation ? 'is-valid' : 'is-invalid'
})
