import { Request, Response } from 'express';
import Certificate from '../models/certificate';
import { logger } from '../utils/logger';  // Import Winston logger

// Get all certificates
export const getCertificates = async (req: Request, res: Response) => {
  try {
    const certificates = await Certificate.find();
    logger.info('Fetched all certificates'); // Log successful fetch
    res.status(200).json(certificates);
  } catch (error: any) {
    logger.error(`Error fetching certificates: ${error.message}`); // Log error
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
    logger.info(`New certificate added: ${savedCertificate.certifiedName}`); // Log successful creation
    res.status(201).json(savedCertificate);
  } catch (error: any) {
    logger.error(`Error adding certificate: ${error.message}`); // Log error
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
      logger.warn(`Certificate not found for ID: ${id}`); // Log not found
      return res.status(404).json({ message: 'Certificate not found' });
    }

    logger.info(`Certificate updated: ${updatedCertificate.certifiedName}`); // Log successful update
    res.status(200).json(updatedCertificate);
  } catch (error: any) {
    logger.error(`Error updating certificate: ${error.message}`); // Log error
    res.status(400).json({ message: error.message });
  }
};

// Delete a certificate
export const deleteCertificate = async (req: Request, res: Response) => {
  const { id } = req.params; // Get the ID from the request parameters

  try {
    const deletedCertificate = await Certificate.findByIdAndDelete(id);

    if (!deletedCertificate) {
      logger.warn(`Certificate not found for ID: ${id}`); // Log not found
      return res.status(404).json({ message: 'Certificate not found' });
    }

    logger.info(`Certificate deleted: ${deletedCertificate.certifiedName}`); // Log successful deletion
    res.status(200).json({ message: 'Certificate deleted successfully' });
  } catch (error: any) {
    logger.error(`Error deleting certificate: ${error.message}`); // Log error
    res.status(500).json({ message: error.message });
  }
};
