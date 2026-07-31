import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Sparkles } from "lucide-react";
import LoginForm from "./components/LoginForm";
import ShowcasePanel from "./components/ShowcasePanel";
import data from "./login.json";
import "./css/login.css";

function Login() {
  const navigate = useNavigate();

  async function handleSubmit(_username: string, _password: string) {
    await new Promise<void>((resolve) => setTimeout(resolve, 1200));
    navigate("/home");
  }

  return (
    <div className="login-page">
      <div className="login-grid">
        <motion.section
          className="login-panel"
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
        >
          <div className="login-form-wrap">
            <div className="login-brand">
              <span className="login-brand-icon">
                <Sparkles size={18} aria-hidden="true" />
              </span>
              <span className="login-brand-text">{data.appName}</span>
            </div>
            <LoginForm
              headline={data.headline}
              subText={data.subText}
              usernameLabel={data.usernameLabel}
              usernamePlaceholder={data.usernamePlaceholder}
              passwordLabel={data.passwordLabel}
              passwordPlaceholder={data.passwordPlaceholder}
              forgotLabel={data.forgotLabel}
              submitLabel={data.submitLabel}
              errorRequiredUsername={data.errorRequiredUsername}
              errorRequiredPassword={data.errorRequiredPassword}
              onSubmit={handleSubmit}
            />
          </div>
        </motion.section>

        <ShowcasePanel
          headline={data.showcaseHeadline}
          label={data.showcaseLabel}
          description={data.showcaseDescription}
          avatarNames={data.showcaseNames}
        />
      </div>
    </div>
  );
}

export default Login;
