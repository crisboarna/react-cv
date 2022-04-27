import React, { FC, useCallback, useEffect, useState } from 'react';
import GitHubButton from 'react-github-btn';
import queryString from 'query-string';
import { HOST_URL } from '../../../config';
import './buttons.css';

const CV_NAME = 'Cristian Boarna CV.pdf';

const Buttons: FC = () => {
  const [showButtons, setShowButtons] = useState<boolean>(true);

  useEffect(() => {
    const query: { buttons?: string } = queryString.parse(
      window.location.search
    );
    if (query && query.buttons !== undefined && query.buttons === 'false') {
      setShowButtons(false);
    }
  }, [window.location.search]);

  const getPdf = useCallback(async () => {
    const pdfBlob = await fetch(`${HOST_URL}/${CV_NAME}`).then((res) =>
      res.blob()
    );
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(new Blob([pdfBlob]));
    link.download = CV_NAME;
    document.body.appendChild(link);
    link.click();
    link.parentNode?.removeChild(link);
  }, []);

  return (
    <div
      id={'button-container'}
      className={'button-container'}
      style={{ display: !showButtons ? 'none' : '' }}
    >
      <div>
        <button id={'export-button'} onClick={getPdf}>
          Download PDF
        </button>
      </div>
      <div>
        <GitHubButton
          data-text={'View Code'}
          aria-label={'View crisboarna/react-cv on GitHub'}
          data-size={'large'}
          href="https://github.com/crisboarna/react-cv"
        />
        <GitHubButton
          data-text={'Watch'}
          aria-label={'Watch crisboarna/react-cv on GitHub'}
          data-show-count={true}
          data-size={'large'}
          href="https://github.com/crisboarna/react-cv/subscription"
        />
        <GitHubButton
          data-text={'Star'}
          aria-label={'Star crisboarna/react-cv on GitHub'}
          data-show-count={true}
          data-size={'large'}
          href={'https://github.com/crisboarna/react-cv'}
        />
        <GitHubButton
          data-text={'Fork'}
          aria-label={'Fork crisboarna/react-cv on GitHub'}
          data-show-count={true}
          data-size={'large'}
          href={'https://github.com/crisboarna/react-cv/fork'}
        />
      </div>
    </div>
  );
};

export default Buttons;
