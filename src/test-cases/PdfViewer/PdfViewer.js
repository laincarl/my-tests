import pdfjs from 'pdfjs-dist/build/pdf';
import { PDFPageView, DefaultTextLayerFactory, DefaultAnnotationLayerFactory } from 'pdfjs-dist/web/pdf_viewer';
import 'pdfjs-dist/web/pdf_viewer.css';
import React, {
  useState, useEffect, useRef, useMemo, Fragment,
} from 'react';
import { Button, Icon } from 'antd';
import Loading from './Loading';
import './PdfViewer.less';

export const usePdf = ({
  container,
  file,
  scale = 1.0,
  rotate = 0,
  page = 1,
  cMapUrl,
  cMapPacked,
  workerSrc = '//cdnjs.cloudflare.com/ajax/libs/pdf.js/2.2.228/pdf.worker.js',
  withCredentials = false,
}) => {
  const [pdf, setPdf] = useState();

  useEffect(() => {
    pdfjs.GlobalWorkerOptions.workerSrc = workerSrc;
  }, []);

  useEffect(() => {
    const config = { url: file, withCredentials };
    if (cMapUrl) {
      config.cMapUrl = cMapUrl;
      config.cMapPacked = cMapPacked;
    }
    pdfjs.getDocument(config).promise.then(setPdf);
  }, [file, withCredentials]);
  // 渲染一页
  const drawPDF = (pageContent) => {
    // eslint-disable-next-line no-param-reassign
    container.current.innerHTML = '';

    const pdfPageView = new PDFPageView({
      container: container.current,
      id: page,
      scale,
      defaultViewport: pageContent.getViewport({ scale }),

      // 启用字可选
      textLayerFactory: new DefaultTextLayerFactory(),
      annotationLayerFactory: new DefaultAnnotationLayerFactory(),
    });
    pdfPageView.setPdfPage(pageContent);
    return pdfPageView.draw();
  };
  useEffect(() => {
    if (pdf) {
      pdf.getPage(page).then(p => drawPDF(p));
    }
  }, [pdf, page, scale, rotate]);


  const loading = useMemo(() => !pdf, [pdf]);
  // eslint-disable-next-line no-underscore-dangle
  const numPages = useMemo(() => (pdf ? pdf._pdfInfo.numPages : null), [pdf]);

  return [loading, numPages];
};

const Pdf = ({
  file,
  onDocumentComplete,
  scale,
  rotate,
  cMapUrl,
  cMapPacked,
  workerSrc,
  withCredentials,
}) => {
  const container = useRef(null);
  const [page, setPage] = useState(1);
  const [loading, numPages] = usePdf({
    container,
    file,
    page,
    scale,
    rotate,
    cMapUrl,
    cMapPacked,
    workerSrc,
    withCredentials,
  });

  useEffect(() => {
    onDocumentComplete(numPages);
  }, [numPages]);

  return (
    <div className="pdf-viewer">
      <div className="pdf-viewer-content" ref={container} />
      {loading ? <Loading /> : (
        <>
          <div className="pdf-viewer-prePage">
            <Button
              shape="circle"
              disabled={page === 1}
              onClick={() => {
                setPage(page - 1);
              }}
            >
              <Icon type="left" />
            </Button>
          </div>
          <div className="pdf-viewer-pagination">
            {`${page}/${numPages || 1}`}
          </div>
          <div className="pdf-viewer-nextPage">
            <Button
              shape="circle"
              disabled={page === numPages}
              onClick={() => {
                setPage(page + 1);
              }}
            >
              <Icon type="right" />
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

Pdf.defaultProps = {
  onDocumentComplete: () => { },
};

export default Pdf;
