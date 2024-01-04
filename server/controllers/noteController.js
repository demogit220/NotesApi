const catchAsync = require("../utils/catchAsync")

exports.homepage = catchAsync (async (req, res, next) => {
  const locals = [
    {
      id: 1,
      title: "nodejs",
      description: "nodejs is awesome",
    },
    {
      id: 2,
      title: "nodejs",
      description: "nodejs is awesome",
    },
  ];

  res.status(200).json({
    status: "success",
    results: locals.length,
    data: {
      locals,
    },
  });
});
