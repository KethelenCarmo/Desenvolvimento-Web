import { Router } from 'express';
const router = Router();
router.get('/', (req, res) => {
res.send('Página principal do site');
});
router.get('/sobre', (req, res) => {
res.send('Página sobre');
});
export default router;