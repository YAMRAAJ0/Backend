import express from 'express';
import { getcertificates } from '../controllers/certificateController';

const router = express.Router();

router.get('/', getcertificates);

export default router;






// // /src/routes/certificateRoutes.ts
// import { Router } from 'express';
// import { getCertificates, createCertificate, deleteCertificate } from '../controllers/certificateController';
// import { isAuthenticated } from '../Middleware/authMiddleware';

// const router = Router();

// router.get('/', isAuthenticated, getCertificates);
// router.post('/', isAuthenticated, createCertificate);
// router.delete('/:id', isAuthenticated, deleteCertificate);

// export default router;
