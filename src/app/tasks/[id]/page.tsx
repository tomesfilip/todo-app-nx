import { TaskDetail } from '@/components/taskDetail';
import { getTaskByUser } from '@/server/taskActions';

export default async function TaskDetailPage({ params }: { params: { id: string } }) {
  const { success: task, error } = await getTaskByUser(params.id);

  return (
    <>
      {error && <p>{error}</p>}
      {task && <TaskDetail task={task} />}
    </>
  );
}
