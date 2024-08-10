import request from 'supertest';
import express from 'express';
import router from '../src/routes/userRoutes'; // Update with the actual path to your router
import sequelize from '../src/config/database'; // Update with the actual path to your sequelize instance
import User from '../src/models/userModel'; // Update with the actual path to your User model
import Role from '../src/models/role'; // Update with the actual path to your Role model
import JWT from 'jsonwebtoken';
import bcrypt from 'bcrypt';

// Initialize express app
const app = express();
app.use(express.json()); // Middleware to parse JSON bodies
app.use('/api', router); // Use your router

const SECRET_KEY = 'jkdfhajfkhkd';

beforeAll(async () => {
  // Connect to the database and sync models
  await sequelize.sync({ force: true }); // Reset the database
});

afterAll(async () => {
  // Close the database connection
  await sequelize.close();
});
describe('Auth Routes and Middleware', () => {

  // Test POST /signup route
  test('should sign up a user and return a token', async () => {
    const response = await request(app)
      .post('/auth/signup')
      .send({
        email: 'test@example.com',
        password: 'password',
        name: 'Test User',
        roleId: 1
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token');
  });

  // Test POST /login route
  it('should log in a user and return a token', async () => {
    await User.create({
      name: 'Test User',
      email: 'test@example.com',
      password: await bcrypt.hash('password', 10),
      roleId: 1
    });

    const response = await request(app)
      .post('/api/login')
      .send({
        email: 'test@example.com',
        password: 'password'
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token');
  });

  // Test middleware checkAuth
  it('should pass checkAuth middleware with valid token', async () => {
    const user = await User.create({
      name: 'Test User',
      email: 'test@example.com',
      password: await bcrypt.hash('password', 10),
      roleId: 1
    });

    const token = JWT.sign({ payload: { email: user.email, roleId: user.roleId } }, SECRET_KEY, { expiresIn: '1h' });

    const response = await request(app)
      .get('/api/users') // Update with an actual route that uses checkAuth
      .set('x-auth-token', token);

    expect(response.status).toBe(200); // Adjust based on your route's expected outcome
  });

  /*  // Test middleware checkAdmin
   it('should pass checkAdmin middleware with valid admin token', async () => {
     const role = await Role.create({ type: 'admin' });
     const user = await User.create({
       name: 'Admin User',
       email: 'admin@example.com',
       password: await bcrypt.hash('password', 10),
       roleId: role.id
     });
 
     const token = JWT.sign({ payload: { email: user.email, roleId: user.roleId } }, SECRET_KEY, { expiresIn: '1h' });
 
     const response = await request(app)
       .delete('/api/some-protected-admin-route') // Update with an actual route that uses checkAdmin
       .set('x-auth-token', token);
 
     expect(response.status).toBe(200); // Adjust based on your route's expected outcome
   }); */

  // Test middleware checkAuth with invalid token
  it('should fail checkAuth middleware with invalid token', async () => {
    const response = await request(app)
      .get('/api/users') // Update with an actual route that uses checkAuth
      .set('x-auth-token', 'invalid-token');

    expect(response.status).toBe(400);
    expect(response.body.errors[0].msg).toBe('Access Denied');
  });

  // Test middleware checkAdmin with non-admin token
  it('should fail checkAdmin middleware with non-admin token', async () => {
    const user = await User.create({
      name: 'Regular User',
      email: 'user@example.com',
      password: await bcrypt.hash('password', 10),
      roleId: 2 // Non-admin role
    });

    const token = JWT.sign({ payload: { email: user.email, roleId: user.roleId } }, SECRET_KEY, { expiresIn: '1h' });

    const response = await request(app)
      .delete('/api/some-protected-admin-route') // Update with an actual route that uses checkAdmin
      .set('x-auth-token', token);

    expect(response.status).toBe(400);
    expect(response.body.errors[0].msg).toBe('Not Authorized');
  });

});
