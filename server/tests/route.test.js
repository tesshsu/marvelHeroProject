const request = require('supertest');
const app = require('../src/server');

describe('GET /api/characters', () => {
    it('should return a list of characters and pagination metadata', async () => {
        const response = await request(app)
            .get('/api/characters')
            .expect(200);

        expect(response.body.count).toBeDefined();
        expect(response.body.results).toBeDefined();
        expect(response.body.pagination).toBeDefined();
    });

    it('should return pagination metadata', async () => {
        const response = await request(app)
            .get('/api/characters?page=2&limit=5')
            .expect(200);

        expect(response.body.pagination.totalPages).toBeDefined();
    });
});
