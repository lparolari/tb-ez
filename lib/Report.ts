export default interface Report {
  id: string;
  url: string;
  thumbnailUrl?: string;
  publishedAt?: Date;
  name: string;
  rawName: string;
  updatedAt?: Date;
  size: string;
  description?: String;
}

export interface ReportDTO {
  id: string;
  url: string;
  thumbnailUrl?: string;
  publishedAt?: string;
  name: string;
  rawName: string;
  updatedAt?: string;
  size: string;
  description?: String;
}
