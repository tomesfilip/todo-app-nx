import { cookies } from 'next/headers';
import { TaskList } from './components/taskList';
import { getTasksByUser } from './server/taskActions';

export default async function Index() {
  const userId = cookies().get('userId');

  const { success: tasks, error } = await getTasksByUser();

  return (
    <>
      <TaskList userId={userId?.value} tasks={tasks} error={error} />
    </>
  );
}
