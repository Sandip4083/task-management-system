const express = require('express');
const { body } = require('express-validator');
const taskController = require('../controllers/taskController');
const authenticate = require('../middleware/auth');
const validate = require('../middleware/validate');

const router = express.Router();

// All task routes require authentication
router.use(authenticate);

// Validation rules
const taskValidation = [
  body('title')
    .trim()
    .isLength({ min: 1, max: 200 })
    .withMessage('Title is required and must be under 200 characters'),
  body('description')
    .optional()
    .trim(),
  body('priority')
    .optional()
    .isIn(['low', 'medium', 'high'])
    .withMessage('Priority must be low, medium, or high'),
  body('dueDate')
    .optional({ values: 'null' })
    .isISO8601()
    .withMessage('Due date must be a valid date'),
];

const updateValidation = [
  body('title')
    .optional()
    .trim()
    .isLength({ min: 1, max: 200 })
    .withMessage('Title must be under 200 characters'),
  body('description')
    .optional()
    .trim(),
  body('status')
    .optional()
    .isIn(['pending', 'completed'])
    .withMessage('Status must be pending or completed'),
  body('priority')
    .optional()
    .isIn(['low', 'medium', 'high'])
    .withMessage('Priority must be low, medium, or high'),
  body('dueDate')
    .optional({ values: 'null' })
    .isISO8601()
    .withMessage('Due date must be a valid date'),
];

// Routes
router.get('/stats', taskController.getStats);
router.get('/', taskController.getTasks);
router.get('/:id', taskController.getTask);
router.post('/', taskValidation, validate, taskController.createTask);
router.put('/:id', updateValidation, validate, taskController.updateTask);
router.delete('/:id', taskController.deleteTask);
router.patch('/:id/toggle', taskController.toggleTask);

module.exports = router;
