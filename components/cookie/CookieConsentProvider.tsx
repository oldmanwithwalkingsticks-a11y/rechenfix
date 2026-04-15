'use client';

import { createContext, useContext, useEffect, useState, useCallback } from 'react';

interface CookieConsent {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  timestamp: string;
}

interface CookieConsentContextType {
  consent: CookieConsent | null;
  consentGiven: boolean;
  analyticsAllowed: boolean;
  marketingAllowed: boolean;
  bannerVisible: boolean;
  settingsVisible: boolean;
  saveConsent: (consent: Omit<CookieConsent, 'necessary' | 'timestamp'>) => void;
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
  analyticsAllowed: false,
  marketingAllowed: false,
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

  const saveConsent = useCallback((partial: Omit<CookieConsent, 'necessary' | 'timestamp'>) => {
    const full: CookieConsent = {
      necessary: true,
      analytics: partial.analytics,
      marketing: partial.marketing,
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
        analyticsAllowed: consent?.analytics ?? false,
        marketingAllowed: consent?.marketing ?? false,
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
