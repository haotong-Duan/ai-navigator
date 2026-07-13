import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import { Sidebar } from "@/components/Sidebar";
import { HomePage } from "@/pages/Home";
import { AIPage } from "@/pages/AIPage";
import { AgentPage } from "@/pages/AgentPage";
import { FavoritesPage } from "@/pages/Favorites";
import { RecentPage } from "@/pages/Recent";
import { SettingsPage } from "@/pages/Settings";
import { DetailPage } from "@/pages/DetailPage";
import { useTheme } from "@/hooks/useTheme";

function PageTransition({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      className="h-full"
    >
      {children}
    </motion.div>
  );
}

export default function App() {
  useTheme();
  const location = useLocation();

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        const input = document.querySelector(
          'input[type="text"]'
        ) as HTMLInputElement;
        if (input) input.focus();
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  return (
    <div className="h-full w-full flex overflow-hidden bg-transparent">
      <Sidebar />
      <main className="flex-1 h-full overflow-hidden">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route
              path="/"
              element={
                <PageTransition>
                  <HomePage />
                </PageTransition>
              }
            />
            <Route
              path="/ai"
              element={
                <PageTransition>
                  <AIPage />
                </PageTransition>
              }
            />
            <Route
              path="/ai/:id"
              element={
                <PageTransition>
                  <DetailPage />
                </PageTransition>
              }
            />
            <Route
              path="/agent"
              element={
                <PageTransition>
                  <AgentPage />
                </PageTransition>
              }
            />
            <Route
              path="/agent/:id"
              element={
                <PageTransition>
                  <DetailPage />
                </PageTransition>
              }
            />
            <Route
              path="/favorites"
              element={
                <PageTransition>
                  <FavoritesPage />
                </PageTransition>
              }
            />
            <Route
              path="/recent"
              element={
                <PageTransition>
                  <RecentPage />
                </PageTransition>
              }
            />
            <Route
              path="/settings"
              element={
                <PageTransition>
                  <SettingsPage />
                </PageTransition>
              }
            />
            <Route
              path="*"
              element={<PageTransition><HomePage /></PageTransition>}
            />
          </Routes>
        </AnimatePresence>
      </main>
    </div>
  );
}
