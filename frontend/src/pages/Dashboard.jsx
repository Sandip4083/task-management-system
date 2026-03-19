import { useState, useEffect, useCallback, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import taskService from '../services/taskService';
import TaskCard from '../components/TaskCard';
import TaskModal from '../components/TaskModal';
import toast from 'react-hot-toast';
import {
  HiOutlinePlus,
  HiOutlineSearch,
  HiOutlineLogout,
  HiOutlineCollection,
  HiOutlineCheckCircle,
  HiOutlineClock,
  HiOutlineLightningBolt,
  HiOutlineChevronLeft,
  HiOutlineChevronRight,
  HiOutlineFilter,
} from 'react-icons/hi';

function Dashboard() {
  const { user, logout } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const isFirstRender = useRef(true);

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
      if (!isFirstRender.current) {
        setCurrentPage(1);
      }
      isFirstRender.current = false;
    }, 400);
    return () => clearTimeout(timer);
  }, [search]);

  // Fetch tasks
  const fetchTasks = useCallback(async () => {
    try {
      setLoading(true);
      const params = { page: currentPage, limit: 8 };
      if (debouncedSearch) params.search = debouncedSearch;
      if (statusFilter) params.status = statusFilter;
      if (priorityFilter) params.priority = priorityFilter;

      const response = await taskService.getTasks(params);
      setTasks(response.data.tasks);
      setPagination(response.data.pagination);
    } catch {
      toast.error('Failed to load tasks');
    } finally {
      setLoading(false);
    }
  }, [currentPage, debouncedSearch, statusFilter, priorityFilter]);

  // Fetch stats
  const fetchStats = useCallback(async () => {
    try {
      const response = await taskService.getStats();
      setStats(response.data.stats);
    } catch {
      // Silent fail for stats
    }
  }, []);

  useEffect(() => { fetchTasks(); }, [fetchTasks]);
  useEffect(() => { fetchStats(); }, [fetchStats]);

  const handleCreateTask = async (taskData) => {
    await taskService.createTask(taskData);
    fetchTasks();
    fetchStats();
  };

  const handleUpdateTask = async (taskData) => {
    await taskService.updateTask(editingTask.id, taskData);
    fetchTasks();
    fetchStats();
  };

  const handleToggleTask = async (taskId) => {
    try {
      const response = await taskService.toggleTask(taskId);
      toast.success(response.message);
      fetchTasks();
      fetchStats();
    } catch {
      toast.error('Failed to update task');
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (!window.confirm('Are you sure you want to delete this task?')) return;
    try {
      await taskService.deleteTask(taskId);
      toast.success('Task deleted');
      fetchTasks();
      fetchStats();
    } catch {
      toast.error('Failed to delete task');
    }
  };

  const handleEdit = (task) => {
    setEditingTask(task);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingTask(null);
  };

  const handleLogout = async () => {
    await logout();
    toast.success('Logged out successfully');
  };

  const clearFilters = () => {
    setSearch('');
    setDebouncedSearch('');
    setStatusFilter('');
    setPriorityFilter('');
    setCurrentPage(1);
  };

  const hasActiveFilters = debouncedSearch || statusFilter || priorityFilter;

  return (
    <div className="dashboard">
      {/* Header */}
      <header className="dashboard-header">
        <div className="header-content">
          <div className="header-left">
            <div className="logo">
              <div className="logo-icon">
                <svg viewBox="0 0 24 24" fill="none" width="20" height="20">
                  <rect x="3" y="4" width="18" height="16" rx="3" stroke="currentColor" strokeWidth="1.8" fill="none" />
                  <path d="M7 9h6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                  <path d="M7 13h4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                  <circle cx="17" cy="13" r="3.5" stroke="currentColor" strokeWidth="1.8" fill="none" />
                  <path d="M15.8 13l1 1 1.8-2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <span>TaskFlow</span>
            </div>
          </div>
          <div className="header-right">
            <div className="user-info">
              <div className="user-avatar" id="user-avatar">
                {user?.username?.charAt(0).toUpperCase()}
              </div>
              <span className="user-name">{user?.username}</span>
            </div>
            <button className="btn btn-ghost btn-sm" onClick={handleLogout} id="logout-btn">
              <HiOutlineLogout />
              <span className="btn-text-desktop">Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="dashboard-main">
        {/* Welcome Banner */}
        <div className="welcome-banner">
          <div className="welcome-content">
            <div className="welcome-text">
              <h1>Welcome back{user?.username ? `, ${user.username}` : ''} 👋</h1>
              <p>Here&apos;s your productivity overview for today. Stay focused and crush your goals!</p>
            </div>
            <div className="welcome-badge">
              <span className="welcome-badge-dot" />
              Active Session
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        {stats && (
          <div className="stats-grid">
            <div className="stat-card" id="stat-total">
              <div className="stat-card-icon total">
                <HiOutlineCollection />
              </div>
              <div className="stat-card-content">
                <span className="stat-card-value">{stats.total}</span>
                <span className="stat-card-label">Total Tasks</span>
              </div>
            </div>
            <div className="stat-card" id="stat-completed">
              <div className="stat-card-icon completed">
                <HiOutlineCheckCircle />
              </div>
              <div className="stat-card-content">
                <span className="stat-card-value">{stats.completed}</span>
                <span className="stat-card-label">Completed</span>
              </div>
            </div>
            <div className="stat-card" id="stat-pending">
              <div className="stat-card-icon pending">
                <HiOutlineClock />
              </div>
              <div className="stat-card-content">
                <span className="stat-card-value">{stats.pending}</span>
                <span className="stat-card-label">Pending</span>
              </div>
            </div>
            <div className="stat-card" id="stat-rate">
              <div className="stat-card-icon rate">
                <HiOutlineLightningBolt />
              </div>
              <div className="stat-card-content">
                <span className="stat-card-value">{stats.completionRate}%</span>
                <span className="stat-card-label">Completion Rate</span>
              </div>
              <div className="progress-bar" style={{ position: 'absolute', bottom: 0, left: 0, right: 0, borderRadius: '0 0 20px 20px', margin: 0 }}>
                <div className="progress-fill" style={{ width: `${stats.completionRate}%` }} />
              </div>
            </div>
          </div>
        )}

        {/* Controls Bar */}
        <div className="controls-bar">
          <div className="controls-left">
            <div className="search-wrapper" id="search-wrapper">
              <HiOutlineSearch className="search-icon" />
              <input
                type="text"
                placeholder="Search tasks by title or description..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="search-input"
                id="search-input"
              />
            </div>
            <button
              className={`btn btn-ghost btn-sm filter-toggle ${showFilters ? 'active' : ''}`}
              onClick={() => setShowFilters(!showFilters)}
              id="filter-toggle-btn"
            >
              <HiOutlineFilter />
              Filters
              {hasActiveFilters && <span className="filter-badge" />}
            </button>
          </div>
          <button
            className="btn btn-primary"
            onClick={() => { setEditingTask(null); setShowModal(true); }}
            id="add-task-btn"
          >
            <HiOutlinePlus />
            Add Task
          </button>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <div className="filters-panel" id="filters-panel">
            <div className="filter-group">
              <label>Status</label>
              <div className="filter-chips">
                <button className={`chip ${statusFilter === '' ? 'active' : ''}`} onClick={() => { setStatusFilter(''); setCurrentPage(1); }}>
                  All
                </button>
                <button className={`chip ${statusFilter === 'pending' ? 'active' : ''}`} onClick={() => { setStatusFilter('pending'); setCurrentPage(1); }}>
                  🕐 Pending
                </button>
                <button className={`chip ${statusFilter === 'completed' ? 'active' : ''}`} onClick={() => { setStatusFilter('completed'); setCurrentPage(1); }}>
                  ✅ Completed
                </button>
              </div>
            </div>
            <div className="filter-group">
              <label>Priority</label>
              <div className="filter-chips">
                <button className={`chip ${priorityFilter === '' ? 'active' : ''}`} onClick={() => { setPriorityFilter(''); setCurrentPage(1); }}>
                  All
                </button>
                <button className={`chip ${priorityFilter === 'low' ? 'active' : ''}`} onClick={() => { setPriorityFilter('low'); setCurrentPage(1); }}>
                  🟢 Low
                </button>
                <button className={`chip ${priorityFilter === 'medium' ? 'active' : ''}`} onClick={() => { setPriorityFilter('medium'); setCurrentPage(1); }}>
                  🟡 Medium
                </button>
                <button className={`chip ${priorityFilter === 'high' ? 'active' : ''}`} onClick={() => { setPriorityFilter('high'); setCurrentPage(1); }}>
                  🔴 High
                </button>
              </div>
            </div>
            {hasActiveFilters && (
              <button className="btn btn-ghost btn-sm clear-filters" onClick={clearFilters}>
                ✕ Clear filters
              </button>
            )}
          </div>
        )}

        {/* Section Header */}
        {!loading && tasks.length > 0 && (
          <div className="section-header">
            <span className="section-title">Your Tasks</span>
            {pagination && (
              <span className="section-count">{pagination.totalItems} task{pagination.totalItems !== 1 ? 's' : ''}</span>
            )}
          </div>
        )}

        {/* Task List */}
        <div className="task-list" id="task-list">
          {loading ? (
            <div className="task-list-loading">
              {[1, 2, 3, 4].map((i) => (
                <div className="skeleton-card" key={i}>
                  <div className="skeleton-circle" />
                  <div className="skeleton-content">
                    <div className="skeleton-line skeleton-title" />
                    <div className="skeleton-line skeleton-text" />
                  </div>
                </div>
              ))}
            </div>
          ) : tasks.length === 0 ? (
            <div className="empty-state" id="empty-state">
              <div className="empty-icon">
                <svg viewBox="0 0 120 120" fill="none" width="120" height="120">
                  <circle cx="60" cy="60" r="50" stroke="currentColor" strokeWidth="2" opacity="0.2" />
                  <path d="M40 52h40M40 62h26M40 72h32" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" opacity="0.3" />
                  <circle cx="82" cy="72" r="18" stroke="currentColor" strokeWidth="2.5" opacity="0.5" />
                  <path d="M77 72l3.5 3.5 6.5-7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.5" />
                </svg>
              </div>
              <h3>{hasActiveFilters ? 'No matching tasks' : 'No tasks yet'}</h3>
              <p>{hasActiveFilters ? 'Try changing or clearing your filters to see tasks' : 'Create your first task to get started on your productivity journey!'}</p>
              {!hasActiveFilters && (
                <button className="btn btn-primary" onClick={() => { setEditingTask(null); setShowModal(true); }}>
                  <HiOutlinePlus /> Create First Task
                </button>
              )}
            </div>
          ) : (
            <>
              {tasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onToggle={handleToggleTask}
                  onEdit={handleEdit}
                  onDelete={handleDeleteTask}
                />
              ))}
            </>
          )}
        </div>

        {/* Pagination */}
        {pagination && pagination.totalPages > 1 && (
          <div className="pagination" id="pagination">
            <button
              className="btn btn-ghost btn-sm"
              disabled={!pagination.hasPrevPage}
              onClick={() => setCurrentPage((p) => p - 1)}
              id="prev-page-btn"
            >
              <HiOutlineChevronLeft /> Previous
            </button>
            <div className="pagination-info">
              <span>Page {pagination.currentPage} of {pagination.totalPages}</span>
              <span className="pagination-count">({pagination.totalItems} tasks)</span>
            </div>
            <button
              className="btn btn-ghost btn-sm"
              disabled={!pagination.hasNextPage}
              onClick={() => setCurrentPage((p) => p + 1)}
              id="next-page-btn"
            >
              Next <HiOutlineChevronRight />
            </button>
          </div>
        )}
      </main>

      {/* Task Modal */}
      {showModal && (
        <TaskModal
          task={editingTask}
          onClose={handleCloseModal}
          onSave={editingTask ? handleUpdateTask : handleCreateTask}
        />
      )}
    </div>
  );
}

export default Dashboard;
