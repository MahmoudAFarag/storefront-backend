import supertest from 'supertest';
import { app } from '../../server';

const request = supertest(app);

interface User {
  id?: string;
  first_name: string;
  last_name: string;
  password: string;
}

describe('Users Router Endpoint', () => {
  const data: User = {
    first_name: 'David',
    last_name: 'Lawrence',
    password: 'secret',
  };

  let currentUser: User;

  let token = '';

  it('expects app to be defined', () => {
    expect(app).toBeDefined();
  });

  it('should create a new user', async () => {
    const user = await request.post('/users').set('Content-Type', 'application/json').send(data);

    token = user.text.replaceAll('"', '');

    expect(user.statusCode).toBe(200);
    expect(user.text).toContain('eyJhbGciOiJIUzI');
  });

  it('should list all users', async () => {
    const users = await request.get('/users').set('Authorization', 'Bearer ' + token);

    currentUser = users.body[0];
    expect(users.body.length).toBeGreaterThanOrEqual(1);
    expect(users.body.filter((user: Object) => user === data)).toBeTruthy();
  });

  it('should show user with provided id', async () => {
    const user = await request.get(`/users/${currentUser.id}`).set('Authorization', 'Bearer ' + token);

    expect(user.body).toBeDefined();
    expect(user.text).toContain('id');
    expect(user.text).toContain('last_name');
    expect(user.body).toEqual(currentUser);
  });

  it('should return an authentication token if valid user', async () => {
    const token = await request.post('/users/auth').set('Content-Type', 'application/json').send(data);

    expect(token.statusCode).toBe(200);
    expect(token.text).toContain('eyJhbGciOiJIUzI');
  });
});
