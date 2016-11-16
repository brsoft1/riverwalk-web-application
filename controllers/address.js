address = require('../models/').address;

module.exports= {

  //Get a list of all authors using model.findAll()
  index(req, res) {
    address.findAll({
      include: address
    })
      .then(function (address) {
        res.status(200).json(address);
      })
      .catch(function (error) {
        res.status(500).json(error);
      });
  },

  //Create a new author using model.create()
  create(req, res) {
    address.create(req.body)
      .then(function (newAddress) {
        res.status(200).json(newAddress);
      })
      .catch(function (error){
        res.status(500).json(error);
      });
  },

  //Edit an existing author details using model.update()
  update(req, res) {
    address.update(req.body, {
      where: {
        id: req.params.id
      }
    })
    .then(function (updatedAddress) {
      res.status(200).json(updatedAddress);
    })
    .catch(function (error){
      res.status(500).json(error);
    });
  }
};
