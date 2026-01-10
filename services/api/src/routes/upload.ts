import { Router, Response } from 'express';
import multer from 'multer';
import path from 'path';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import s3Client from '../lib/s3';
import pool from '../lib/database';
import { authenticateToken, AuthenticatedRequest } from '../middleware/auth';

const router = Router();

const storage = multer.memoryStorage();

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
  const file = req.file;
  const bucketName = process.env.S3_BUCKET!;
  const objectKey = `${userId}/${Date.now()}-${file.originalname}`;

  const uploadParams = {
    Bucket: bucketName,
    Key: objectKey,
    Body: file.buffer,
    ContentType: file.mimetype,
  };

  try {
    await s3Client.send(new PutObjectCommand(uploadParams));

    const newVideo = await pool.query(
      'INSERT INTO videos (user_id, title, storage_path, status) VALUES ($1, $2, $3, $4) RETURNING *',
      [userId, title, objectKey, 'completed']
    );

    res.status(201).json(newVideo.rows[0]);
  } catch (error) {
    console.error('Error processing upload:', error);
    res.status(500).send({ message: 'Error processing upload.' });
  }
});

export default router;
