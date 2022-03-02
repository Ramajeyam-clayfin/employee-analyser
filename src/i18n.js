import i18n from "i18next";
// import { initReactI18next } from "react-i18next";

import Backend from "i18next-xhr-backend";  
import LanguageDetector from "i18next-browser-languagedetector"; 

i18n
.use(Backend)  
.use(LanguageDetector)  
.init({  
  fallbackLng: "en",  
  debug: true,  
  react: {  
    bindI18n: "languageChanged",  
    bindI18nStore: "",  
    transEmptyNodeValue: "",  
    transSupportBasicHtmlNodes: true,  
    transKeepBasicHtmlNodesFor: ["br", "strong", "i"],  
    useSuspense: false 
    }
  });

  export default i18n;


  
// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
// const resources = {
//   en: {
//     translation: {
//       "Welcome to React": "Welcome to React and react-i18next"
//     }
//   },
//   fr: {
//     translation: {
//       "Welcome to React": "Bienvenue à React et react-i18next"
//     }
//   }
// };
