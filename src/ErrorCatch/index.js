class ErrorCatch {
  handleWindowError = () => {
    const _oldWindowError = window.onerror;
    window.onerror = (...args) => {
      const [msg, url, row, col, error] = args;
      if (error && error.stack) {
        this.sendError({
          title: msg,
          msg: error.stack,
          url,
          row,
          col,
          category: 'js',
          level: 'error',
        });
      } else if (typeof msg === 'string') {
        this.sendError({
          title: msg,
          msg: JSON.stringify({
            url,
            row,
            col,
          }),
          url,
          row,
          col,
          category: 'js',
          level: 'error',
        });
      }
      if (_oldWindowError) {
        _oldWindowError.apply(window, args);
      }
    };
  };

  handleRejectPromise = () => {
    window.addEventListener('unhandledrejection', (event) => {
      if (event) {
        const { reason } = event;
        this.sendError({
          title: 'unhandledrejection',
          msg: reason,
          category: 'js',
          level: 'error',
        });
      }
    }, true);
  };

  handleResourceError = () => {
    window.addEventListener('error', (event) => {
      if (event) {
        const target = event.target || event.srcElement;
        const isElementTarget = target instanceof HTMLScriptElement
          || target instanceof HTMLLinkElement || target instanceof HTMLImageElement;
        if (!isElementTarget) return; // js error不再处理

        const url = target.src || target.href;
        this.sendError({
          title: target.nodeName,
          msg: url,
          category: 'resource',
          level: 'error',
        });
      }
    }, true);
  };

  sendError = (err) => {
    fetch(this.config.url, {
      body: JSON.stringify(err),
      headers: {
        'content-type': 'application/json',
      },
      method: 'POST',
    }).then().then().catch((error) => {
      console.log(error);
    });
  }

  init(options) {
    const defaultConfig = {
      url: 'http://localhost',
      jsError: true,
      resourceError: true,
      ajaxError: true,
      consoleError: false, // console.error默认不处理
      scriptError: false, // 跨域js错误，默认不处理，因为没有任何信息     
      autoReport: true,
      filters: [], // 过滤器，命中的不上报
      levels: ['info', 'warning', 'error'],
      category: ['js', 'resource', 'ajax'],
    };
    const config = { ...defaultConfig, ...options };
    this.config = config;
    if (!config.scriptError) {
      config.filters.push((...args) => /^Script error\.?$/.test(args[0]));
    }

    // 处理过滤器
    const _oldSendError = config.sendError;
    config.sendError = (...args) => {
      try {
        const isFilter = config.filters.some(func => typeof func === 'function' && func.apply(this, args));
        if (isFilter) { return; }
        _oldSendError.apply(this, args);
        if (config.autoReport) { return; }
      } catch (e) {
        _oldSendError({
          title: 'betterJs',
          msg: e,
          category: 'js',
        });
      }
    };


    const addEventListener = window.addEventListener || window.attachEvent;
    if (config.jsError) {
      this.handleWindowError();
    }
    if (config.jsError) {
      this.handleRejectPromise();
    }
    if (config.resourceError && addEventListener) {
      this.handleResourceError();
    }
    // if (config.ajaxError) {
    //   handleAjaxError(_window, config);
    // }
    // if (config.consoleError) {
    //   handleConsoleError(_window, config);
    // }
  }
}


export default new ErrorCatch();
