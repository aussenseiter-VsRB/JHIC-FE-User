import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import ProgressStepper from "./components/ProgressStepper";
import type { Step } from "./components/ProgressStepper";
import NotificationFeed from "./components/NotificationFeed";
import type { Notification } from "./components/NotificationFeed";
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

function DashboardPkl() {
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

      <div className="bento-grid">
        <div className="bento-left">
          <NotificationFeed notifications={data.notifications as Notification[]} />
        </div>
        <div className="bento-right">
          <ProgressStepper
            steps={data.pkl.steps as Step[]}
            nomorSurat={data.pkl.nomorSurat}
            namaSiswa={data.pkl.namaSiswa}
            perusahaan={data.pkl.perusahaan}
            periode={data.pkl.periode}
          />
        </div>
      </div>
    </motion.div>
  );
}

export default DashboardPkl;
