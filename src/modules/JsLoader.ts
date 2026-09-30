export default class JsLoader {
  static loadFile(url: string, callBack?: () => any) {
    const existingScript = document.querySelector(`script[src="${url}"]`);
    if (existingScript) {
      existingScript.parentNode?.removeChild(existingScript);
    }
    const script = document.createElement("script");
    script.src = url;
    script.async = false;
    script.onload = () => {
      if (callBack && typeof callBack !== "undefined") {
        callBack();
      }
    };
    document.body.appendChild(script);
  }
}
