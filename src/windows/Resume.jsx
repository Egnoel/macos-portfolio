import { WindowControls } from '#components';
import WindowWrapper from '#hoc/WindowWrapper';
import { Download } from 'lucide-react';
import React, { useState, useEffect } from 'react';

import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url
).toString();

const Resume = () => {
  return (
    <>
      <div id="window-header">
        <WindowControls target="resume" />
        <h2>Resume.pdf</h2>

        <a
          href={'files/resume.pdf'}
          target="_blank"
          rel="noopener noreferrer"
          className="cursor-pointer"
          title="Open Resume"
          download
        >
          <Download className="icon" />
        </a>
      </div>
      <Document file={'files/resume.pdf'}>
        <Page pageNumber={1} renderTextLayer renderAnnotationLayer />
      </Document>
    </>
  );
};

const ResumeWindow = WindowWrapper(Resume, 'resume');

export default ResumeWindow;
