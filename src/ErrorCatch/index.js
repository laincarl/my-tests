/*eslint-disable */
import BrowserInfo from 'browser-info';
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
        console.log(event)
        const { reason } = event;
        this.sendError({
          title: 'unhandledrejection',
          msg: reason.stack,
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

  _initListenAjax = function () {
    const that = this;
    const xhrOpen = window.XMLHttpRequest.prototype.open;
    // 保存原生的 send 方法
    const xhrSend = window.XMLHttpRequest.prototype.send;

    window.XMLHttpRequest.prototype.open = function () {
      const [method, url] = arguments;
      this.request = {
        method, url
      }
      xhrOpen.apply(this, arguments);
    };

    window.XMLHttpRequest.prototype.send = function () {
      const [body] = arguments
      this.request.body = body;
      this.addEventListener('readystatechange', function (event) {
        if (this.readyState === 4) {
          if (!this.status || this.status >= 400) {
            // 错误收集
            console.log(this.request, body);
            that.sendError({
              title: event.target.responseURL,
              msg: JSON.stringify({
                response: event.target.response,
                responseURL: event.target.responseURL,
                status: event.target.status,
                statusText: event.target.statusText,
              }),
              category: 'ajax',
              level: 'error',
              request: this.request
            })
          }
        }
      });
      xhrSend.apply(this, arguments);
    };
  }
  _startLintenAjax = function () {
    const self = this;

    // ajax timeout
    window.addEventListener("ajaxTimeout", function (err) {
      console.log(err)
      // if (err.detail.responseURL.indexOf(self._config.url) > -1) {
      //   return;
      // } else {

      //   ajaxError(err, self._config);
      // }
    });

    // ajax load error
    window.addEventListener("ajaxLoad", function (err) {
      if (err.detail.responseURL.indexOf(self._config.url) > -1) {
        return;
      } else {
        console.log(err)
        // ajaxError(err, self._config);
      }
    });
  }
  sendError = (err) => {
    console.log(err);
    const info = {
      ...err,
      browser: BrowserInfo()
    }
    fetch(this.config.url, {
      body: JSON.stringify(info),
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
    if (config.ajaxError) {
      this._initListenAjax();
    }
    // if (config.consoleError) {
    //   handleConsoleError(_window, config);
    // }
  }
}


export default new ErrorCatch();
