import { Request, Response } from 'express';
import Certificate from '../models/certificate';

export const getcertificates = async (req: Request, res: Response) => {
  try {
    const certificates = await Certificate.find();
    res.status(200).json(certificates);
  } catch (error:any) {
    res.status(500).json({ message: error.message });
  }
};











// // /src/controllers/certificateController.ts
// import { Request, Response } from 'express';
// import Certificate from '../models/certificate';

// export const getCertificates = async (req: Request, res: Response) => {
//   try {
//     const certificates = await Certificate.find({ userId: req.user._id });
//     res.json(certificates);
//   } catch (err) {
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// export const createCertificate = async (req: Request, res: Response) => {
//   try {
//     const { name, issueDate } = req.body;
//     const newCertificate = new Certificate({ name, issueDate, userId: req.user._id });
//     await newCertificate.save();
//     res.status(201).json(newCertificate);
//   } catch (err) {
//     res.status(400).json({ message: 'Bad request' });
//   }
// };

// export const deleteCertificate = async (req: Request, res: Response) => {
//   try {
//     const certificate = await Certificate.findByIdAndDelete(req.params.id);
//     if (!certificate) return res.status(404).json({ message: 'Certificate not found' });
//     res.status(204).send();
//   } catch (err) {
//     res.status(500).json({ message: 'Server error' });
//   }
// };
