import SellerDocument, { CertificationType } from '../../../models/SellerDocument';

export class SellerDocumentService {
  /**
   * Mock document upload tracking. In a real app, this would handle S3 uploads first.
   */
  static async uploadDocument(sellerId: string, certName: CertificationType, customName: string | undefined, fileUrl: string, issueDate: Date, expiryDate: Date) {
    const doc = await SellerDocument.create({
      seller: sellerId,
      certificationName: certName,
      customName,
      certificateFileUrl: fileUrl,
      issueDate,
      expiryDate,
      verificationStatus: 'pending'
    });

    return doc;
  }

  static async getDocumentsForSeller(sellerId: string) {
    return SellerDocument.find({ seller: sellerId });
  }

  static async verifyDocument(docId: string, status: 'verified' | 'rejected', notes?: string) {
    const doc = await SellerDocument.findByIdAndUpdate(
      docId,
      { verificationStatus: status, adminNotes: notes },
      { new: true }
    );
    return doc;
  }
}
