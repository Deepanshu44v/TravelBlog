// src/utils/ga.js
import ReactGA from "react-ga4";

export const initGA = () => {
  ReactGA.initialize("G-G5LNFXJHBY"); // ← Replace with your Measurement ID
};

export const logPageView = () => {
  ReactGA.send({ hitType: "pageview", page: window.location.pathname });
};
