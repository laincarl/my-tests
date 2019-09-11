import React, { Component } from 'react';
import PropTypes from 'prop-types';
import brace from 'brace';
import AceEditor from 'react-ace';
import 'brace/mode/javascript';
import 'brace/theme/github';
import beautify_js from 'js-beautify';
import CodeMirror from 'react-codemirror';
import './Ace.css';
import 'codemirror/theme/neat.css';
import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/javascript/javascript';

const data = `var component = {
  name: "react-codemirror",
  author: "Jed Watson",
  repo: "https://github.com/JedWatson/react-codemirror"
};`;
class Ace extends Component {
  render() {
    const f = beautify_js(data, {
      indent_size: '4',
      indent_char: ' ',
      max_preserve_newlines: '5',
      preserve_newlines: true,
      keep_array_indentation: false,
      break_chained_methods: false,
      indent_scripts: 'normal',
      brace_style: 'collapse',
      space_before_conditional: true,
      unescape_strings: false,
      jslint_happy: false,
      end_with_newline: false,
      wrap_line_length: '0',
      indent_inner_html: false,
      comma_first: false,
      e4x: false,
      indent_empty_lines: false,
    });
    return (
      <div>
        <AceEditor
          // mode="json"
          mode="javascript"
          theme="github"
          name="UNIQUE_ID_OF_DIV"
          value={f}
        />
        <CodeMirror
          value={f}
          options={{
            theme: 'neat',
            mode: 'javascript',
            readOnly: true,
            lineNumbers: false,
            lineWrapping: true, 
          }}
        />
      </div>
    );
  }
}

Ace.propTypes = {

};

export default Ace;
