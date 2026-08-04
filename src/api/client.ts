export interface ApiResult {
  ok: boolean
  status: number
  data: unknown
  error: string | null
}

export interface RequestOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE'
  body?: unknown
  formData?: FormData
  token?: string | null
  json?: boolean
}

export async function request(path: string, options: RequestOptions = {}): Promise<ApiResult> {
  const { method = 'GET', body, formData, token, json = true } = options

  const headers: Record<string, string> = {}
  let payload: BodyInit | undefined

  if (formData) {
    payload = formData
  } else if (body !== undefined) {
    headers['Content-Type'] = 'application/json'
    payload = JSON.stringify(body)
  }

  if (token) {
    headers['Authorization'] = `Bearer ${token}`
  }

  let res: Response
  try {
    res = await fetch(`/api/v1${path}`, { method, headers, body: payload })
  } catch (err) {
    return {
      ok: false,
      status: 0,
      data: null,
      error: `network error: ${err instanceof Error ? err.message : String(err)}`,
    }
  }

  const raw = await res.text()
  let data: unknown = null
  if (json && raw) {
    try {
      data = JSON.parse(raw)
    } catch {
      data = raw
    }
  }

  const error = res.ok
    ? null
    : typeof data === 'object' && data !== null && 'error' in data && typeof (data as { error: unknown }).error === 'string'
      ? ((data as { error: string }).error)
      : `HTTP ${res.status} ${res.statusText}`

  return { ok: res.ok, status: res.status, data, error }
}
