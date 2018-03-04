import React from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { hideAnchors, showAnchors } from "../actions/anchorActions";

const printPDF = function printPDF(hideAnchors, showAnchors) {
  hideAnchors();
  const page = document.getElementById('overallPage');
  html2canvas(page)
    .then(canvas => {

      const imgData = canvas.toDataURL('image/png');

      const imgWidth = 210;
      const pageHeight = 298;
      const imgHeight = canvas.height * imgWidth / canvas.width;
      let heightLeft = imgHeight;

      const doc = new jsPDF('p', 'mm');
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
      showAnchors();
    });
};

const Export = ({ hideAnchors, showAnchors, children}) => {
  return (
    <div>
      <button onClick={() => printPDF(hideAnchors, showAnchors)}>Download PDF</button>
      {children}
    </div>
  );
};

const mapDispatchToProps = dispatch => bindActionCreators({
  hideAnchors,
  showAnchors
}, dispatch);

export default connect(
  null,
  mapDispatchToProps
)(Export);