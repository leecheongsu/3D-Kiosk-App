// place in plugins/i18next.js
import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import ko_KR from "../locales/ko-KR/translation.json"; // 한국어
import en_US from "../locales/en-US/translation.json"; // 영어
// import ja_JP from "../locales/ja-JP/translation.json"; // 일본어
// import my_MM from "../locales/my-MM/translation.json"; // 미얀마어
// import vi_VN from "../locales/vi-VN/translation.json"; // 미얀마어
// import zh_CN from "../locales/zh-CN/translation.json"; // 중국어

const lngs = ["ko-KR", "en-US"];
// const lngs = ["ko-KR", "en-US", , "ja-JP", "my-MM", "vi-VN", "zh-CN"];
/**
 * Must add new language here
 * @param lng {Language} language
 * @returns {Object} json resource
 */
function loadResource(lng) {
  let module;

  switch (lng) {
    case "ko-KR": {
      module = ko_KR;
      break;
    }
    case "en-US": {
      module = en_US;
      break;
    }
    // case "ja-JP": {
    //   module = ja_JP;
    //   break;
    // }
    // case "zh-CN": {
    //   module = zh_CN;
    //   break;
    // }
    // case "my-MM": {
    //   module = my_MM;
    //   break;
    // }
    // case "vi-VN": {
    //   module = vi_VN;
    //   break;
    // }
    default:
      break;
  }

  return module;
}

function getResources(lngs) {
  const resources = {};

  lngs.forEach((lng) => {
    resources[lng] = {
      translation: loadResource(lng),
    };
  });

  return resources;
}

export function initializeI18next() {
  i18next
    .use(Backend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      debug: true,
      fallbackLng: "ko-KR",
      compatibilityJSON: "v3",
      returnEmptyString: false,
      // keySeparator: false,
      // nsSeparator: false,
      pluralSeparator: "_",
      simplifyPluralSuffix: true,
      interpolation: {
        escapeValue: false,
      },
      // parseMissingKeyHandler(key) {
      //   /* eslint-disable-next-line no-console */
      //   // console.warn("parseMissingKeyHandler", `'key': '${key}'`);
      //   // const keySeparator = "~~";
      //   // const value = key.includes(keySeparator) ? key.split(keySeparator)[1] : key;

      //   return key;
      // },
      resources: getResources(lngs),
      react: {
        defaultTransParent: "div",
        transEmptyNodeValue: "",
        transSupportBasicHtmlNodes: true,
        // <Trans> 컴포넌트 내부에 들어가는 html 태그들
        transKeepBasicHtmlNodesFor: ["br", "strong", "i", "button", "a", "span", "div", "input"],
        transWrapTextNodes: "",
      },
    });
}

export function changeLanguage(lng) {
  return i18next.changeLanguage(lng);
}

export const i18n = i18next;
console.log(i18n.language);
console.log(i18n.languages);
