import React from 'react';
import PropTypes from 'prop-types';
import html2canvas from 'html2canvas';
import JsPdf from 'jspdf';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { hideAnchors, showAnchors } from '../actions/anchorActions';

const printPDF = function printPDF(hideLinks, showLinks) {
  hideLinks();
  const page = document.getElementById('overallPage');
  html2canvas(page)
    .then((canvas) => {
      const imgData = canvas.toDataURL('image/png');

      const imgWidth = 210;
      const pageHeight = 298;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;

      const doc = new JsPdf('p', 'mm');
      let position = 0;

      doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        doc.addPage();
        doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
      doc.save('CV Cristian Boarna.pdf');
      showLinks();
    });
};

// eslint-disable-next-line no-shadow
const Export = ({ hideAnchors, showAnchors, children }) => (
  <div>
    <button onClick={() => printPDF(hideAnchors, showAnchors)}>Download PDF</button>
    {children}
  </div>
);

const mapDispatchToProps = dispatch => bindActionCreators({
  hideAnchors,
  showAnchors,
}, dispatch);

export default connect(
  null,
  mapDispatchToProps,
)(Export);

Export.propTypes = {
  hideAnchors: PropTypes.func.isRequired,
  showAnchors: PropTypes.func.isRequired,
  children: PropTypes.shape
};
