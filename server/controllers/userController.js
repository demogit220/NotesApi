exports.homepage = async (req, res) => {
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
};
