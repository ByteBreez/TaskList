const express = require('express');
const router = express.Router();
const FormData = require('../models/FormData');

router.get('/', async (req, res) => {
  try {
    const formData = await FormData.find().populate('createdBy', 'name');
    res.json(formData);
  } catch (err) {
    console.error('Error fetching form data:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/', async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    const formData = new FormData({
      ...req.body,
      createdBy: req.user._id,
    });
    const savedForm = await formData.save();
    await savedForm.populate('createdBy', 'name');
    res.status(201).json(savedForm);
  } catch (err) {
    console.error('Error creating form data:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    const formData = await FormData.findByIdAndUpdate(
      req.params.id,
      { ...req.body, createdBy: req.user._id },
      { new: true }
    ).populate('createdBy', 'name');
    if (!formData) {
      return res.status(404).json({ message: 'Form not found' });
    }
    res.json(formData);
  } catch (err) {
    console.error('Error updating form data:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    const formData = await FormData.findByIdAndDelete(req.params.id);
    if (!formData) {
      return res.status(404).json({ message: 'Form not found' });
    }
    res.json({ message: 'Form deleted' });
  } catch (err) {
    console.error('Error deleting form data:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;