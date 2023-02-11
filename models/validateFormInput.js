module.exports = {
  validateFormInput: function ({ name, name_en, location, category, phone, rating, description, google_map, image }) {
    return {
      name: name.length > 0 ? true : false,
      name_en: name_en.length >= 0 ? true : false,
      location: location.length > 0 ? true : false,
      category: category ? true : false,
      phone: phone.match(/^\(?\d{2}\)?[\s\-]?\d{4}\-?\d{4}$/) ? true : false,
      rating: rating === '' ? false : rating >= 0 && rating <= 5 ? true : false,
      description: description.length >= 0 ? true : false,
      google_map: google_map.match(/https:\/\/|http:\/\//) ? true : false,
      image: image.match(/https:\/\/|http:\/\//) ? true : false,
    }
  },
}