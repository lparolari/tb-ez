import Report, { ReportDTO } from "lib/Report";

let reports = require("data/reports.json")
  .sort((a: ReportDTO, b: ReportDTO) => {
    if (a.publishedAt && b.publishedAt) {
      return (
        Date.parse(b.publishedAt) -
        Date.parse(a.publishedAt)
      );
    }
    return 1;
  });

export const reportsRepo = {
  find: (page?: number, limit?: number): ReportDTO[] => {
    if (page && limit) return reports.slice(page * limit, (page + 1) * limit);
    if (page) return reports.slice(page * 10, (page + 1) * 10);
    if (limit) return reports.slice(0 * limit, 1 * limit);
    return reports;
  },

  findById: (id: string): ReportDTO | undefined =>
    reports.find((x: ReportDTO) => x.id === id),
};
