import { useState } from "react";
import type { FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Variants } from "framer-motion";
import { User, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";

interface LoginFormProps {
  headline: string;
  subText: string;
  usernameLabel: string;
  usernamePlaceholder: string;
  passwordLabel: string;
  passwordPlaceholder: string;
  forgotLabel: string;
  submitLabel: string;
  errorRequiredUsername: string;
  errorRequiredPassword: string;
  onSubmit: (username: string, password: string) => Promise<void>;
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
  usernameLabel,
  usernamePlaceholder,
  passwordLabel,
  passwordPlaceholder,
  forgotLabel,
  submitLabel,
  errorRequiredUsername,
  errorRequiredPassword,
  onSubmit,
}: LoginFormProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  function validate(): string {
    if (!username.trim()) return errorRequiredUsername;
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
      await onSubmit(username.trim(), password);
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
          <label className="login-label" htmlFor="login-username">
            {usernameLabel}
          </label>
          <div className="login-input-wrap">
            <User size={18} className="login-input-icon" aria-hidden="true" />
            <input
              id="login-username"
              className="login-input"
              type="text"
              autoComplete="username"
              placeholder={usernamePlaceholder}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              aria-label={usernameLabel}
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
