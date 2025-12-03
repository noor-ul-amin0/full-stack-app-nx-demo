import { FastifyInstance } from 'fastify';
import { faker } from '@faker-js/faker';

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  avatar: string;
  role: 'admin' | 'user' | 'moderator';
  isActive: boolean;
  createdAt: string;
  lastLoginAt: string;
}

// Generate a fake user
const generateUser = (): User => ({
  id: faker.string.uuid(),
  email: faker.internet.email(),
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  avatar: faker.image.avatar(),
  role: faker.helpers.arrayElement(['admin', 'user', 'moderator']),
  isActive: faker.datatype.boolean({ probability: 0.8 }),
  createdAt: faker.date.past().toISOString(),
  lastLoginAt: faker.date.recent().toISOString(),
});

// In-memory store for users
const users: User[] = Array.from({ length: 10 }, generateUser);

export default async function (fastify: FastifyInstance) {
  // GET /users - Get all users
  fastify.get('/users', async function (request) {
    const { role, isActive } = request.query as {
      role?: string;
      isActive?: string;
    };

    let filteredUsers = [...users];

    if (role) {
      filteredUsers = filteredUsers.filter((user) => user.role === role);
    }

    if (isActive !== undefined) {
      filteredUsers = filteredUsers.filter(
        (user) => user.isActive === (isActive === 'true')
      );
    }

    return {
      data: filteredUsers,
      total: filteredUsers.length,
    };
  });

  // GET /users/:id - Get a single user
  fastify.get('/users/:id', async function (request, reply) {
    const { id } = request.params as { id: string };
    const user = users.find((u) => u.id === id);

    if (!user) {
      return reply.status(404).send({ error: 'User not found' });
    }

    return { data: user };
  });

  // POST /users - Create a new user
  fastify.post('/users', async function (request, reply) {
    const body = request.body as Partial<User>;

    const newUser: User = {
      id: faker.string.uuid(),
      email: body.email || faker.internet.email(),
      firstName: body.firstName || faker.person.firstName(),
      lastName: body.lastName || faker.person.lastName(),
      avatar: body.avatar || faker.image.avatar(),
      role: body.role || 'user',
      isActive: body.isActive ?? true,
      createdAt: new Date().toISOString(),
      lastLoginAt: new Date().toISOString(),
    };

    users.push(newUser);

    return reply.status(201).send({ data: newUser });
  });

  // PUT /users/:id - Update a user
  fastify.put('/users/:id', async function (request, reply) {
    const { id } = request.params as { id: string };
    const body = request.body as Partial<User>;
    const userIndex = users.findIndex((u) => u.id === id);

    if (userIndex === -1) {
      return reply.status(404).send({ error: 'User not found' });
    }

    users[userIndex] = {
      ...users[userIndex],
      ...body,
      id: users[userIndex].id, // Prevent ID from being changed
    };

    return { data: users[userIndex] };
  });

  // DELETE /users/:id - Delete a user
  fastify.delete('/users/:id', async function (request, reply) {
    const { id } = request.params as { id: string };
    const userIndex = users.findIndex((u) => u.id === id);

    if (userIndex === -1) {
      return reply.status(404).send({ error: 'User not found' });
    }

    const deleted = users.splice(userIndex, 1)[0];

    return { data: deleted, message: 'User deleted successfully' };
  });

  // POST /users/generate - Generate new fake users
  fastify.post('/users/generate', async function (request, reply) {
    const { count = 5 } = request.body as { count?: number };
    const newUsers = Array.from({ length: count }, generateUser);
    users.push(...newUsers);

    return reply.status(201).send({
      data: newUsers,
      message: `Generated ${count} new users`,
      total: users.length,
    });
  });
}
