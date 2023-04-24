interface TeamMember {
  id: number;
  name: string;
  position: string;
  image: string;
}
export interface Property {
  id: number;
  title: string;
  company: string;
  status: string;
  county: string;
  address: string;
  registryNo: string;
  taxId: string;
  caseNumber: string;
  court: string;
  procedureDate: string;
  specialAdministrator: string;
  description: string;
  contactInfo: string;
  imageURLs: string[];
  documents: Document[];
}

export interface Document {
  id: number;
  documentType: string;
  actNumber: string;
  actDate: string;
  caseNumber: string;
  caseYear: string;
  procedure: string;
  court: string;
  fileUrl: string;
}

export interface Company {
  id: number;
  name: string;
  status: string;
  county: string;
  numberDosar: string;
  cui: string;
  decisionDate: string;
  nextTermDate: string;
}
