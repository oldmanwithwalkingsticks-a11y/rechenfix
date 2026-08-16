'use client';

import { createContext, useContext, useEffect, useState, useCallback } from 'react';

interface CookieConsent {
  necessary: boolean;
  timestamp: string;
}

interface CookieConsentContextType {
  consent: CookieConsent | null;
  consentGiven: boolean;
  bannerVisible: boolean;
  settingsVisible: boolean;
  saveConsent: () => void;
  resetConsent: () => void;
  openBanner: () => void;
  openSettings: () => void;
  closeSettings: () => void;
}

const STORAGE_KEY = 'cookie-consent';
const CONSENT_MAX_AGE_DAYS = 365;

const CookieConsentContext = createContext<CookieConsentContextType>({
  consent: null,
  consentGiven: false,
  bannerVisible: false,
  settingsVisible: false,
  saveConsent: () => {},
  resetConsent: () => {},
  openBanner: () => {},
  openSettings: () => {},
  closeSettings: () => {},
});

export function useCookieConsent() {
  return useContext(CookieConsentContext);
}

function isConsentExpired(timestamp: string): boolean {
  const consentDate = new Date(timestamp);
  const now = new Date();
  const diffMs = now.getTime() - consentDate.getTime();
  const diffDays = diffMs / (1000 * 60 * 60 * 24);
  return diffDays > CONSENT_MAX_AGE_DAYS;
}

export default function CookieConsentProvider({ children }: { children: React.ReactNode }) {
  const [consent, setConsent] = useState<CookieConsent | null>(null);
  const [bannerVisible, setBannerVisible] = useState(false);
  const [settingsVisible, setSettingsVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed: CookieConsent = JSON.parse(stored);
        if (parsed.timestamp && !isConsentExpired(parsed.timestamp)) {
          setConsent(parsed);
        } else {
          localStorage.removeItem(STORAGE_KEY);
          setBannerVisible(true);
        }
      } else {
        setBannerVisible(true);
      }
    } catch {
      setBannerVisible(true);
    }
    setMounted(true);
  }, []);

  // R2 — Seit dem Rueckbau von AdSense wird keine Einwilligung mehr eingeholt,
  // die ein Fremdskript freischaltet. Die Bestaetigung haelt nur noch fest, dass
  // der Hinweis zur Kenntnis genommen wurde; das W73a-Neuladen beim Widerruf ist
  // damit gegenstandslos und entfaellt.
  const saveConsent = useCallback(() => {
    const full: CookieConsent = {
      necessary: true,
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(full));
    setConsent(full);
    setBannerVisible(false);
    setSettingsVisible(false);
  }, []);

  const resetConsent = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setConsent(null);
    setBannerVisible(true);
  }, []);

  const openBanner = useCallback(() => {
    setBannerVisible(true);
  }, []);

  const openSettings = useCallback(() => {
    setSettingsVisible(true);
  }, []);

  const closeSettings = useCallback(() => {
    setSettingsVisible(false);
  }, []);

  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <CookieConsentContext.Provider
      value={{
        consent,
        consentGiven: consent !== null,
        bannerVisible,
        settingsVisible,
        saveConsent,
        resetConsent,
        openBanner,
        openSettings,
        closeSettings,
      }}
    >
      {children}
    </CookieConsentContext.Provider>
  );
}
