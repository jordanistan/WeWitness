import { Router, Response } from 'express';
import pool from '../lib/database';
import { authenticateToken, AuthenticatedRequest } from '../middleware/auth';

const router = Router();

// Create a new incident
router.post('/', authenticateToken, async (req: AuthenticatedRequest, res: Response) => {
  const userId = req.user?.userId;
  const { title, description, location_tile, starts_at, ends_at } = req.body;

  if (!title) {
    return res.status(400).send({ message: 'Incident title is required.' });
  }

  try {
    const newIncident = await pool.query(
      'INSERT INTO incidents (creator_user_id, title, description, location_tile, starts_at, ends_at) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [userId, title, description, location_tile, starts_at, ends_at]
    );
    res.status(201).json(newIncident.rows[0]);
  } catch (error) {
    console.error('Error creating incident:', error);
    res.status(500).send({ message: 'Error creating incident.' });
  }
});

// Get all incidents for the authenticated user
router.get('/', authenticateToken, async (req: AuthenticatedRequest, res: Response) => {
  const userId = req.user?.userId;

  try {
    const incidents = await pool.query('SELECT * FROM incidents WHERE creator_user_id = $1 ORDER BY created_at DESC', [userId]);
    res.json(incidents.rows);
  } catch (error) {
    console.error('Error fetching incidents:', error);
    res.status(500).send({ message: 'Error fetching incidents.' });
  }
});

export default router;
