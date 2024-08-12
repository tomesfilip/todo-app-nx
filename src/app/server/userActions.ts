'use server';

import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { z } from 'zod';
import { UserType } from '../lib/appTypes';
import { API_URL } from '../lib/constants';

export async function register(formData: FormData) {
  // TODO: use hashed password with a salt instead of plain text

  const schema = z.object({
    name: z.string().min(5),
    password: z.string().min(5),
  });

  const data = schema.parse({
    name: formData.get('name'),
    password: formData.get('password'),
  });

  try {
    const res = await fetch(`${API_URL}/users`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      throw new Error('Error while creating user');
    }
    revalidatePath('/');
  } catch (error) {
    throw new Error('Failed to create a task');
  }
}

export async function login(formData: FormData) {
  const schema = z.object({
    name: z.string().min(5),
    password: z.string().min(5),
  });

  const data = schema.parse({
    name: formData.get('name'),
    password: formData.get('password'),
  });

  try {
    const res = await fetch(`${API_URL}/users`);

    if (!res.ok) {
      return { error: 'Error while logging in' };
    }

    const users: UserType[] = await res.json();
    const foundUser = users.find(({ name, password }) => name === data.name && password === data.password);

    if (!foundUser) {
      return { error: 'Credentials does not match any user' };
    }

    const expires = new Date(Date.now() + 3600 * 1000);

    cookies().set({
      name: 'userId',
      value: foundUser.id,
      expires: expires,
      path: '/',
      httpOnly: true,
    });

    revalidatePath('/');
  } catch (error) {
    throw new Error('Failed to log in');
  }
}
