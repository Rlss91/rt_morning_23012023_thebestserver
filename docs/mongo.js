db.books.find({
  $and: [{ pageCount: { $gte: 1 } }, { pageCount: { $lte: 200 } }],
});

db.books.find({
  $or: [{ pageCount: 0 }, { pageCount: 200 }],
});

db.books.countDocuments({ pageCount: 0 });

db.books.find(
  {
    pageCount: 0,
  },
  { status: 1, _id: 0 }
);

db.books.find({ pageCount: 0 }).limit(2);

db.books.find({ pageCount: 0 }).limit(2).skip(2).sort({ _id: 1 });

db.books.aggregate([
  { $match: { pageCount: 0 } },
  { $skip: 2 },
  { $limit: 2 },
  { $sort: { _id: 1 } },
]);
