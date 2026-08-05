import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Variants } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Plus, X } from "lucide-react";
import ProgressStepper from "./components/ProgressStepper";
import type { Step } from "./components/ProgressStepper";
import NotificationFeed from "./components/NotificationFeed";
import type { Notification } from "./components/NotificationFeed";
import {
  listRequests,
  createRequest,
  cancelRequest,
  PklError,
} from "./services/pklService";
import type { PklRequest, PklStep } from "./services/pklService";
import data from "./dashboard-pkl.json";
import "./css/dashboard-pkl.css";

const pageVariants: Variants = {
  initial: { opacity: 0, y: 16 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    y: -16,
    transition: { duration: 0.2 },
  },
};

const POSITION_LABELS: Record<string, string> = {
  wali_kelas: "Wali Kelas",
  bk: "Guru BK",
  kesiswaan: "Kesiswaan",
  kaprog: "Kaprodi",
};

function today(): string {
  const d = new Date();
  const off = d.getTimezoneOffset();
  return new Date(d.getTime() - off * 60000).toISOString().slice(0, 10);
}

function formatDate(iso?: string): string {
  if (!iso) return "";
  const d = new Date(iso);
  return d.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function formatPeriode(req: PklRequest): string {
  return `${formatDate(req.start_date)} – ${formatDate(req.end_date)}`;
}

function toSteps(req: PklRequest): Step[] {
  return (req.steps ?? []).map((s: PklStep) => ({
    key: s.position,
    label: POSITION_LABELS[s.position] ?? s.position,
    nama: "",
    status: s.status,
    tanggal: s.decided_at ? formatDate(s.decided_at) : null,
    catatan: s.note || null,
  }));
}

function buildFeed(req: PklRequest, d: typeof data): Notification[] {
  const msgs: Notification[] = [];
  for (const s of req.steps ?? []) {
    if (s.status === "pending") continue;
    const label = POSITION_LABELS[s.position] ?? s.position;
    let type: Notification["type"] = "info";
    let icon = "Info";
    let message = "";
    if (s.status === "approved") {
      type = "success";
      icon = "CheckCircle";
      message = `${label} ${d.feed.approved}`;
    } else if (s.status === "rejected") {
      type = "warning";
      icon = "Info";
      message = `${label} ${d.feed.rejected}`;
    } else if (s.status === "needs_further_action") {
      type = "warning";
      icon = "Info";
      message = `${label} ${d.feed.needsAction}`;
    }
    msgs.push({
      id: s.sequence,
      type,
      icon,
      title: s.status === "approved" ? `${label} menyetujui` : `${label} memberi keputusan`,
      message,
      time: formatDate(s.decided_at),
      read: true,
    });
  }
  if (req.status === "cancelled") {
    msgs.push({
      id: 0,
      type: "warning",
      icon: "Info",
      title: "Pengajuan dibatalkan",
      message: d.feed.cancelled,
      time: "",
      read: true,
    });
  }
  if (msgs.length === 0) {
    msgs.push({
      id: 0,
      type: "info",
      icon: "Bot",
      title: "Surat sedang diproses",
      message: d.feed.pendingMessage,
      time: "",
      read: false,
    });
  }
  return msgs.reverse();
}

function DashboardPkl() {
  const navigate = useNavigate();
  const [requests, setRequests] = useState<PklRequest[] | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  const [showCreate, setShowCreate] = useState(false);
  const [form, setForm] = useState({
    company: "",
    location: "",
    start_date: today(),
    end_date: today(),
    description: "",
  });
  const [formError, setFormError] = useState<string | null>(null);

  const [cancelFor, setCancelFor] = useState<PklRequest | null>(null);
  const [cancelReason, setCancelReason] = useState("");
  const [cancelError, setCancelError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const handleAuthError = useCallback(
    (err: unknown): boolean => {
      if (err instanceof PklError && err.status === 401) {
        navigate("/login");
        return true;
      }
      return false;
    },
    [navigate],
  );

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const list = await listRequests();
        if (!active) return;
        setRequests(list);
        setSelectedId(list[0]?.id ?? null);
      } catch (err) {
        if (!active) return;
        if (handleAuthError(err)) return;
        setLoadError(err instanceof Error ? err.message : "Gagal memuat data PKL.");
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => {
      active = false;
    };
  }, [handleAuthError]);

  const selected = requests?.find((r) => r.id === selectedId) ?? null;

  const reload = useCallback(async () => {
    const list = await listRequests();
    setRequests(list);
    setSelectedId((prev) => list.some((r) => r.id === prev) ? prev : (list[0]?.id ?? null));
  }, []);

  const handleSubmitCreate = useCallback(async () => {
    setFormError(null);
    if (!form.company.trim() || !form.location.trim() || !form.description.trim()) {
      setFormError("Perusahaan, lokasi, dan deskripsi wajib diisi.");
      return;
    }
    if (form.end_date < form.start_date) {
      setFormError(data.create.errorDate);
      return;
    }
    setBusy(true);
    try {
      await createRequest({ ...form });
      await reload();
      setShowCreate(false);
    } catch (err) {
      if (handleAuthError(err)) return;
      setFormError(err instanceof Error ? err.message : "Gagal mengirim pengajuan.");
    } finally {
      setBusy(false);
    }
  }, [form, reload, handleAuthError]);

  const handleSubmitCancel = useCallback(async () => {
    if (!cancelFor) return;
    setCancelError(null);
    if (!cancelReason.trim()) {
      setCancelError("Alasan pembatalan wajib diisi.");
      return;
    }
    setBusy(true);
    try {
      await cancelRequest(cancelFor.id, cancelReason);
      await reload();
      setCancelFor(null);
      setCancelReason("");
    } catch (err) {
      if (handleAuthError(err)) return;
      setCancelError(err instanceof Error ? err.message : "Gagal membatalkan pengajuan.");
    } finally {
      setBusy(false);
    }
  }, [cancelFor, cancelReason, reload, handleAuthError]);

  const canCancel = selected?.status === "pending" || selected?.status === "needs_further_action";

  return (
    <motion.div
      className="dashboard-pkl"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <div className="page-header">
        <h1>{data.pageHeader.title}</h1>
        <p>{data.pageHeader.description}</p>
      </div>

      {loading && <div className="pkl-state">Memuat data pengajuan...</div>}

      {!loading && loadError && <div className="pkl-state pkl-state--error">{loadError}</div>}

      {!loading && !loadError && requests && (
        <>
          {requests.length === 0 ? (
            <div className="pkl-empty">
              <h2>{data.empty.title}</h2>
              <p>{data.empty.description}</p>
              <motion.button
                type="button"
                className="pkl-primary-btn"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowCreate(true)}
              >
                <Plus size={16} />
                {data.empty.cta}
              </motion.button>
            </div>
          ) : (
            <>
              <div className="pkl-toolbar">
                <h2>{data.list.title}</h2>
                <div className="pkl-request-chips">
                  {requests.map((r) => (
                    <button
                      key={r.id}
                      type="button"
                      className={`pkl-chip${r.id === selectedId ? " pkl-chip--active" : ""}`}
                      onClick={() => setSelectedId(r.id)}
                    >
                      {r.company}
                      <span className={`pkl-chip-status pkl-chip-status--${r.status}`}>
                        {data.statusLabels[r.status as keyof typeof data.statusLabels] ?? r.status}
                      </span>
                    </button>
                  ))}
                </div>
                <motion.button
                  type="button"
                  className="pkl-primary-btn"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowCreate(true)}
                >
                  <Plus size={16} />
                  {data.empty.cta}
                </motion.button>
              </div>

              {selected && (
                <div className="bento-grid">
                  <div className="bento-left">
                    <NotificationFeed notifications={buildFeed(selected, data)} />
                  </div>
                  <div className="bento-right">
                    <ProgressStepper
                      steps={toSteps(selected)}
                      nomorSurat={selected.id}
                      perusahaan={selected.company}
                      periode={formatPeriode(selected)}
                    />
                    {canCancel && (
                      <motion.button
                        type="button"
                        className="pkl-cancel-btn"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                          setCancelFor(selected);
                          setCancelReason("");
                          setCancelError(null);
                        }}
                      >
                        {data.cancelAction.title}
                      </motion.button>
                    )}
                    {selected.status === "cancelled" && selected.cancel_reason && (
                      <p className="pkl-cancel-reason">
                        Alasan: {selected.cancel_reason}
                      </p>
                    )}
                    {selected.status === "rejected" && (
                      <p className="pkl-cancel-reason pkl-cancel-reason--rejected">
                        {data.statusLabels.rejected}
                      </p>
                    )}
                  </div>
                </div>
              )}
            </>
          )}
        </>
      )}

      <AnimatePresence>
        {showCreate && (
          <motion.div
            className="pkl-form"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <div className="pkl-form-header">
              <h3>{data.create.title}</h3>
              <button
                type="button"
                className="pkl-form-close"
                aria-label="Tutup"
                onClick={() => setShowCreate(false)}
              >
                <X size={16} />
              </button>
            </div>
            <p className="pkl-form-desc">{data.create.description}</p>
            <label className="pkl-form-field">
              <span>{data.create.fields.company}</span>
              <input
                value={form.company}
                onChange={(e) => setForm((p) => ({ ...p, company: e.target.value }))}
                placeholder={data.create.fields.companyPlaceholder}
              />
            </label>
            <label className="pkl-form-field">
              <span>{data.create.fields.location}</span>
              <input
                value={form.location}
                onChange={(e) => setForm((p) => ({ ...p, location: e.target.value }))}
                placeholder={data.create.fields.locationPlaceholder}
              />
            </label>
            <div className="pkl-form-row">
              <label className="pkl-form-field">
                <span>{data.create.fields.startDate}</span>
                <input
                  type="date"
                  value={form.start_date}
                  min={today()}
                  onChange={(e) => setForm((p) => ({ ...p, start_date: e.target.value }))}
                />
              </label>
              <label className="pkl-form-field">
                <span>{data.create.fields.endDate}</span>
                <input
                  type="date"
                  value={form.end_date}
                  min={form.start_date}
                  onChange={(e) => setForm((p) => ({ ...p, end_date: e.target.value }))}
                />
              </label>
            </div>
            <label className="pkl-form-field">
              <span>{data.create.fields.description}</span>
              <textarea
                rows={3}
                value={form.description}
                onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))}
                placeholder={data.create.fields.descriptionPlaceholder}
              />
            </label>
            {formError && <div className="pkl-form-error">{formError}</div>}
            <div className="pkl-form-actions">
              <motion.button
                type="button"
                className="pkl-primary-btn"
                disabled={busy}
                whileHover={busy ? {} : { scale: 1.02 }}
                whileTap={busy ? {} : { scale: 0.98 }}
                onClick={handleSubmitCreate}
              >
                {busy ? "Mengirim..." : data.create.submit}
              </motion.button>
              <button
                type="button"
                className="pkl-ghost-btn"
                onClick={() => setShowCreate(false)}
              >
                {data.create.cancel}
              </button>
            </div>
          </motion.div>
        )}

        {cancelFor && (
          <motion.div
            className="pkl-form"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <div className="pkl-form-header">
              <h3>{data.cancelAction.title}</h3>
              <button
                type="button"
                className="pkl-form-close"
                aria-label="Tutup"
                onClick={() => setCancelFor(null)}
              >
                <X size={16} />
              </button>
            </div>
            <p className="pkl-form-desc">{data.cancelAction.description}</p>
            <label className="pkl-form-field">
              <span>{cancelFor.company}</span>
              <textarea
                rows={3}
                value={cancelReason}
                onChange={(e) => setCancelReason(e.target.value)}
                placeholder={data.cancelAction.reasonPlaceholder}
              />
            </label>
            {cancelError && <div className="pkl-form-error">{cancelError}</div>}
            <div className="pkl-form-actions">
              <motion.button
                type="button"
                className="pkl-danger-btn"
                disabled={busy}
                whileHover={busy ? {} : { scale: 1.02 }}
                whileTap={busy ? {} : { scale: 0.98 }}
                onClick={handleSubmitCancel}
              >
                {busy ? "Membatalkan..." : data.cancelAction.submit}
              </motion.button>
              <button
                type="button"
                className="pkl-ghost-btn"
                onClick={() => setCancelFor(null)}
              >
                {data.cancelAction.back}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default DashboardPkl;
