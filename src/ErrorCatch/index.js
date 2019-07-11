/*eslint-disable */
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

  handleFetchError = () => {
    if (!window.fetch) return;
    const _oldFetch = window.fetch.bind(window);
    window.fetch = (...args) => _oldFetch.apply(this, args).then((res) => {
      if (!res.ok) { // True if status is HTTP 2xx
        this.sendError({
          title: args[0],
          msg: JSON.stringify(res),
          category: 'ajax',
          level: 'error',
        });
      }
      return res;
    })
      .catch((error) => {
        this.sendError({
          title: args[0],
          msg: JSON.stringify({
            message: error.message,
            stack: error.stack,
          }),
          category: 'ajax',
          level: 'error',
        });
        throw error;  
      });
  }

handleAjaxError = () => {
  const protocol = window.location.protocol;
  if (protocol === 'file:') return;

  // 处理fetch
  this.handleFetchError();

  // 处理XMLHttpRequest
  if (!window.XMLHttpRequest) {
    return;   
  } 
  const xmlhttp = window.XMLHttpRequest;
    
  const _oldSend = xmlhttp.prototype.send;
  const _handleEvent = (event, ...other) => {    
    if (event && event.currentTarget && event.currentTarget.status !== 200) {
      this.sendError({
        title: event.target.responseURL,
        msg: JSON.stringify({
          response: event.target.response,
          responseURL: event.target.responseURL,
          status: event.target.status,
          statusText: event.target.statusText,
        }),
        category: 'ajax',
        level: 'error',
      });
    }
  };
  xmlhttp.prototype.send = function (...args) {
    if (this.addEventListener) {
      this.addEventListener('error', _handleEvent);
      this.addEventListener('load', _handleEvent);
      this.addEventListener('abort', _handleEvent);
    } else {
      const _oldStateChange = this.onreadystatechange;
      this.onreadystatechange = (...args) => {  
        const [event] = args;
        if (this.readyState === 4) {
          _handleEvent(event);
        }
        _oldStateChange && _oldStateChange.apply(this, args);
      };
    }
    return _oldSend.apply(this, args);
  };
}

  sendError = (err) => {
    console.log(err);
    // fetch(this.config.url, {
    //   body: JSON.stringify(err),
    //   headers: {
    //     'content-type': 'application/json',
    //   },
    //   method: 'POST',
    // }).then().then().catch((error) => {
    //   console.log(error);
    // });
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
    if (config.ajaxError) {
      this.handleAjaxError();
    }
    // if (config.consoleError) {
    //   handleConsoleError(_window, config);
    // }
  }
}


export default new ErrorCatch();
