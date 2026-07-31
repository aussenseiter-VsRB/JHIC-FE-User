import { useState } from "react";
import type { FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Variants } from "framer-motion";
import { Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";

interface LoginFormProps {
  headline: string;
  subText: string;
  emailLabel: string;
  emailPlaceholder: string;
  passwordLabel: string;
  passwordPlaceholder: string;
  forgotLabel: string;
  submitLabel: string;
  errorRequiredEmail: string;
  errorInvalidEmail: string;
  errorRequiredPassword: string;
  onSubmit: (email: string, password: string) => Promise<void>;
}

const stagger: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: "easeOut" },
  },
};

function LoginForm({
  headline,
  subText,
  emailLabel,
  emailPlaceholder,
  passwordLabel,
  passwordPlaceholder,
  forgotLabel,
  submitLabel,
  errorRequiredEmail,
  errorInvalidEmail,
  errorRequiredPassword,
  onSubmit,
}: LoginFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  function validate(): string {
    if (!email.trim()) return errorRequiredEmail;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) return errorInvalidEmail;
    if (!password) return errorRequiredPassword;
    return "";
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const message = validate();
    if (message) {
      setError(message);
      return;
    }
    setError("");
    setIsSubmitting(true);
    try {
      await onSubmit(email.trim(), password);
    } catch {
      setError("Login gagal. Silakan coba lagi.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="login-form-wrap">
      <div className="login-heading">
        <h1 className="login-title">{headline}</h1>
        <p className="login-subtext">{subText}</p>
      </div>

      <motion.form
        className="login-form"
        variants={stagger}
        initial="hidden"
        animate="visible"
        onSubmit={handleSubmit}
        noValidate
      >
        <motion.div className="login-field" variants={fadeUp}>
          <label className="login-label" htmlFor="login-email">
            {emailLabel}
          </label>
          <div className="login-input-wrap">
            <Mail size={18} className="login-input-icon" aria-hidden="true" />
            <input
              id="login-email"
              className="login-input"
              type="email"
              autoComplete="email"
              placeholder={emailPlaceholder}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-label={emailLabel}
            />
          </div>
        </motion.div>

        <motion.div className="login-field" variants={fadeUp}>
          <label className="login-label" htmlFor="login-password">
            {passwordLabel}
          </label>
          <div className="login-input-wrap">
            <Lock size={18} className="login-input-icon" aria-hidden="true" />
            <input
              id="login-password"
              className="login-input"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              placeholder={passwordPlaceholder}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              aria-label={passwordLabel}
            />
            <motion.button
              type="button"
              className="login-input-toggle"
              aria-label={showPassword ? "Sembunyikan password" : "Tampilkan password"}
              whileHover={{ scale: 1.1, color: "#a1a1aa" }}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.15 }}
              onClick={() => setShowPassword((v) => !v)}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </motion.button>
          </div>
        </motion.div>

        <AnimatePresence>
          {error && (
            <motion.p
              className="login-error"
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
              role="alert"
            >
              {error}
            </motion.p>
          )}
        </AnimatePresence>

        <motion.button
          type="button"
          className="login-forgot"
          variants={fadeUp}
          tabIndex={0}
        >
          {forgotLabel}
        </motion.button>

        <motion.div variants={fadeUp}>
          <motion.button
            type="submit"
            className="login-submit"
            disabled={isSubmitting}
            whileHover={isSubmitting ? undefined : { scale: 1.02 }}
            whileTap={isSubmitting ? undefined : { scale: 0.98 }}
            transition={{ duration: 0.15 }}
          >
            {isSubmitting ? (
              <span className="login-submit-spinner" aria-hidden="true" />
            ) : (
              <>
                {submitLabel}
                <ArrowRight size={18} aria-hidden="true" />
              </>
            )}
          </motion.button>
        </motion.div>
      </motion.form>
    </div>
  );
}

export default LoginForm;
