const request = require('supertest');
const app = require('../../app');

const { createLaunch } = require('../../test/factories/launch.factory');

const { resetLaunches } = require('../../models/launches.model');

beforeEach(() => {
  resetLaunches();
});


test('It should respond with 200 and return launch array', async () => {
  const response = await request(app)
    .get('/v1/launches')
    .expect('Content-Type', /json/)
    .expect(200);

  expect(Array.isArray(response.body)).toBe(true);

  expect(response.body.length).toBeGreaterThan(0);

  const launch = response.body[0];

  expect(launch).toHaveProperty('flightNumber');
  expect(launch).toHaveProperty('mission');
  expect(launch).toHaveProperty('rocket');
  expect(launch).toHaveProperty('launchDate');
  expect(launch).toHaveProperty('target');
  expect(launch).toHaveProperty('customers');
  expect(launch).toHaveProperty('upcoming');
  expect(launch).toHaveProperty('success');
});


describe('Test POST /launch', () => {

  test('It should respond with 201 success', async () => {

    const completeLaunchData = createLaunch();

    const response = await request(app)
      .post('/v1/launches')
      .send(completeLaunchData)
      .expect('Content-Type', /json/)
      .expect(201);

    const requestDate = new Date(completeLaunchData.launchDate).valueOf();
    const responseDate = new Date(response.body.launchDate).valueOf();

    expect(responseDate).toBe(requestDate);

    const { launchDate, ...launchWithoutDate } = completeLaunchData;
    expect(response.body).toMatchObject(launchWithoutDate);

    expect(response.body.flightNumber).toBeDefined();
    expect(typeof response.body.flightNumber).toBe('number');
    expect(response.body.success).toBe(true);
    expect(response.body.upcoming).toBe(true);
    expect(Array.isArray(response.body.customers)).toBe(true);
    expect(response.body.customers).toContain('NASA');
  });

  test('It should catch missing required properties', async () => {

    const launchDataWithoutDate = createLaunch({ launchDate: undefined });

    const response = await request(app)
      .post('/v1/launches')
      .send(launchDataWithoutDate)
      .expect('Content-Type', /json/)
      .expect(400);

    expect(response.body).toStrictEqual({
      error: 'Missing required launch property',
    });
  });

  test('It should catch invalid dates', async () => {

    const launchDataWithInvalidDate = createLaunch({ launchDate: 'zoot' });

    const response = await request(app)
      .post('/v1/launches')
      .send(launchDataWithInvalidDate)
      .expect('Content-Type', /json/)
      .expect(400);

    expect(response.body).toStrictEqual({
      error: 'Invalid launch date',
    });
  });

});


describe('DELETE /v1/launches/:id', () => {

  test('It should abort an existing launch', async () => {

    const newLaunch = createLaunch();

    const postResponse = await request(app)
      .post('/v1/launches')
      .send(newLaunch);

    const createdLaunchId = postResponse.body.flightNumber;

    const deleteResponse = await request(app)
      .delete(`/v1/launches/${createdLaunchId}`)
      .expect(200)
      .expect('Content-Type', /json/);

    expect(deleteResponse.body.upcoming).toBe(false);
    expect(deleteResponse.body.success).toBe(false);

    const verifyResponse = await request(app)
      .get('/v1/launches')
      .expect(200);

    const abortedLaunch = verifyResponse.body.find(
      l => l.flightNumber === createdLaunchId
    );

    expect(abortedLaunch.upcoming).toBe(false);
    expect(abortedLaunch.success).toBe(false);
  });

  test('It should return 404 for non-existing launch', async () => {
    await request(app)
      .delete('/v1/launches/99999')
      .expect(404)
      .expect('Content-Type', /json/)
      .expect({
        error: 'Launch not found'
      });
  });

});
