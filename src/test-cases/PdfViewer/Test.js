import React from 'react';
import PdfViewer from './PdfViewer';

export default function () {
  return <div style={{ height: 'calc(100% - 10px)', overflow: 'auto' }}><PdfViewer file="http://minio.staging.saas.hand-china.com/agile-service/file_15e290d843084b5aa3fd562b8ca52dbe_openssl-man.pdf" /></div>;
}
