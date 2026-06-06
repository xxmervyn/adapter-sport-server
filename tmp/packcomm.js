(function () {
    let windowLocationHref = window.location.href;
    var hostArr = window.location.host.split(".")
    hostArr[0] = hostArr[0] + "-api"
    const LOCAL_HOST_API = hostArr.join(".").replaceAll("-h5", "").replaceAll("-fifa", "");
    hostArr = window.location.host.split(".")
    hostArr[0] = hostArr[0] + "-fifa"
    const LOCAL_HOST_FIFA = hostArr.join(".").replaceAll("-h5", "");
    const LOCAL_HOST = window.location.host;

    const rewriteUrl = (url) => {
        try {
            const u = new URL(url, location.origin);
            if (u.hostname.includes("api")) {
                u.host = LOCAL_HOST_API;
            } else {
                u.host = LOCAL_HOST;
            }
            return u.toString();
        } catch {
            return url;
        }
    }


    if (windowLocationHref.includes("#/")) {
        windowLocationHref = windowLocationHref.replace("#/", "/");
    }

    const locationUrl = new URL(windowLocationHref);
    const buildXfp = () => {
        const xfpUrl = new URL(`${window.location.origin}${window.location.pathname.replace("#/", "/")}`);
        const baseKeys = ["token", "reqt", "esign"];
        const xfpKeys = (locationUrl.searchParams.get("xfpKeys") || "")
            .split(",")
            .map((key) => key.trim())
            .filter(Boolean);
        const passKeys = new Set([...baseKeys, ...xfpKeys]);

        for (const key of passKeys) {
            const value = locationUrl.searchParams.get(key);
            if (value === null || value === "") {
                continue;
            }
            xfpUrl.searchParams.set(key, value);
        }

        return xfpUrl.toString();
    };
    let xfp = buildXfp();

    if (locationUrl.searchParams.get("one") && locationUrl.searchParams.get("token") && locationUrl.searchParams.get("token") != "") {
        localStorage.setItem("xfrontpage", xfp);
    } else if (localStorage.getItem("xfrontpage")) {
        xfp = localStorage.getItem("xfrontpage");
    }

    if (locationUrl.searchParams.get("xfrontpage")) {
        xfp = decodeURIComponent(locationUrl.searchParams.get("xfrontpage"));
    }

    if (locationUrl.searchParams.get("ui")) {
        const ui = locationUrl.searchParams.get("ui");
        if (ui == "pcNew" || ui == "pcOld") {
            localStorage.setItem("VERSION", ui);
        }
    }

    const OriginXHR = window.XMLHttpRequest;
    window.XMLHttpRequest = function () {
        const xhr = new OriginXHR();

        const originOpen = xhr.open;
        xhr.open = function (method, url, async, user, pass) {
            const newUrl = rewriteUrl(url);
            this._url = newUrl;

            return originOpen.call(this, method, newUrl, async, user, pass);
        };

        const originSend = xhr.send;
        xhr.send = function (data) {
            if (this._url && this._url.includes("-api.")) {
                this.setRequestHeader("x-front-page", xfp);
            }
            return originSend.call(this, data);
        };

        return xhr;
    };

    const originalOpen = window.open;
    window.open = function (url, target, features) {
        if (url.includes("xfrontpage") == false) {
            url = url + "&xfrontpage=" + encodeURIComponent(xfp);
        }
        if (url.includes("pc.ffwc-2026.com")){

            url = url.replaceAll( 'https://pc.ffwc-2026.com/#/?' ,`https://${LOCAL_HOST_FIFA}/index.html#/?`);
        }

        return originalOpen.call(this, url, target, features);
    };

    const WebSocketProxy = new Proxy(WebSocket, {
        construct(target, args, newTarget) {
            const __tk = window.location.href.match(/[?&]tk=([^&#]*)/) ? window.location.href.match(/[?&]tk=([^&#]*)/)[1] : "";
            let url = args[0];
            if (__tk) {
                url = url.replace(/token=([^&]*)/, `token=${__tk}`);
            }
            return Reflect.construct(target, [url, ...args.slice(1)], newTarget);
        }
    });
    window.WebSocket = WebSocketProxy;


    window.addEventListener("load", () => {
        document.addEventListener("click", function (e) {
            const el = e.target.closest(".world-cup-icon");
            if (!el) return;

            const base = location.origin;
            const hash = locationUrl.search;
            const url = base + "/worldcup.html#/schedule" + hash + `&hbapihost=${encodeURIComponent("https://sportapi.fast1sports66.com")}`;

            location.href = url;
        });
    });

    const _c = String.prototype.concat;

    String.prototype.concat = function (...a) {
      const r = _c.apply(this, a);
      if (typeof r === "string" && r.includes("/#/schedule?language=")) {
        try {
          const u = new URL(r, location.origin);
          u.host = location.host;
          u.protocol = location.protocol;
          return u.toString();
        } catch {
          return r.replace(/^https?:\/\/[^/]+/, location.origin);
        }
      }
      return r;
    };
})();
