import express from 'express';
import {
  getCertificates,
  addCertificate,
  editCertificate,
  deleteCertificate
} from '../controllers/certificateController'; // Adjust the path as necessary

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Certificate:
 *       type: object
 *       required:
 *         - title
 *         - issuedBy
 *         - issueDate
 *       properties:
 *         id:
 *           type: string
 *           description: The certificate ID
 *         title:
 *           type: string
 *           description: The certificate title
 *         issuedBy:
 *           type: string
 *           description: The issuing organization
 *         issueDate:
 *           type: string
 *           format: date
 *           description: The date when the certificate was issued
 *       example:
 *         id: "60d0fe4f5311236168a109cb"
 *         title: "Full Stack Development"
 *         issuedBy: "Coursera"
 *         issueDate: "2023-01-15"
 */

/**
 * @swagger
 * /certificates:
 *   get:
 *     summary: Get all certificates
 *     tags: [Certificates]
 *     responses:
 *       200:
 *         description: A list of certificates
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Certificate'
 */
router.get('/', getCertificates);

/**
 * @swagger
 * /certificates:
 *   post:
 *     summary: Add a new certificate
 *     tags: [Certificates]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Certificate'
 *     responses:
 *       201:
 *         description: Certificate added successfully
 */
router.post('/', addCertificate);

/**
 * @swagger
 * /certificates/{id}:
 *   put:
 *     summary: Edit a certificate by ID
 *     tags: [Certificates]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The certificate ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Certificate'
 *     responses:
 *       200:
 *         description: Certificate updated successfully
 *       404:
 *         description: Certificate not found
 */
router.put('/:id', editCertificate);

/**
 * @swagger
 * /certificates/{id}:
 *   delete:
 *     summary: Delete a certificate by ID
 *     tags: [Certificates]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The certificate ID
 *     responses:
 *       200:
 *         description: Certificate deleted successfully
 *       404:
 *         description: Certificate not found
 */
router.delete('/:id', deleteCertificate);

export default router;






// import express from 'express';
// import {
//   getCertificates,
//   addCertificate,
//   editCertificate,
//   deleteCertificate
// } from '../controllers/certificateController'; // Adjust the path as necessary

// const router = express.Router();

// // Define the routes
// router.get('/', getCertificates); // GET all certificates
// router.post('/', addCertificate); // POST add a new certificate
// router.put('/:id', editCertificate); // PUT edit a specific certificate
// router.delete('/:id', deleteCertificate); // DELETE a specific certificate

// export default router;

