module.exports = {
  index: async (req, res, next) => {
    res.status(200)
      .send({ msg: 'ok' });
  },
  show: async (req, res, next) => {

  },
  
}