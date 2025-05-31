import request from 'supertest';

import app from '../../app';

describe('Cities', () => {
  it('should fetch all cities', async () => {
    const response = await request(app).get('/api/cities');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: 1,
          name: 'Adana',
        }),
      ]),
    );
  });
});
