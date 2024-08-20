'use server';

import bcrypt from 'bcrypt';
import { cookies } from 'next/headers';

import { UserType } from '@/lib/appTypes';
import { API_URL } from '@/lib/constants';
import { userSchema } from '@/lib/schemas';
import { redirect } from 'next/navigation';

export async function register(previousState: any, formData: FormData) {
  try {
    const data = userSchema.parse({
      name: formData.get('name'),
      password: formData.get('password'),
    });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(data.password, salt);

    const res = await fetch(`${API_URL}/users`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ name: data.name, password: hashedPassword }),
    });
    if (!res.ok) {
      const errorData = await res.json();
      return errorData.message || 'Registration failed.';
    }
  } catch (error) {
    return 'Failed to register. Please try again.';
  }
  redirect('/login');
}

export async function login(previousState: any, formData: FormData) {
  try {
    const data = userSchema.parse({
      name: formData.get('name'),
      password: formData.get('password'),
    });

    const res = await fetch(`${API_URL}/users`);
    if (!res.ok) {
      return 'Error while logging in.';
    }

    const users: UserType[] = await res.json();
    const foundUser = users.find(({ name }) => name === data.name);
    if (!foundUser) {
      return 'Credentials do not match any user.';
    }

    const isPasswordValid = await bcrypt.compare(data.password, foundUser.password);
    if (!isPasswordValid) {
      return 'Invalid password.';
    }

    const expires = new Date(Date.now() + 3600 * 1000);

    cookies().set({
      name: 'userId',
      value: foundUser.id,
      expires: expires,
      path: '/',
      httpOnly: true,
    });
  } catch (error) {
    return 'Failed to log in. Please try again.';
  }
  redirect('/');
}
