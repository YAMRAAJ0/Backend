import { Request, Response } from 'express';
import Certificate from '../models/certificate';

// Get all certificates
export const getCertificates = async (req: Request, res: Response) => {
  try {
    const certificates = await Certificate.find();
    res.status(200).json(certificates);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// Add a new certificate
export const addCertificate = async (req: Request, res: Response) => {
  const { certifiedType, certifiedName, certifiedCourse, startDate, endDate, issuedDate } = req.body;

  try {
    const newCertificate = new Certificate({
      certifiedType,
      certifiedName,
      certifiedCourse,
      startDate,
      endDate,
      issuedDate,
    });

    const savedCertificate = await newCertificate.save();
    res.status(201).json(savedCertificate);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

// Edit a certificate
export const editCertificate = async (req: Request, res: Response) => {
  const { id } = req.params; // Get the ID from the request parameters
  const { certifiedType, certifiedName, certifiedCourse, startDate, endDate, issuedDate } = req.body;

  try {
    const updatedCertificate = await Certificate.findByIdAndUpdate(
      id,
      { certifiedType, certifiedName, certifiedCourse, startDate, endDate, issuedDate },
      { new: true } // Return the updated document
    );

    if (!updatedCertificate) {
      return res.status(404).json({ message: 'Certificate not found' });
    }

    res.status(200).json(updatedCertificate);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a certificate
export const deleteCertificate = async (req: Request, res: Response) => {
  const { id } = req.params; // Get the ID from the request parameters

  try {
    const deletedCertificate = await Certificate.findByIdAndDelete(id);

    if (!deletedCertificate) {
      return res.status(404).json({ message: 'Certificate not found' });
    }

    res.status(200).json({ message: 'Certificate deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};




