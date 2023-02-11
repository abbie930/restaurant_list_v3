module.exports = {
  validateFormInput: function ({ google_map, phone, image }) {
    return {
      phone: phone.match(/^\(?\d{2}\)?[\s\-]?\d{4}\-?\d{4}$/) ? true : false,
      google_map: google_map.match(/https:\/\/|http:\/\//) ? true : false,
      image: image.match(/https:\/\/|http:\/\//) ? true : false,
    }
  },
}