import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import {RU} from "./lang/RU"
import {EN} from "./lang/EN"

const resources= {
  en: {
    translation: EN
  },
  ru: {
    translation: RU
  }
}
i18n.use(initReactI18next).init({
  resources,
  lng: "ru",
  fallbackLng: "en"
})
export default i18n
