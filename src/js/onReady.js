const onReady = func => {
  if (document.readyState === "complete") {
    setTimeout(func, 1);
  } else {
    const readyStateCheckInterval = setInterval(() => {
      if (document.readyState === "complete") {
        clearInterval(readyStateCheckInterval);
        func();
      }
    }, 10);
  }
};

export default onReady;
