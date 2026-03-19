import { HiOutlineCheckCircle, HiOutlinePencil, HiOutlineTrash, HiOutlineClock, HiOutlineCalendar } from 'react-icons/hi';

const priorityConfig = {
  low:    { label: 'Low',    color: '#5dda9a', bg: 'rgba(93,218,154,0.12)' },
  medium: { label: 'Medium', color: '#f8d06a', bg: 'rgba(248,208,106,0.12)' },
  high:   { label: 'High',   color: '#f07a93', bg: 'rgba(240,122,147,0.12)' },
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
    <div
      className={`task-card ${isCompleted ? 'task-completed' : ''} ${isOverdue ? 'task-overdue' : ''}`}
      id={`task-card-${task.id}`}
      data-priority={task.priority}
    >
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
            <span
              className="priority-badge"
              style={{ color: priority.color, background: priority.bg }}
            >
              {priority.label}
            </span>
            {task.dueDate && (
              <span className={`due-date ${isOverdue ? 'overdue' : ''}`}>
                <HiOutlineCalendar />
                {isOverdue ? '⚠ ' : ''}{formatDate(task.dueDate)}
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
