import Report from "./Report";

function endpoint() {
  return process.env.API_URL || "http://localhost:3000/api";
}

export async function getAllReports(
  page: number,
  limit: number
): Promise<Report[]> {
  return fetch(`${endpoint()}/reports?page=${page}&limit=${limit}`).then(
    (res) => res.json()
  );
}

export async function getTotalReports(): Promise<{ n: number }> {
  return fetch(`${endpoint()}/reports/total`).then((res) => res.json());
}

export async function getReport(id: string): Promise<Report> {
  return fetch(`${endpoint()}/reports/${id}`).then((res) => res.json());
}
