// import express from 'express';
// import { getcertificates } from '../controllers/certificateController';

// const router = express.Router();

// router.get('/', getcertificates);

// export default router;

import express from 'express';
import {
  getCertificates,
  addCertificate,
  editCertificate,
  deleteCertificate
} from '../controllers/certificateController'; // Adjust the path as necessary

const router = express.Router();

// Define the routes
router.get('/', getCertificates); // GET all certificates
router.post('/', addCertificate); // POST add a new certificate
router.put('/:id', editCertificate); // PUT edit a specific certificate
router.delete('/:id', deleteCertificate); // DELETE a specific certificate

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
