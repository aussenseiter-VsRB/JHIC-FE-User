import { request } from "../../../api/client";
import { getToken } from "../../login/services/loginService";

export interface PklStep {
  id: string;
  request_id: string;
  position: string;
  approver_id: string;
  status: "pending" | "approved" | "rejected" | "needs_further_action";
  note?: string;
  sequence: number;
  decided_at?: string;
  created_at: string;
  updated_at: string;
}

export interface PklRequest {
  id: string;
  requester_id: string;
  company: string;
  location: string;
  start_date: string;
  end_date: string;
  description: string;
  status: string;
  cancel_reason?: string;
  current_step: number;
  created_at: string;
  updated_at: string;
  steps?: PklStep[];
}

export class PklError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

export interface CreatePklInput {
  company: string;
  location: string;
  start_date: string;
  end_date: string;
  description: string;
}

async function guard<T>(res: {
  ok: boolean;
  status: number;
  data: unknown;
  error: string | null;
}): Promise<T> {
  if (!res.ok) {
    throw new PklError(res.status, res.error || "Terjadi kesalahan.");
  }
  return res.data as T;
}

export async function listRequests(): Promise<PklRequest[]> {
  return guard(await request("/approval/pkl", { token: getToken() }));
}

export async function createRequest(input: CreatePklInput): Promise<PklRequest> {
  return guard(
    await request("/approval/pkl", {
      method: "POST",
      token: getToken(),
      body: input,
    }),
  );
}

export async function cancelRequest(id: string, reason: string): Promise<PklRequest> {
  return guard(
    await request(`/approval/pkl/${id}`, {
      method: "DELETE",
      token: getToken(),
      body: { reason },
    }),
  );
}
