'use server';

import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';

import { TaskType } from '@/lib/appTypes';
import { API_URL } from '@/lib/constants';
import { taskSchema } from '@/lib/schemas';

function getUserId() {
  const userId = cookies().get('userId');
  if (!userId) {
    throw new Error('User not found. Please login');
  }
  return userId.value;
}

export async function getTasksByUser(): Promise<{
  success?: TaskType[];
  error?: string;
}> {
  try {
    const userId = getUserId();

    const res = await fetch(`${API_URL}/users/${userId}/tasks`);
    if (!res.ok) {
      return { error: 'No tasks were found.' };
    }

    const tasks: TaskType[] = await res.json();
    return { success: tasks };
  } catch (err) {
    return { error: 'No tasks were found.' };
  }
}

export async function getTaskByUser(taskId: string): Promise<{
  success?: TaskType;
  error?: string;
}> {
  try {
    const userId = getUserId();

    const res = await fetch(`${API_URL}/users/${userId}/tasks/${taskId}`);
    if (!res.ok) {
      return { error: 'No task were found.' };
    }

    const task: TaskType = await res.json();
    return { success: task };
  } catch (err) {
    return { error: 'No task were found.' };
  }
}

export async function addTask(formData: FormData) {
  const data = taskSchema.parse({
    title: formData.get('title'),
    description: formData.get('description'),
    isCompleted: false,
  });

  try {
    const userId = getUserId();

    const res = await fetch(`${API_URL}/users/${userId}/tasks`, {
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
  const userId = getUserId();

  const taskId = formData.get('taskId');
  if (!taskId) {
    throw new Error('Task not found');
  }

  const data = taskSchema.parse({
    title: formData.get('title'),
    description: formData.get('description'),
    isCompleted: false,
  });

  try {
    const res = await fetch(`${API_URL}/users/${userId}/tasks/${taskId}`, {
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
  const userId = getUserId();

  const taskId = formData.get('taskId');
  if (!taskId) {
    throw new Error('Task not found');
  }

  try {
    const res = await fetch(`${API_URL}/users/${userId}/tasks/${taskId}`, {
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
  const userId = getUserId();

  const taskId = formData.get('taskId');
  if (!taskId) {
    throw new Error('Task not found');
  }

  const isCompleted = formData.get('isCompleted');

  try {
    const res = await fetch(`${API_URL}/users/${userId}/tasks/${taskId}`, {
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
