import { TaskDetail } from '@/components/taskDetail';
import { getTaskByUser } from '@/server/taskActions';

const TaskDetailPage = async ({ params }: { params: { id: string } }) => {
  const { success: task, error } = await getTaskByUser(params.id);

  return (
    <div>
      {error && <p>{error}</p>}
      {task && <TaskDetail task={task} />}
    </div>
  );
};

export default TaskDetailPage;
