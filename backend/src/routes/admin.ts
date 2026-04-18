import { Router, Request, Response } from 'express';
import { ADMIN_TOKEN } from '../middleware/auth.js';

const router = Router();

const ADMIN_PASSWORD = 'admin123';

// POST /api/admin/login
router.post('/login', (req: Request, res: Response): void => {
  const { password } = req.body;

  if (password === ADMIN_PASSWORD) {
    res.json({ token: ADMIN_TOKEN, message: 'Login exitoso' });
  } else {
    res.status(401).json({ error: 'Contraseña incorrecta' });
  }
});

export default router;
