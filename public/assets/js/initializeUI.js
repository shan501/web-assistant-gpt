(async () => {
  const app = document.createElement("div");
  app.id = "helper-icon";
  app.style.position = "fixed";
  app.style.top = "10px";
  app.style.right = "10px";
  app.style.width = "50px";
  app.style.height = "50px";
  app.style.zIndex = "9999";
  app.style.borderRadius = "50%";
  document.body.append(app);

  const src = chrome?.runtime?.getURL("/react/index.js");
  await import(src);

  function isFullScreen() {
    return !!(
      document.fullscreenElement ||
      document.mozFullScreenElement ||
      document.webkitFullscreenElement ||
      document.msFullscreenElement
    );
  }

  // Function to hide or show the React component based on full-screen mode
  function toggleComponentVisibility() {
    app.style.display = isFullScreen() ? "none" : "block";
  }

  // Listen for the 'fullscreenchange' event and toggle component visibility accordingly
  document.addEventListener("fullscreenchange", toggleComponentVisibility);
  document.addEventListener("mozfullscreenchange", toggleComponentVisibility);
  document.addEventListener(
    "webkitfullscreenchange",
    toggleComponentVisibility
  );
  document.addEventListener("msfullscreenchange", toggleComponentVisibility);
})();
