import { UserStore } from '../../models/user';

const store = new UserStore();

describe('User Model', () => {
  it('should be defined', () => {
    expect(store).toBeDefined();
  });

  it('should have an index method', () => {
    expect(typeof store.index).toBe('function');
  });

  it('should have a show method', () => {
    expect(typeof store.show).toBe('function');
  });

  it('should have a create method', () => {
    expect(typeof store.create).toBe('function');
  });

  it('should have an authenticate method', () => {
    expect(typeof store.authenticate).toBe('function');
  });

  it('should create a new user', async () => {
    const user = {
      first_name: 'John',
      last_name: 'Lawrence',
      password: 'password',
    };

    const newUser = await store.create(user);

    expect(newUser).toBeDefined();
    expect(newUser.first_name).toBe(user.first_name);
    expect(newUser.last_name).toBe(user.last_name);
  });

  it('should return all users', async () => {
    const users = await store.index();

    expect(users).toBeDefined();
    expect(users.length).toBeGreaterThan(0);
  });

  it('should return user by id', async () => {
    const user = await store.show(1);

    expect(user).toBeDefined();
    expect(user.first_name).toBeTruthy();
    expect(user.last_name).toBeTruthy();
  });

  it('should authenticate user', async () => {
    const user = {
      first_name: 'John',
      last_name: 'Lawrence',
      password: 'password',
    };

    const authenticatedUser = await store.authenticate(user);

    expect(authenticatedUser).toBeDefined();
    expect(typeof authenticatedUser).toBe('string');
  });
});
