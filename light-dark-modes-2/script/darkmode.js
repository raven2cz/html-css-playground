(() => {
    var e = document.getElementById("tglScheme");
    window.matchMedia("(prefers-color-scheme: dark)").matches
        ? (document.head.insertAdjacentHTML("beforeend", '<style id="scheme">:root{color-scheme:dark}</style>'),
            document.body.classList.add("dark"),
            e && (e.checked = !0),
            window.localStorage.getItem("scheme") &&
            (document.getElementById("scheme").remove(), document.head.insertAdjacentHTML("beforeend", '<style id="scheme">:root{color-scheme:light}</style>'), document.body.classList.remove("dark"), e && (e.checked = !1)),
            e &&
            e.addEventListener("click", () => {
                e.checked
                    ? (document.getElementById("scheme").remove(),
                        document.head.insertAdjacentHTML("beforeend", '<style id="scheme">:root{color-scheme:dark}</style>'),
                        document.body.classList.add("dark"),
                        localStorage.removeItem("scheme"))
                    : (document.getElementById("scheme").remove(),
                        document.head.insertAdjacentHTML("beforeend", '<style id="scheme">:root{color-scheme:light}</style>'),
                        document.body.classList.remove("dark"),
                        localStorage.setItem("scheme", 1));
            }))
        : (document.head.insertAdjacentHTML("beforeend", '<style id="scheme">:root{color-scheme:light}</style>'),
            e && (e.checked = !1),
            window.localStorage.getItem("scheme") &&
            (document.getElementById("scheme").remove(), document.head.insertAdjacentHTML("beforeend", '<style id="scheme">:root{color-scheme:dark}</style>'), document.body.classList.add("dark"), e && (e.checked = !0)),
            e &&
            e.addEventListener("click", () => {
                e.checked
                    ? (document.getElementById("scheme").remove(),
                        document.head.insertAdjacentHTML("beforeend", '<style id="scheme">:root{color-scheme:dark}</style>'),
                        document.body.classList.add("dark"),
                        localStorage.setItem("scheme", 1))
                    : (document.getElementById("scheme").remove(),
                        document.head.insertAdjacentHTML("beforeend", '<style id="scheme">:root{color-scheme:light}</style>'),
                        document.body.classList.remove("dark"),
                        localStorage.removeItem("scheme"));
            }));
})(),
    window.matchMedia("(prefers-color-scheme: light)").addEventListener("change", () => {
        location.reload(), localStorage.removeItem("scheme");
    });
