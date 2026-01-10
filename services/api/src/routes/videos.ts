import { Router, Response } from 'express';
import pool from '../lib/database';
import { authenticateToken, AuthenticatedRequest } from '../middleware/auth';

const router = Router();

router.get('/', authenticateToken, async (req: AuthenticatedRequest, res: Response) => {
  const userId = req.user?.userId;

  if (!userId) {
    return res.status(403).send({ message: 'User not authenticated.' });
  }

  try {
    const videos = await pool.query('SELECT * FROM videos WHERE user_id = $1 ORDER BY created_at DESC', [userId]);
    res.json(videos.rows);
  } catch (error) {
    console.error('Error fetching videos:', error);
    res.status(500).send({ message: 'Error fetching videos.' });
  }
});

export default router;
