const MemberModel = require('../model/member');

const tranlateData = (data) => (data
  ? Object.keys(data[0]).map((key) => ({
    label: key,
    value: data[0][key][0].count
  }))
  : []);

const getPie = async () => {
  try {
    const data = await MemberModel.aggregate([
      {
        $facet: {
          Female: [
            {
              $match: {
                gender: 'F'
              }
            },
            { $group: { _id: null, count: { $sum: 1 } } }
          ],
          Male: [
            {
              $match: {
                gender: 'M'
              }
            },
            { $group: { _id: null, count: { $sum: 1 } } }
          ]
        }
      }
    ]);
    const result = tranlateData(data);
    return result;
  }
  catch (err) {
    throw new Error(err);
  }
};
const getBar = async () => {
  try {
    const data = await MemberModel.aggregate([{
      $facet: {
        'Young adult': [
          {
            $match: {
              age: { $gte: 0, $lte: 35 }
            }
          },
          { $group: { _id: null, count: { $sum: 1 } } }
        ],
        Adult: [
          {
            $match: {
              age: { $gte: 36, $lte: 50 }
            }
          },
          { $group: { _id: null, count: { $sum: 1 } } }
        ],
        Seniors: [
          {
            $match: {
              age: { $gte: 51 }
            }
          },
          { $group: { _id: null, count: { $sum: 1 } } }
        ]
      }
    }]);
    const result = tranlateData(data);
    return result;
  }
  catch (err) {
    throw new Error(err);
  }
};

const getChart = async () => {
  try {
    const data = await MemberModel.find();
    return data;
  }
  catch (err) {
    throw new Error(err);
  }
};

const setChart = async (body) => {
  try {
    const data = await MemberModel.create(body);
    return data;
  }
  catch (err) {
    throw new Error(err);
  }
};

const MemberControllers = {
  getPie,
  getBar,
  getChart,
  setChart
};

module.exports = MemberControllers;
