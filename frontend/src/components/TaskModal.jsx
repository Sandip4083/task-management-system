import { useState } from 'react';
import toast from 'react-hot-toast';
import { HiOutlineX, HiOutlineCalendar } from 'react-icons/hi';

function TaskModal({ task, onClose, onSave }) {
  const isEditing = !!task?.id;
  const [formData, setFormData] = useState({
    title: task?.title || '',
    description: task?.description || '',
    priority: task?.priority || 'medium',
    dueDate: task?.dueDate || '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      toast.error('Title is required');
      return;
    }

    setIsSubmitting(true);
    try {
      await onSave({
        ...formData,
        dueDate: formData.dueDate || null,
      });
      toast.success(isEditing ? 'Task updated!' : 'Task created!');
      onClose();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Something went wrong');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()} id="task-modal">
        <div className="modal-header">
          <h2>{isEditing ? 'Edit Task' : 'Create New Task'}</h2>
          <button className="modal-close" onClick={onClose} id="modal-close-btn">
            <HiOutlineX />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form" id="task-form">
          <div className="form-group">
            <label htmlFor="task-title">Title <span className="required">*</span></label>
            <input
              type="text"
              id="task-title"
              name="title"
              placeholder="What needs to be done?"
              value={formData.title}
              onChange={handleChange}
              required
              maxLength={200}
              autoFocus
            />
          </div>

          <div className="form-group">
            <label htmlFor="task-description">Description</label>
            <textarea
              id="task-description"
              name="description"
              placeholder="Add a description (optional)"
              value={formData.description}
              onChange={handleChange}
              rows={3}
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="task-priority">Priority</label>
              <select
                id="task-priority"
                name="priority"
                value={formData.priority}
                onChange={handleChange}
              >
                <option value="low">🟢 Low</option>
                <option value="medium">🟡 Medium</option>
                <option value="high">🔴 High</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="task-due-date">
                <HiOutlineCalendar style={{ marginRight: 4, verticalAlign: 'middle' }} />
                Due Date
              </label>
              <input
                type="date"
                id="task-due-date"
                name="dueDate"
                value={formData.dueDate}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="modal-actions">
            <button type="button" className="btn btn-ghost" onClick={onClose}>
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isSubmitting}
              id="task-save-btn"
            >
              {isSubmitting ? (
                <span className="btn-loading">
                  <span className="spinner-small"></span>
                  Saving...
                </span>
              ) : (isEditing ? 'Update Task' : 'Create Task')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TaskModal;
