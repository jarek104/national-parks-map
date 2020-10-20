export interface User {
    id: string;
    description: string;
    date: string | Date;
    reportType: ReportType;
    details: string;
    userId: string;
    reportReason: ReportReason;
}

export enum ReportType {
  Picture,
  User,
}
export enum ReportReason {
  MismatchingPlace,
  TooManyPeople,
  BadPhotoEdit,
  Obstruction,
  Other,
}
