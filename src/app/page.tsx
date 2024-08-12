import { cookies } from 'next/headers';
import { TaskList } from './components/taskList';
import { getTasksByUser } from './server/taskActions';

export default async function Index() {
  const userId = cookies().get('userId');

  const { success: tasks, error } = await getTasksByUser();

  return (
    <main
      style={{
        display: 'flex',
        minHeight: '100svh',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '1rem 0',
      }}
    >
      <TaskList userId={userId?.value} tasks={tasks} error={error} />
    </main>
  );
}
