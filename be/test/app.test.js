const supertest = require('supertest');
const Mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const http = require('http');
const MemberModel = require('../src/model/member');
const app = require('../src/app');
const MemberControllers = require('../src/controller/member');

jest.mock('mongoose', () => {
  const mongoose = jest.requireActual('mongoose');
  return new mongoose.Mongoose(); // new mongoose instance and connection for each test
});

const data = [{
  name: 'Rubi',
  age: 31,
  gender: 'F'
},
{
  name: 'Randy',
  age: 32,
  gender: 'M'
},
{
  name: 'Apple',
  age: 18,
  gender: 'F'
},
{
  name: 'Mango',
  age: 14,
  gender: 'F'
},
{
  name: 'Ferry',
  age: 37,
  gender: 'M'
},
{
  name: 'Johnson',
  age: 55,
  gender: 'M'
},
{
  name: 'Larry',
  age: 45,
  gender: 'M'
},
{
  name: 'Ryne',
  age: 12,
  gender: 'F'
},
{
  name: 'Christopher',
  age: 24,
  gender: 'M'
}];

describe('app.js', () => {
  let mongod;
  beforeAll(async () => {
    mongod = new MongoMemoryServer();
    await mongod.start();
    const mongoDbUri = await mongod.getUri();
    await Mongoose.connect(mongoDbUri, {
      useUnifiedTopology: true,
      useNewUrlParser: true
    });
    await MemberModel.create(data);
  });

  afterEach(async () => {
    expect.hasAssertions();
    jest.clearAllMocks();
  });

  afterAll(async () => {
    await MemberModel.deleteMany({});
    await mongod.stop();
    await Mongoose.connection.close();
  });

  it('test init app', async () => {
    const res = await supertest(app).get('/').expect(200);
    expect(res.statusCode).toBe(200);
  });

  it('test get /bar', async () => {
    const res = await MemberControllers.getBar();
    expect(res).toEqual([
      {
        label: 'Young adult',
        value: 6
      },
      {
        label: 'Adult',
        value: 2
      },
      {
        label: 'Seniors',
        value: 1
      }
    ]);
  });
  it('test get /bar fail', async () => {
    MemberModel.aggregate = jest.fn().mockRejectedValueOnce();
    const err = await MemberControllers.getBar().catch((e) => e);
    expect(err).toBeInstanceOf(Error);
  });

  it('test get /pie', async () => {
    const res = await MemberControllers.getPie();
    expect(res).toEqual(
      [
        {
          label: 'Female',
          value: 4
        },
        {
          label: 'Male',
          value: 5
        }
      ]
    );
  });

  it('test get /pie fail', async () => {
    MemberModel.aggregate = jest.fn().mockRejectedValueOnce();
    const err = await MemberControllers.getPie().catch((e) => e);
    expect(err).toBeInstanceOf(Error);
  });

  it('test get /chart', async () => {
    const res = await MemberControllers.getChart();
    expect(res).toHaveLength(9);
  });

  it('test get /chart fail', async () => {
    MemberModel.find = jest.fn().mockRejectedValueOnce();
    const err = await MemberControllers.getChart().catch((e) => e);
    expect(err).toBeInstanceOf(Error);
  });

  it('test post /chart', async () => {
    const res = await MemberControllers.setChart({
      name: 'test',
      age: 60,
      gender: 'M'
    });
    expect(res.name).toEqual('test');
  });

  it('test post /chart fail', async () => {
    MemberModel.create = jest.fn().mockRejectedValueOnce();
    const err = await MemberControllers.setChart().catch((e) => e);
    expect(err).toBeInstanceOf(Error);
  });
});
