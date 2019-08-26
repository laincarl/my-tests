import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactQuill, { Quill } from 'react-quill';
import QuillMention from 'quill-mention';
import QuillEmoji from 'quill-emoji';
import 'react-quill/dist/quill.snow.css';
import 'quill-emoji/dist/quill-emoji.css';

Quill.register('modules/Quill', QuillMention);
// Quill.register('modules/emoji', QuillEmoji);
const atValues = [
  { id: 1, value: 'Fredrik Sundqvist' },
  { id: 2, value: 'Patrik Sjölin' },
];
const hashValues = [
  { id: 3, value: 'Fredrik Sundqvist 2' },
  { id: 4, value: 'Patrik Sjölin 2' },
];
const ToolBar = ({ id, onFullScreenClick, hideFullScreen }) => (
  <div id={id || 'toolbar'}>
    <button type="button" className="ql-bold" />
    <button type="button" className="ql-italic" />
    <button type="button" className="ql-underline" />
    <button type="button" className="ql-strike" />
    <button type="button" className="ql-blockquote" />
    <button type="button" className="ql-list" value="ordered" />
    <button type="button" className="ql-list" value="bullet" />
    <button type="button" className="ql-image" />
    <button type="button" className="ql-link" />
    <select className="ql-color">
      {/* <option value="red" />
      <option value="green" />
      <option value="blue" />
      <option value="orange" />
      <option value="violet" />
      <option value="#d0d1d2" />
      <option selected /> */}
    </select>
  </div>
);
class QuillEditor extends Component {
  constructor() {
    super();
    const toolbarOptions = {
      container: [
        // ['bold', 'italic', 'underline', 'strike'],
        ['emoji'],
      ],
      handlers: { emoji() { } },
    };
    this.modules = {
      // ...
      toolbar: toolbarOptions,
      'emoji-toolbar': true,
      'emoji-textarea': false,
      'emoji-shortname': true,
      mention: {
        allowedChars: /^[A-Za-z\sÅÄÖåäö]*$/,
        mentionDenotationChars: ['@'],
        source: async (searchTerm, renderList, mentionChar) => {          
          const getUsers = () => new Promise((resolve) => {
            setTimeout(() => {
              resolve({
                list: [{
                  id: 1,
                  value: 'wang',
                }, {
                  id: 2,
                  value: 'wang',
                }, {
                  id: 3,
                  value: 'wang',
                }, {
                  id: 4,
                  value: 'wang',
                }, {
                  id: 5,
                  value: 'wang',
                }],
              });
            }, 1000);
          });
          const { list } = await getUsers(searchTerm);
          renderList(list, searchTerm);
        },
      },
    };
  }

  handleChange = (content, delta, source, editor) => {
    const { onChange } = this.props;
    const value = editor.getContents();
    this.value = value.ops;
    console.log(value.ops);
  };

  render() {
    return (
      <div>
        <ReactQuill
          // ref={this.saveRef('editor')}
          theme="snow"
          modules={this.modules}
          // style={{ height: editHeight, width: '100%' }}
          // placeholder={placeholder || '描述'}
          defaultValue={[{
            insert: { emoji: 'relieved' },
          }, {
            insert: {
              mention: {
                denotationChar: '@',
                id: '1',
                index: '0',
                value: 'wang',
              },
            },
          }]}
          onChange={this.handleChange}
          bounds=".react-quill-editor"
        />
      </div>
    );
  }
}

QuillEditor.propTypes = {

};

export default QuillEditor;
