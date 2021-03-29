function paginatedResults(model, type = null, model2 = null) {
  return async (req, res, next) => {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    const newModel = model2 !== null && (await model2.findById(req.params.id));
    let count;
    const params =
      type === 'category'
        ? { category: req.params.category }
        : type === 'special'
        ? { special: true }
        : type === 'userOrder'
        ? { 'user.email': newModel.email }
        : null;

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const results = {};

    if (endIndex < (await model.countDocuments().exec())) {
      results.next = {
        page: page + 1,
        limit: limit,
      };
    }

    if (startIndex > 0) {
      results.previous = {
        page: page - 1,
        limit: limit,
      };
    }
    try {
      if (type !== 'reviews') {
        results.results =
          type === null
            ? await model.find().limit(limit).skip(startIndex).exec()
            : await model.find(params).limit(limit).skip(startIndex).exec();

        count = await model.countDocuments();
        results.pages = Math.ceil(count / limit);

        res.paginatedResults = results;
      } else {
        const data = await model
          .findById(req.params.id)
          .limit(limit)
          .skip(startIndex)
          .exec();
        results.results = data.reviews;
        count = await model.countDocuments().exec();
        results.pages = Math.ceil(count / limit);
        res.paginatedResults = results;
      }
      next();
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  };
}

module.exports = paginatedResults;
