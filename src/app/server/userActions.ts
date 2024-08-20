'use server';

import bcrypt from 'bcrypt';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';

import { UserType } from '@/lib/appTypes';
import { API_URL } from '@/lib/constants';
import { userSchema } from '@/lib/schemas';

export async function register(formData: FormData) {
  const data = userSchema.parse({
    name: formData.get('name'),
    password: formData.get('password'),
  });

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(data.password, salt);

  try {
    const res = await fetch(`${API_URL}/users`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ name: data.name, password: hashedPassword }),
    });
    if (!res.ok) {
      throw new Error('Error while creating user');
    }
    revalidatePath('/');
  } catch (error) {
    console.error(error);
    throw new Error('Failed to create a user');
  }
}

export async function login(formData: FormData) {
  const data = userSchema.parse({
    name: formData.get('name'),
    password: formData.get('password'),
  });

  try {
    const res = await fetch(`${API_URL}/users`);

    if (!res.ok) {
      return { error: 'Error while logging in' };
    }

    const users: UserType[] = await res.json();

    const foundUser = users.find(({ name }) => name === data.name);
    if (!foundUser) {
      return { error: 'Credentials does not match any user' };
    }

    const isPasswordValid = await bcrypt.compare(data.password, foundUser.password);
    if (!isPasswordValid) {
      return { error: 'Invalid password' };
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
