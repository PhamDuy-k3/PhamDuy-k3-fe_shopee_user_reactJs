import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import HOME_EN from "..//locales/en/home.json";
import HOME_VI from "..//locales/vi/home.json";

export const locales = {
  en: "English",
  vi: "Tiếng Việt",
};
const resources = {
  en: {
    home: HOME_EN,
  },
  vi: {
    home: HOME_VI,
  },
};
const defaultNS = "home";
i18n
  .use(initReactI18next) // pass i18n to react-i18next.
  .init({
    resources,
    lng: "vi", // Ngôn ngữ mặc định
    fallbackLng: "vi", // Ngôn ngữ dự phòng
    ns: ["home"], // danh sách ns muốn sử dụng trong ứng dụng
    defaultNS,
    interpolation: {
      escapeValue: false, // React đã bảo vệ khỏi XSS
    },
  });
export default i18n;
