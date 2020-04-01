const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');

describe('ONG', ()=> {
    beforeEach( async () => {
        await connection.migrate.rollback();
        await connection.migrate.latest();
    });
    
    afterAll( async ()=>{
        await connection.destroy();
    });

    it('should be able to creat a new ONG', async ()=>{
        const response = await request(app)
        .post('/ongs')
        .send({
            name: "APAD3",
	        email: "emaila@test.com",
	        whatsapp: "12345671189",
	        city: "manaus",
            uf: "AM"
        });

     expect(response.body).toHaveProperty( 'id');
     expect(response.body.id).toHaveLength(8);
    });
});