import { z } from 'zod';
import { CertificationType } from '../../models/SellerDocument';

export const requestAuditSchema = z.object({
  body: z.object({
    sellerId: z.string(),
    claims: z.array(z.string()).min(1),
    manufacturingInfo: z.string(),
    materialInfo: z.string(),
  })
});

export const uploadDocumentSchema = z.object({
  body: z.object({
    sellerId: z.string(),
    certificationName: z.nativeEnum(CertificationType),
    customName: z.string().optional(),
    certificateFileUrl: z.string().url(),
    issueDate: z.string().datetime(),
    expiryDate: z.string().datetime(),
  })
});

export const runAuditSchema = z.object({
  body: z.object({
    auditRequestId: z.string()
  })
});

export const adminActionSchema = z.object({
  body: z.object({
    auditRequestId: z.string(),
    notes: z.string()
  })
});
