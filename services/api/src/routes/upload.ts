import { Router, Response } from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import pool from '../lib/database';
import { authenticateToken, AuthenticatedRequest } from '../middleware/auth';

const router = Router();

const uploadDir = path.join(__dirname, '..', '..', 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 100 * 1024 * 1024 }, // 100 MB limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|mp4|mov|avi/;
    const mimetype = allowedTypes.test(file.mimetype);
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(new Error('File type not supported!'));
  }
});

router.post('/', authenticateToken, upload.single('video'), async (req: AuthenticatedRequest, res: Response) => {
  if (!req.file) {
    return res.status(400).send({ message: 'Please upload a file.' });
  }

  const userId = req.user?.userId;
  if (!userId) {
    return res.status(403).send({ message: 'User not authenticated.'});
  }

  const { title } = req.body;
  const storagePath = req.file.path;

  try {
    const newVideo = await pool.query(
      'INSERT INTO videos (user_id, title, storage_path, status) VALUES ($1, $2, $3, $4) RETURNING *',
      [userId, title, storagePath, 'completed']
    );

    res.status(201).json(newVideo.rows[0]);
  } catch (error) {
    console.error('Error creating video record:', error);
    res.status(500).send({ message: 'Error processing upload.' });
  }
});

export default router;
