import { HiOutlineCheckCircle, HiOutlinePencil, HiOutlineTrash, HiOutlineClock, HiOutlineCalendar } from 'react-icons/hi';

const priorityConfig = {
  low: { label: 'Low', color: '#22c55e', bg: 'rgba(34,197,94,0.12)' },
  medium: { label: 'Medium', color: '#f59e0b', bg: 'rgba(245,158,11,0.12)' },
  high: { label: 'High', color: '#ef4444', bg: 'rgba(239,68,68,0.12)' },
};

function TaskCard({ task, onToggle, onEdit, onDelete }) {
  const isCompleted = task.status === 'completed';
  const priority = priorityConfig[task.priority] || priorityConfig.medium;
  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && !isCompleted;

  const formatDate = (dateStr) => {
    if (!dateStr) return null;
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className={`task-card ${isCompleted ? 'task-completed' : ''} ${isOverdue ? 'task-overdue' : ''}`} id={`task-card-${task.id}`}>
      <div className="task-card-left">
        <button
          className={`task-check ${isCompleted ? 'checked' : ''}`}
          onClick={() => onToggle(task.id)}
          title={isCompleted ? 'Mark as pending' : 'Mark as completed'}
          id={`task-toggle-${task.id}`}
        >
          {isCompleted ? <HiOutlineCheckCircle /> : <div className="check-circle" />}
        </button>

        <div className="task-info">
          <h3 className={`task-title ${isCompleted ? 'completed-text' : ''}`}>
            {task.title}
          </h3>
          {task.description && (
            <p className="task-description">{task.description}</p>
          )}
          <div className="task-meta">
            <span className="priority-badge" style={{ color: priority.color, background: priority.bg }}>
              {priority.label}
            </span>
            {task.dueDate && (
              <span className={`due-date ${isOverdue ? 'overdue' : ''}`}>
                <HiOutlineCalendar />
                {formatDate(task.dueDate)}
              </span>
            )}
            <span className="task-time">
              <HiOutlineClock />
              {formatDate(task.createdAt)}
            </span>
          </div>
        </div>
      </div>

      <div className="task-actions">
        <button
          className="task-action-btn edit-btn"
          onClick={() => onEdit(task)}
          title="Edit task"
          id={`task-edit-${task.id}`}
        >
          <HiOutlinePencil />
        </button>
        <button
          className="task-action-btn delete-btn"
          onClick={() => onDelete(task.id)}
          title="Delete task"
          id={`task-delete-${task.id}`}
        >
          <HiOutlineTrash />
        </button>
      </div>
    </div>
  );
}

export default TaskCard;
