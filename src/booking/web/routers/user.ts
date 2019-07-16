/**
 * https://expressjs.com/zh-tw/guide/using-middleware.html
 */
import { Router } from 'express';
const router = Router();

router.get('/:id', function(req, res) {
  const id = req.params.id;
  res.send(id);
});

export default router;
