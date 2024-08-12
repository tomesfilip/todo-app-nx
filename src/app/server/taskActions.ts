'use server';

import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { z } from 'zod';
import { TaskType } from '../lib/appTypes';
import { API_URL } from '../lib/constants';

export async function getTasksByUser(): Promise<{
  success?: TaskType[];
  error?: string;
}> {
  try {
    const userId = cookies().get('userId');
    if (!userId) {
      return { error: 'User not found. Please login' };
    }

    const res = await fetch(`${API_URL}/users/${userId.value}/tasks`);
    if (!res.ok) {
      return { error: 'No tasks were found.' };
    }

    const tasks: TaskType[] = await res.json();
    return { success: tasks };
  } catch (err) {
    return { error: 'No tasks were found.' };
  }
}

export async function addTask(formData: FormData) {
  const userId = cookies().get('userId');
  if (!userId) {
    return { error: 'User not found. Please login' };
  }

  const schema = z.object({
    title: z.string().min(1),
    isCompleted: z.boolean(),
  });

  const data = schema.parse({
    title: formData.get('title'),
    isCompleted: false,
  });

  try {
    const res = await fetch(`${API_URL}/users/${userId.value}/tasks`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      throw new Error('Task not found');
    }
    revalidatePath('/');
  } catch (error) {
    throw new Error('Failed to create a task');
  }
}

export async function editTask(formData: FormData) {
  const userId = cookies().get('userId');
  if (!userId) {
    return { error: 'User not found. Please login' };
  }

  const taskId = formData.get('taskId');
  if (!taskId) {
    throw new Error('Task not found');
  }

  const schema = z.object({
    title: z.string().min(1),
    isCompleted: z.boolean(),
  });

  const data = schema.parse({
    title: formData.get('title'),
    isCompleted: false,
  });

  try {
    const res = await fetch(`${API_URL}/users/${userId.value}/tasks/${taskId}`, {
      method: 'PUT',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      throw new Error('Task not found');
    }
    revalidatePath('/');
  } catch (error) {
    throw new Error('Failed to create a task');
  }
}

export async function deleteTask(formData: FormData) {
  const userId = cookies().get('userId');
  if (!userId) {
    return { error: 'User not found. Please login' };
  }

  const taskId = formData.get('taskId');
  if (!taskId) {
    throw new Error('Task not found');
  }

  try {
    const res = await fetch(`${API_URL}/users/${userId.value}/tasks/${taskId}`, {
      method: 'DELETE',
    });
    if (!res.ok) {
      throw new Error('Failed to delete a task');
    }

    revalidatePath('/');
  } catch (error) {
    throw new Error('Failed to delete a task');
  }
}

export async function toggleCompleted(formData: FormData) {
  const userId = cookies().get('userId');
  if (!userId) {
    return { error: 'User not found. Please login' };
  }

  const taskId = formData.get('taskId');
  if (!taskId) {
    throw new Error('Task not found');
  }

  const isCompleted = formData.get('isCompleted');

  try {
    const res = await fetch(`${API_URL}/users/${userId.value}/tasks/${taskId}`, {
      method: 'PUT',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        isCompleted: !(isCompleted === 'checked'),
      }),
    });

    if (!res.ok) {
      throw new Error('Failed to update a task');
    }

    revalidatePath('/');
  } catch (error) {
    throw new Error('Failed to update a task');
  }
}
