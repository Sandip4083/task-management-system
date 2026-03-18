const { Op } = require('sequelize');
const { Task } = require('../models');

// GET /api/tasks
exports.getTasks = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      status,
      priority,
      search,
      sortBy = 'createdAt',
      sortOrder = 'DESC',
    } = req.query;

    const offset = (parseInt(page) - 1) * parseInt(limit);
    
    // Build where clause
    const where = { userId: req.user.id };

    if (status && ['pending', 'completed'].includes(status)) {
      where.status = status;
    }

    if (priority && ['low', 'medium', 'high'].includes(priority)) {
      where.priority = priority;
    }

    if (search) {
      where[Op.or] = [
        { title: { [Op.like]: `%${search}%` } },
        { description: { [Op.like]: `%${search}%` } },
      ];
    }

    // Validate sort fields
    const allowedSortFields = ['createdAt', 'updatedAt', 'title', 'status', 'priority', 'dueDate'];
    const validSortBy = allowedSortFields.includes(sortBy) ? sortBy : 'createdAt';
    const validSortOrder = ['ASC', 'DESC'].includes(sortOrder.toUpperCase()) ? sortOrder.toUpperCase() : 'DESC';

    const { count, rows: tasks } = await Task.findAndCountAll({
      where,
      limit: parseInt(limit),
      offset,
      order: [[validSortBy, validSortOrder]],
    });

    const totalPages = Math.ceil(count / parseInt(limit));

    res.json({
      success: true,
      data: {
        tasks,
        pagination: {
          currentPage: parseInt(page),
          totalPages,
          totalItems: count,
          itemsPerPage: parseInt(limit),
          hasNextPage: parseInt(page) < totalPages,
          hasPrevPage: parseInt(page) > 1,
        },
      },
    });
  } catch (error) {
    console.error('GetTasks error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};

// GET /api/tasks/:id
exports.getTask = async (req, res) => {
  try {
    const task = await Task.findOne({
      where: {
        id: req.params.id,
        userId: req.user.id,
      },
    });

    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found',
      });
    }

    res.json({
      success: true,
      data: { task },
    });
  } catch (error) {
    console.error('GetTask error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};

// POST /api/tasks
exports.createTask = async (req, res) => {
  try {
    const { title, description, priority, dueDate } = req.body;

    const task = await Task.create({
      title,
      description: description || '',
      priority: priority || 'medium',
      dueDate: dueDate || null,
      status: 'pending',
      userId: req.user.id,
    });

    res.status(201).json({
      success: true,
      message: 'Task created successfully',
      data: { task },
    });
  } catch (error) {
    if (error.name === 'SequelizeValidationError') {
      return res.status(400).json({
        success: false,
        message: error.errors?.[0]?.message || 'Validation error',
        errors: error.errors?.map(e => ({
          field: e.path,
          message: e.message,
        })),
      });
    }

    console.error('CreateTask error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};

// PUT /api/tasks/:id
exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findOne({
      where: {
        id: req.params.id,
        userId: req.user.id,
      },
    });

    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found',
      });
    }

    const { title, description, status, priority, dueDate } = req.body;

    if (title !== undefined) task.title = title;
    if (description !== undefined) task.description = description;
    if (status !== undefined) task.status = status;
    if (priority !== undefined) task.priority = priority;
    if (dueDate !== undefined) task.dueDate = dueDate;

    await task.save();

    res.json({
      success: true,
      message: 'Task updated successfully',
      data: { task },
    });
  } catch (error) {
    if (error.name === 'SequelizeValidationError') {
      return res.status(400).json({
        success: false,
        message: error.errors?.[0]?.message || 'Validation error',
        errors: error.errors?.map(e => ({
          field: e.path,
          message: e.message,
        })),
      });
    }

    console.error('UpdateTask error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};

// DELETE /api/tasks/:id
exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findOne({
      where: {
        id: req.params.id,
        userId: req.user.id,
      },
    });

    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found',
      });
    }

    await task.destroy();

    res.json({
      success: true,
      message: 'Task deleted successfully',
    });
  } catch (error) {
    console.error('DeleteTask error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};

// PATCH /api/tasks/:id/toggle
exports.toggleTask = async (req, res) => {
  try {
    const task = await Task.findOne({
      where: {
        id: req.params.id,
        userId: req.user.id,
      },
    });

    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found',
      });
    }

    task.status = task.status === 'pending' ? 'completed' : 'pending';
    await task.save();

    res.json({
      success: true,
      message: `Task marked as ${task.status}`,
      data: { task },
    });
  } catch (error) {
    console.error('ToggleTask error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};

// GET /api/tasks/stats
exports.getStats = async (req, res) => {
  try {
    const totalTasks = await Task.count({ where: { userId: req.user.id } });
    const completedTasks = await Task.count({ where: { userId: req.user.id, status: 'completed' } });
    const pendingTasks = await Task.count({ where: { userId: req.user.id, status: 'pending' } });
    const highPriority = await Task.count({ where: { userId: req.user.id, priority: 'high', status: 'pending' } });

    res.json({
      success: true,
      data: {
        stats: {
          total: totalTasks,
          completed: completedTasks,
          pending: pendingTasks,
          highPriority,
          completionRate: totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0,
        },
      },
    });
  } catch (error) {
    console.error('GetStats error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};
