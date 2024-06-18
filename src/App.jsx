import React, { useState } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import './App.css';

function App() {
  const [date, setDate] = useState("04.10.2023");
  const [financialYear, setFinancialYear] = useState("2023-24");
  const [quarterEndDate, setQuarterEndDate] = useState("30.09.2023");
  const [letterDate, setLetterDate] = useState("28.09.2023");
  const [title1, setTitle1] = useState("AGT/SST/F&A/CA/Q2");
  const [title2, setTitle2] = useState("AGT/F&A/CA/H1");
  // State variables for the second page
  const [serviceEntryStartDate, setServiceEntryStartDate] = useState("01.07.2023");
  const [serviceEntryEndDate, setServiceEntryEndDate] = useState("30.09.2023");
  const [poNumber, setPoNumber] = useState("5060157156");
  const [estimatedBill, setEstimatedBill] = useState("1,000/-");
  const [mluServiceStartDate, setMluServiceStartDate] = useState("01.07.2023");
  const [mluServiceEndDate, setMluServiceEndDate] = useState("30.09.2023");
  const [mluPoNumber, setMluPoNumber] = useState("5060160300");
  const [mluEstimatedBill, setMluEstimatedBill] = useState("1,000/-");
  const [gemStartDate, setGemStartDate] = useState("01.07.2023");
  const [gemEndDate, setGemEndDate] = useState("30.09.2023");
  const [gemPoNumber, setGemPoNumber] = useState("1030109570");
  const [gemEstimatedBill, setGemEstimatedBill] = useState("1,000/-");
  const [invoiceStartDate, setInvoiceStartDate] = useState("01.07.2023");
  const [invoiceEndDate, setInvoiceEndDate] = useState("30.09.2023");
  const [invoiceAmount, setInvoiceAmount] = useState("915/-");
  const [frNumber, setFrNumber] = useState("AGTSA23013/10");
  const [sixthPageDate,setsixthPageDate] =  useState('30.09.2023')
  const [sevethPageFy,setsevethPageFy] = useState('2023-24')
  const [wellDetails, setWellDetails] = useState({
    normalWells: "123 Gas wells + 01 ED wells + 02 Inconclusive",
    pcpPump: "1 (B#7)",
    srpWells: "6 Wells\nField1(1 Well) - B#1\nField2 (5 Wells) - R#1, #2, #3, #4, #5",
    plungerLiftWells: "10 Wells\nField3(8 Wells) - A1,A2,A3,A4,A5,A6,A7,A8\nField4 (2 Wells) - G1,G2",
    velocityString: "1 Well (B-1)"
  });

  const [abandonedWells, setAbandonedWells] = useState([
    { wellName: '', rig: '', field: '', status: '', restoration: '' }
  ]);

  const [fifthPagetable1, setfifthPagetable1] = useState([
    { PurchaseOrderNumber: '', ServiceEntrySheetNumber: '', Periodofliability: '', AmountinRs: ''}
  ]);

  const handlefifthPageTable1Add = () => {
    setfifthPagetable1([...fifthPagetable1, { PurchaseOrderNumber: '', ServiceEntrySheetNumber: '', Periodofliability: '', AmountinRs: '' }]);
  };

  const handlefifthPageTable1Remove  = (index) => {
    const updatedWells = fifthPagetable1.filter((_, i) => i !== index);
    setfifthPagetable1(updatedWells);
  };

  const handlefifthPageTable1Change = (index, field, value) => {
    const updatedWells = [...fifthPagetable1];
    updatedWells[index][field] = value;
    setfifthPagetable1(updatedWells);
  };
  
  const [fifthPagetable2, setfifthPagetable2] = useState([
    { Particulars: '', VendorCode: '', CostCenter: '', FRNumber: '',AmountinRs:''}
  ]);


  const handlefifthPageTable2Add = () => {
    setfifthPagetable2([...fifthPagetable2, { Particulars: '', VendorCode: '', CostCenter: '',FRNumber:'', AmountinRs: '' }]);
  };

  const handlefifthPageTable2Remove  = (index) => {
    const updatedWells = fifthPagetable2.filter((_, i) => i !== index);
    setfifthPagetable2(updatedWells);
  };

  const handlefifthPageTable2Change = (index, field, value) => {
    const updatedWells = [...fifthPagetable2];
    updatedWells[index][field] = value;
    setfifthPagetable2(updatedWells);
  };


  const [imprestData, setImprestData] = useState([
    { name: 'Shri. Subeer Kumar, Manager (Res.)', cpf: '123511', amount: '2,000', sanctioned: '3,000', frNumber: 'AGTSA23013/02' },
    { name: 'Shri. Shivaram Mudavath, Manager (Res.)', cpf: '121564', amount: '10,000', sanctioned: '2,000', frNumber: 'AGTSA23013/03' }
  ]);

  const handleAddAbandonedWellRow = () => {
    setAbandonedWells([...abandonedWells, { wellName: '', rig: '', field: '', status: '', restoration: '' }]);
  };

  const handleRemoveAbandonedWellRow = (index) => {
    const updatedWells = abandonedWells.filter((_, i) => i !== index);
    setAbandonedWells(updatedWells);
  };

  const handleAbandonedWellChange = (index, field, value) => {
    const updatedWells = [...abandonedWells];
    updatedWells[index][field] = value;
    setAbandonedWells(updatedWells);
  };

  const handleWellDetailsChange = (field, value) => {
    setWellDetails({
      ...wellDetails,
      [field]: value
    });
  };

  const handleImprestChange = (index, field, value) => {
    const updatedData = [...imprestData];
    updatedData[index][field] = value;
    setImprestData(updatedData);
  };

  const [wells, setWells] = useState([
    { wellName: 'GJLA-16', wellNo: '', rigDetail: '', pmlArea: '', depth: '', dateOfSpudding: '', dateOfHT: '', dateOfRigRelease: '', statusOfWell: '', statusOfConnection: '' }
  ]);

  const handleWellChange = (index, field, value) => {
    const newWells = [...wells];
    newWells[index][field] = value;
    setWells(newWells);
  };

  const addWellRow = () => {
    setWells([...wells, { wellName: '', wellNo: '', rigDetail: '', pmlArea: '', depth: '', dateOfSpudding: '', dateOfHT: '', dateOfRigRelease: '', statusOfWell: '', statusOfConnection: '' }]);
  };

  const deleteLastRow = () => {
    if (wells.length > 1) {
      const newWells = wells.slice(0, wells.length - 1);
      setWells(newWells);
    }
  };

  const [wells2, setWells2] = useState([
    { wellName: 'GJLA-16', wellNo: '', rigDetail: '', pmlArea: '', depth: '', dateOfSpudding: '', dateOfHT: '', dateOfRigRelease: '', statusOfWell: '', statusOfConnection: '' }
  ]);

  const handleWellChange2 = (index, field, value) => {
    const newWells = [...wells2];
    newWells[index][field] = value;
    setWells2(newWells);
  };

  const addWellRow2 = () => {
    setWells2([...wells2, { wellName: '', wellNo: '', rigDetail: '', pmlArea: '', depth: '', dateOfSpudding: '', dateOfHT: '', dateOfRigRelease: '', statusOfWell: '', statusOfConnection: '' }]);
  };

  const deleteLastRow2 = () => {
    if (wells2.length > 1) {
      const newWells = wells2.slice(0, wells2.length - 1);
      setWells2(newWells);
    }
  };



  const [fourthPageRs,setfourthPageRs] = useState("1000/-")
  const [fourthPageDate,setfourthPageDate] = useState("30.09.2023")
  const [fifthPageDate1,setfifthPageDate1] = useState("04.10.2023")
  const [fifthPageDate2,setfifthPageDate2] = useState("30.09.2023")
  const generatePDF = () => {
    const doc = new jsPDF();
  
    // Add title
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text(`No. AGT/SST/F&A/CA/Q2 Accounts /FY${financialYear}`, 10, 10);
    doc.text(`Date: ${date}`, 160, 10);
  
    doc.setLineWidth(0.5);
    doc.line(10, 15, 200, 15);
  
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.text("From: CGM (Res.)- Sub Surface Manager, ONGC, Tripura Asset, Agartala", 10, 25);
    doc.line(10, 30, 200, 30);
  
    doc.text("To : I/c Finance, ONGC, Tripura Asset, Agartala", 10, 45);
    doc.line(10, 50, 200, 50);
  
    doc.text(`Sub: Information for finalization of Q2 Accounts ending ${quarterEndDate}`, 10, 65);
    doc.line(10, 70, 200, 70);
  
    doc.setFontSize(11);
    const paragraph1 = `This is in reference to Letter No. AGT/F&A/CA/ H1 Accounts /FY ${financialYear} dated ${letterDate} on the subject mentioned above.`;
    const paragraph2 = `Information for Annual Accounts ending ${quarterEndDate} for the Financial Year ${financialYear} and the desired information pertaining to SST, Tripura Asset, Agartala is enclosed herewith.`;
    doc.text(doc.splitTextToSize(paragraph1, 180), 10, 85);
    doc.text(doc.splitTextToSize(paragraph2, 180), 10, 100);
  
    // Add signature
    doc.text("(XYZ)", 10, 140);
    doc.text("CGM (Res.)", 10, 145);
    doc.text("Sub Surface Manager", 10, 150);
  
    // Add second page
    doc.addPage();
    doc.setFont('helvetica', 'bold');
    doc.text("Details Pertaining to Sub Surface Team", 10, 10);
    doc.setFont('helvetica', 'normal');
    doc.text("3. Creation of all liabilities and confirmation thereof", 10, 20);
    doc.text("3.1. a) Services & works routed through PR/PO route :", 10, 30);
  
    const paragraph3 = `Service entry sheet till ${serviceEntryEndDate} towards Hiring of Unskilled Manpower for Reservoir field services has been created in SAP and released at all levels (PO No. ${poNumber}). The estimated bill for the period ${serviceEntryStartDate} to ${serviceEntryEndDate} is Rs. ${estimatedBill}.`;
    const paragraph4 = `Service entry sheet till ${mluServiceEndDate} towards Hiring of MLU Services has been created in SAP and released at all levels (PO No. ${mluPoNumber}). The estimated bill for the period ${mluServiceStartDate} to ${mluServiceEndDate} is Rs. ${mluEstimatedBill}.`;
    const paragraph5 = `PR/PO has been created towards GeM based procurement of batteries (32 No.) for 15KVA UPS (PR No. ${gemPoNumber}, PO No. 4075015561) Amounting to Rs. ${gemEstimatedBill} for the period ${gemStartDate} to ${gemEndDate}.`;
  
    doc.text(doc.splitTextToSize(paragraph3, 180), 10, 40);
    doc.text(doc.splitTextToSize(paragraph4, 180), 10, 55);
    doc.text(doc.splitTextToSize(paragraph5, 180), 10, 70);
  
    doc.text("b) Cases (other than services & works) processes to be booked through direct FI entry:", 10, 85);
    const paragraph6 = `Invoice amounting to Rs. ${invoiceAmount} toward Books/Periodicals has been processed in VIMS_dashboard against FR No. ${frNumber} for the period ${invoiceStartDate} to ${invoiceEndDate}.`;
    doc.text(doc.splitTextToSize(paragraph6, 180), 10, 95);
  
    const confirmationText = "3.2 Confirmation as per the format to the effect that all liabilities have been accounted for and nothing has been left out is provided as Annexure-1.";
    const confirmationChunks = doc.splitTextToSize(confirmationText, 180);
    let confirmationY = 110;
    confirmationChunks.forEach(chunk => {
        doc.text(chunk, 10, confirmationY);
        confirmationY += 7; // Adjust line spacing
    });
  
    doc.text("6. Material Accounting", 10, 125);
    doc.text("6.1. Booking of Material Consumption:", 10, 135);
    doc.text("Material consumption data up to 30.09.2023 is already updated and booked in the ICE (SAP) system.", 10, 145);
  
    doc.text("Page 2 of 9", 180, 290);
    //Third page
    doc.addPage();
    doc.setFont('helvetica', 'bold');
    doc.text("Wells Related Information:", 10, 10);
    doc.text("8.2. Development wells drilled/completed during Q2 FY 2023-24:", 10, 20);
    
    const data = wells.map((well, index) => [index + 1, well.wellName, well.wellNo, well.rigDetail, well.pmlArea, well.depth, well.dateOfSpudding, well.dateOfHT, well.dateOfRigRelease, well.statusOfWell, well.statusOfConnection]);

    doc.autoTable({
      head: [['Sl no.', 'Well Name', 'Well No.', 'RIG details', 'PML Area', 'Depth', 'Date of Spudding', 'Date of HT', 'Date of Rig Release', 'Status of Well', 'Status of Connection']],
      body: data,
      startY: 30
    });


    //Add Here
    //Fourth Page

    doc.addPage();
    doc.setFont('helvetica', 'bold');

    const paragraph41 = `10.1 Details of wells as on${fourthPageDate} dividing the same into the category of GLV, SRP and normal wells for calculation of abandonment liability.`
    doc.text(doc.splitTextToSize(paragraph41, 180), 10, 10);
    doc.autoTable({
      startY: 20,
      head: [['Category of wells (with NELP)', 'Details']],
      body: [
        ['Normal wells', wellDetails.normalWells],
        ['PCP Pump', wellDetails.pcpPump],
        ['SRP wells', wellDetails.srpWells],
        ['Plunger Lift wells', wellDetails.plungerLiftWells],
        ['Velocity String', wellDetails.velocityString]
      ]
    });

    // Table 10.2
    const paragraph42 = `10.2 Details of all wells for Annual Accounts of FY ${financialYear} which have been abandoned but restoration of the site has not been carried out:`
    doc.text(doc.splitTextToSize(paragraph42, 180), 10, doc.autoTable.previous.finalY + 10);
    doc.autoTable({
      startY: doc.autoTable.previous.finalY + 20,
      head: [['Sl No', 'Well Name', 'Rig', 'Field', 'Status', 'Restoration']],
      body: abandonedWells.map((well, index) => [
        index + 1,
        well.wellName,
        well.rig,
        well.field,
        well.status,
        well.restoration
      ])
    });

    // Section 12: Imprest
    doc.text('12. Imprest, Contingent Advance & Employee advances adjustments:', 10, doc.autoTable.previous.finalY + 10);
    doc.text('i. Imprest:', 10, doc.autoTable.previous.finalY + 20);
    doc.setFont('helvetica', 'normal');
    const paragraph43 = `Sanctioned Imprest Amount for SST is Rs ${fourthPageRs} with FR Nos: AGTSA23013/02 & AGTSA23013/03.`
    doc.text(paragraph43, 10, doc.autoTable.previous.finalY + 30);
    imprestData.forEach((data, index) => {
      doc.text(doc.splitTextToSize(`a. ${data.name}, CPF: ${data.cpf}, used ₹ ${data.amount} from sanctioned imprest of ₹ ${data.sanctioned} against FR No: ${data.frNumber}`,180), 10, doc.autoTable.previous.finalY + 40 + (index * 10));
    });
    doc.setFont('helvetica', 'bold');
    doc.text('ii. Contingent Advance: Nil', 10, doc.autoTable.previous.finalY + 60);
    doc.text('iii. Purchase of petty articles: Nil', 10, doc.autoTable.previous.finalY + 70);

    // Section 12.iv
    
    doc.text('iv. Employee Advance Adjustment:', 10, doc.autoTable.previous.finalY + 80);
    doc.setFont('helvetica', 'normal');

    const paragraph45 = `As per record with SST, no employee advance adjustment submitted as on ${fourthPageDate}.`
    doc.text(paragraph45, 10, doc.autoTable.previous.finalY + 90);

    //Fifth Page
    doc.addPage();
    doc.setFont('helvetica', 'bold');
    doc.text(`Date: ${fifthPageDate1}`, 160, 10);
    const paragraph51 = `Liability Confirmation for the financial year ended ${fifthPageDate2}`
    doc.text(doc.splitTextToSize(paragraph51, 180), 10, 10);
    doc.setFont('helvetica', 'normal');
    const paragraph52 = `A. We would like to confirm that, our Department/Section has created liability in SAP system for all the works executed by our Contractors/Service Providers for the period upto ${fifthPageDate2} and no liability has been left out. The details of liabilities booked through PR/PO route in respect of cases where invoices are not received / not processed for payment is as under:`
    doc.text(doc.splitTextToSize(paragraph52, 180), 10, 20);
    doc.autoTable({
      startX:10,
      startY: 40,
      head: [['Sl No', 'Purchase Order Number', 'Service Entry Sheet Number', 'Period of liability', 'Amount in ₹']],
      body: fifthPagetable1.map((well, index) => [
        index + 1,
        well.PurchaseOrderNumber,
        well.ServiceEntrySheetNumber,
        well.Periodofliability,
        well.AmountinRs
      ])
    });
    const paragraph53 = "B. Further, the details of liabilities to be booked through Direct FI entry, are as under:"
    doc.text(paragraph45, 10,80);
    doc.autoTable({
      startX:10,
      startY: 90,
      head: [['Sl No', 'Particulars', 'Vendor Code', 'Cost Centre/WBS ','FR Number', 'Amount in ₹']],
      body: fifthPagetable2.map((well, index) => [
        index + 1,
        well.Particulars,
        well.VendorCode,
        well.CostCenter,
        well.FRNumber,
        well.AmountinRs
      ])
    });
    const paragraph54 = `C. Also this is to certify that.
1. No SES is pending in respect of expenditure/liability for want of Budget.
2. All consumption of materials such as POL, Stores and Spares etc. up to ${fifthPageDate2} has been
accounted for in the SAP system up to ${fifthPageDate2}.`
doc.text(doc.splitTextToSize(paragraph54, 180), 10, 120);
    // Sixth Page
    doc.addPage();
    doc.setFontSize(12);
    doc.text('Annexure-2', 190, 10, { align: 'right' });
    
    doc.setFontSize(16);
    doc.setFont('Helvetica', 'bold');
    doc.text('Certificate', 105, 20, { align: 'center' });

    doc.setFontSize(14);
    doc.text('OIL AND NATURAL GAS CORPORATION LIMITED', 105, 30, { align: 'center' });
    doc.text('TRIPURA ASSET', 105, 40, { align: 'center' });

    doc.setFontSize(12);
    doc.setFont('Helvetica', 'normal');
    doc.text('SECTION: SUB SURFACE TEAM', 105, 50, { align: 'center' });

    doc.setFontSize(12);
    doc.text('To whomsoever it may concern.', 15, 70);
    doc.text('Certificate of Inventory in Stock/in transit and consumption booking in ICE system.', 15, 80);

    doc.text('It is to certify that:-', 15, 95);

    doc.text(`1. All consumption of inventory up to ${sixthPageDate} has been accounted for in ICE system for the`, 15, 110);
    doc.text(`  period ended ${sixthPageDate}.`, 15, 115);

    doc.text(`2. There is no open STOs pending for goods issue as on ${sixthPageDate}.`, 15, 130);

    doc.text('Signature : ________________', 15, 170);
    doc.text('Name       : ________________', 15, 180);
    doc.text('Designation: ________________', 15, 190);

    doc.text('Date: _______________', 15, 210);

    doc.setFontSize(10);
    doc.text('(*for some of the storage locations of AGT see indicative list over leaf)', 15, 225);

    //Seveth Page
    doc.addPage();
    const paragraph71 = `Development Wells details (Info required for Annual Accounts FY ${sevethPageFy})`
    doc.text(doc.splitTextToSize(paragraph71, 180), 10, 10);
    const data2 = wells2.map((well, index) => [index + 1, well.wellName, well.wellNo, well.rigDetail, well.pmlArea, well.depth, well.dateOfSpudding, well.dateOfHT, well.dateOfRigRelease, well.statusOfWell, well.statusOfConnection]);

    doc.autoTable({
      head: [['Sl no.', 'Well Name', 'Well No.', 'RIG details', 'PML Area', 'Depth', 'Date of Spudding', 'Date of HT', 'Date of Rig Release', 'Status of Well', 'Status of Connection']],
      body: data2,
      startY: 30
    });

    doc.save('output.pdf');
  };

  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    const newData = [...imprestData];
    newData[index][name] = value;
    setImprestData(newData);
  };
  
  return (
    <div className="container">
      <div className="section">
        <h3>No. AGT/SST/F&A/CA/Q2 Accounts /FY
          <input
            type="text"
            value={financialYear}
            onChange={(e) => setFinancialYear(e.target.value)}
            style={{ width: '100px', marginLeft: '10px' }}
          />              
          Date: 
          <input
            type="text"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            style={{ width: '100px', marginLeft: '10px' }}
          />
        </h3>
        <hr />
      </div>
      <div className="section">
        <h3>From: CGM (Res.)- Sub Surface Manager, ONGC, Tripura Asset, Agartala</h3>
        <hr />
      </div>
      <div className="section">
        <h3>To : I/c Finance, ONGC, Tripura Asset, Agartala</h3>
        <hr />
      </div>
      <div className="section">
        <h3>Sub: Information for finalization of Q2 Accounts ending 
          <input
            type="text"
            value={quarterEndDate}
            onChange={(e) => setQuarterEndDate(e.target.value)}
            style={{ width: '150px', marginLeft: '10px' }}
          />
        </h3>
        <hr />
      </div>
      <div className="section">
        <p>This is in reference to Letter No. AGT/F&A/CA/ H1 Accounts /FY 
          <input
            type="text"
            value={financialYear}
            onChange={(e) => setFinancialYear(e.target.value)}
            style={{ width: '80px', marginLeft: '10px' }}
          /> 
          dated 
          <input
            type="text"
            value={letterDate}
            onChange={(e) => setLetterDate(e.target.value)}
            style={{ width: '100px', marginLeft: '10px' }}
          /> 
          on the subject mentioned above.
        </p>
        <p>Information for Annual Accounts ending 
          <input
            type="text"
            value={quarterEndDate}
            onChange={(e) => setQuarterEndDate(e.target.value)}
            style={{ width: '100px', marginLeft: '10px' }}
          />
          for the Financial Year 
          <input
            type="text"
            value={financialYear}
            onChange={(e) => setFinancialYear(e.target.value)}
            style={{ width: '100px', marginLeft: '10px' }}
          /> 
          and the desired information pertaining to SST, Tripura Asset, Agartala is enclosed herewith.
        </p>
      </div>
      <div className="section" style={{ textAlign: 'center' }}>
        <p>(XYZ)</p>
        <p>CGM (Res.)</p>
        <p>Sub Surface Manager</p>
      </div>
      <div className="section">
        <h3>3. Creation of all liabilities and confirmation thereof</h3>
        <h4>3.1. a) Services & works routed through PR/PO route :</h4>
        <p>Service entry sheet till 
          <input
            type="text"
            value={serviceEntryEndDate}
            onChange={(e) => setServiceEntryEndDate(e.target.value)}
            style={{ width: '100px', marginLeft: '10px' }}
          />
          created in SAP and released at all levels. The estimated bill for the contract Hiring of Unskilled Manpower for Reservoir field services (PO No. 
          <input
            type="text"
            value={poNumber}
            onChange={(e) => setPoNumber(e.target.value)}
            style={{ width: '150px', marginLeft: '10px' }}
          />) is ₹ 
          <input
            type="text"
            value={estimatedBill}
            onChange={(e) => setEstimatedBill(e.target.value)}
            style={{ width: '100px', marginLeft: '10px' }}
          /> for the period 
          <input
            type="text"
            value={serviceEntryStartDate}
            onChange={(e) => setServiceEntryStartDate(e.target.value)}
            style={{ width: '100px', marginLeft: '10px' }}
          /> to 
          <input
            type="text"
            value={serviceEntryEndDate}
            onChange={(e) => setServiceEntryEndDate(e.target.value)}
            style={{ width: '100px', marginLeft: '10px' }}
          />.
        </p>
        <p>Service entry sheet till 
          <input
            type="text"
            value={mluServiceEndDate}
            onChange={(e) => setMluServiceEndDate(e.target.value)}
            style={{ width: '100px', marginLeft: '10px' }}
          /> towards Hiring of MLU Services has been created in SAP and released at all levels (PO No. 
          <input
            type="text"
            value={mluPoNumber}
            onChange={(e) => setMluPoNumber(e.target.value)}
            style={{ width: '150px', marginLeft: '10px' }}
          />). The estimated bill for the period 
          <input
            type="text"
            value={mluServiceStartDate}
            onChange={(e) => setMluServiceStartDate(e.target.value)}
            style={{ width: '100px', marginLeft: '10px' }}
          /> to 
          <input
            type="text"
            value={mluServiceEndDate}
            onChange={(e) => setMluServiceEndDate(e.target.value)}
            style={{ width: '100px', marginLeft: '10px' }}
          /> is Rs. 
          <input
            type="text"
            value={mluEstimatedBill}
            onChange={(e) => setMluEstimatedBill(e.target.value)}
            style={{ width: '100px', marginLeft: '10px' }}
          />.
        </p>
        <p>PR/PO has been created towards GeM based procurement of batteries (32 No.) for 15KVA UPS (PR No. 
          <input
            type="text"
            value={gemPoNumber}
            onChange={(e) => setGemPoNumber(e.target.value)}
            style={{ width: '150px', marginLeft: '10px' }}
          />, PO No. 4075015561) Amounting to Rs. 
          <input
            type="text"
            value={gemEstimatedBill}
            onChange={(e) => setGemEstimatedBill(e.target.value)}
            style={{ width: '100px', marginLeft: '10px' }}
          /> for the period 
          <input
            type="text"
            value={gemStartDate}
            onChange={(e) => setGemStartDate(e.target.value)}
            style={{ width: '100px', marginLeft: '10px' }}
          /> to 
          <input
            type="text"
            value={gemEndDate}
            onChange={(e) => setGemEndDate(e.target.value)}
            style={{ width: '100px', marginLeft: '10px' }}
          />.
        </p>
        <h4>b) Cases (other than services & works) processes to be booked through direct FI entry:</h4>
        <p>Invoice amounting to Rs. 
          <input
            type="text"
            value={invoiceAmount}
            onChange={(e) => setInvoiceAmount(e.target.value)}
            style={{ width: '100px', marginLeft: '10px' }}
          /> toward Books/Periodicals has been processed in VIMS_dashboard against FR No. 
          <input
            type="text"
            value={frNumber}
            onChange={(e) => setFrNumber(e.target.value)}
            style={{ width: '150px', marginLeft: '10px' }}
          /> for the period 
          <input
            type="text"
            value={invoiceStartDate}
            onChange={(e) => setInvoiceStartDate(e.target.value)}
            style={{ width: '100px', marginLeft: '10px' }}
          /> to 
          <input
            type="text"
            value={invoiceEndDate}
            onChange={(e) => setInvoiceEndDate(e.target.value)}
            style={{ width: '100px', marginLeft: '10px' }}
          />.
        </p>
        <p>3.2 Confirmation as per the format to the effect that all liabilities have been accounted for and nothing has been left out is provided as Annexure-1.</p>
        <h3>6. Material Accounting</h3>
        <h4>6.1. Booking of Material Consumption:</h4>
        <p>Material consumption data up to 
          <input
            type="text"
            value={quarterEndDate}
            onChange={(e) => setQuarterEndDate(e.target.value)}
            style={{ width: '100px', marginLeft: '10px' }}
          /> is already updated and booked in the ICE (SAP) system.
        </p>
        <div>
          <h2>Third Page</h2>
          <table>
            <thead>
              <tr>
                <th>S No.</th>
                <th>Well Name</th>
                <th>Well No.</th>
                <th>RIG Detail</th>
                <th>PML Area</th>
                <th>Depth</th>
                <th>Date of Spudding</th>
                <th>Date of HT</th>
                <th>Date of Rig Release</th>
                <th>Status of Well</th>
                <th>Status of Connection</th>
              </tr>
            </thead>
            <tbody>
              {wells.map((well, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>
                    <select value={well.wellName} onChange={e => handleWellChange(index, 'wellName', e.target.value)}>
                    <option  value="GJLA-16" selected>GJLA-16</option>
                    <option value="BRMR-12">BRMR-12</option>
                    </select>
                  </td>
                  <td><input type="text" value={well.wellNo} onChange={e => handleWellChange(index, 'wellNo', e.target.value)} /></td>
                  <td><input type="text" value={well.rigDetail} onChange={e => handleWellChange(index, 'rigDetail', e.target.value)} /></td>
                  <td><input type="text" value={well.pmlArea} onChange={e => handleWellChange(index, 'pmlArea', e.target.value)} /></td>
                  <td><input type="text" value={well.depth} onChange={e => handleWellChange(index, 'depth', e.target.value)} /></td>
                  <td><input type="text" value={well.dateOfSpudding} onChange={e => handleWellChange(index, 'dateOfSpudding', e.target.value)} /></td>
                  <td><input type="text" value={well.dateOfHT} onChange={e => handleWellChange(index, 'dateOfHT', e.target.value)} /></td>
                  <td><input type="text" value={well.dateOfRigRelease} onChange={e => handleWellChange(index, 'dateOfRigRelease', e.target.value)} /></td>
                  <td><input type="text" value={well.statusOfWell} onChange={e => handleWellChange(index, 'statusOfWell', e.target.value)} /></td>
                  <td><input type="text" value={well.statusOfConnection} onChange={e => handleWellChange(index, 'statusOfConnection', e.target.value)} /></td>
                </tr>
              ))}
            </tbody>
          </table>
          <button onClick={addWellRow}>Add Well</button>
          <button onClick={deleteLastRow}>Delete Last Row</button>
        </div>
        {/* Fourth Page */}
        <h2>Fourth Page</h2>
        <div>
        <label>10.1. Details of wells as on <input type="text" value={fourthPageDate} onChange={(e) => setfourthPageDate(e.target.value)} /></label>dividing the same into the category of GLV, SRP and
normal wells for calculation of abandonment liability.
        <br></br>
        <h2>Details of Wells</h2>
      <table>
        <thead>
          <tr>
            <th>Category of wells (with NELP)</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Normal wells</td>
            <td>
              <textarea
                value={wellDetails.normalWells}
                onChange={(e) => handleWellDetailsChange('normalWells', e.target.value)}
              />
            </td>
          </tr>
          <tr>
            <td>PCP Pump</td>
            <td>
              <textarea
                value={wellDetails.pcpPump}
                onChange={(e) => handleWellDetailsChange('pcpPump', e.target.value)}
              />
            </td>
          </tr>
          <tr>
            <td>SRP wells</td>
            <td>
              <textarea
                value={wellDetails.srpWells}
                onChange={(e) => handleWellDetailsChange('srpWells', e.target.value)}
              />
            </td>
          </tr>
          <tr>
            <td>Plunger Lift wells</td>
            <td>
              <textarea
                value={wellDetails.plungerLiftWells}
                onChange={(e) => handleWellDetailsChange('plungerLiftWells', e.target.value)}
              />
            </td>
          </tr>
          <tr>
            <td>Velocity String</td>
            <td>
              <textarea
                value={wellDetails.velocityString}
                onChange={(e) => handleWellDetailsChange('velocityString', e.target.value)}
              />
            </td>
          </tr>
        </tbody>
      </table>
       <br></br>


<label>10.2 Details of all wells for Annual Accounts of FY <input type="text" value={financialYear} onChange={(e) => setFinancialYear(e.target.value)} /></label>which have been abandoned but
restoration of the site has not been carried out:
<br></br>
<h2>Abandoned Wells</h2>
      <table>
        <thead>
          <tr>
            <th>Sl No</th>
            <th>Well Name</th>
            <th>Rig</th>
            <th>Field</th>
            <th>Status</th>
            <th>Restoration</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {abandonedWells.map((well, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>
                <input
                  type="text"
                  value={well.wellName}
                  onChange={(e) => handleAbandonedWellChange(index, 'wellName', e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={well.rig}
                  onChange={(e) => handleAbandonedWellChange(index, 'rig', e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={well.field}
                  onChange={(e) => handleAbandonedWellChange(index, 'field', e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={well.status}
                  onChange={(e) => handleAbandonedWellChange(index, 'status', e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={well.restoration}
                  onChange={(e) => handleAbandonedWellChange(index, 'restoration', e.target.value)}
                />
              </td>
              <td>
                <button onClick={() => handleRemoveAbandonedWellRow(index)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={handleAddAbandonedWellRow}>Add Row</button>
      <br></br>
      <h3>12. Imprest, Contingent Advance & Employee advances adjustments:</h3>
      <div>
      <label><b><b>i. Imprest :</b> Sanctioned Imprest Amount for SST is Rs </b><input type="text" value={fourthPageRs} onChange={(e) => setfourthPageRs(e.target.value)} /></label>with FR Nos: AGTSA23013/02 &
      AGTSA23013/03
      {imprestData.map((item, index) => (
        <div key={index}>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={item.name}
              onChange={(e) => handleInputChange(index, e)}
            />
          </label>
          <br />
          <label>
            CPF:
            <input
              type="text"
              name="cpf"
              value={item.cpf}
              onChange={(e) => handleInputChange(index, e)}
            />
          </label>
          <br />
          <label>
            Amount:
            <input
              type="text"
              name="amount"
              value={item.amount}
              onChange={(e) => handleInputChange(index, e)}
            />
          </label>
          <br />
          <label>
            Sanctioned:
            <input
              type="text"
              name="sanctioned"
              value={item.sanctioned}
              onChange={(e) => handleInputChange(index, e)}
            />
          </label>
          <br />
          <label>
            FR Number:
            <input
              type="text"
              name="frNumber"
              value={item.frNumber}
              onChange={(e) => handleInputChange(index, e)}
            />
          </label>
          <hr />
        </div>
      ))}
    </div>
    <br></br>
    <b>ii.Contingent Advance:</b> Nil
    <br></br>
    <b>iii. Purchase of petty articles:</b> Nil
    <br></br>
    <label><b>iv.As per record with SST, no employee advance adjustment
submitted as on </b><input type="text" value={fourthPageDate} onChange={(e) => setfourthPageDate(e.target.value)} /></label>

      {/* Fifth Page */}
        <h4 style={{display:"flex",justifyContent:"flex-end"}}>Date: <label><input type="text" value={fifthPageDate1} onChange={(e) => setfifthPageDate1(e.target.value)} /></label></h4>

       <h3 style={{textAlign:"center"}}>Liability Confirmation for the financial year ended <label><input type="text" value={fifthPageDate2} onChange={(e) => setfifthPageDate2(e.target.value)} /></label>
       </h3>
        <p >A. We would like to confirm that, our Department/Section has created liability in SAP system for all the works executed by our Contractors/Service Providers for the period upto  <label><input type="text" value={fifthPageDate2} onChange={(e) => setfifthPageDate2(e.target.value)} /></label> and no
liability has been left out. The details of liabilities booked through PR/PO route in respect of
cases where invoices are not received / not processed for payment is as under:</p>
      </div>
      <table>
        <thead>
          <tr>
            <th>Sl No</th>
            <th>Purchase Order Number</th>
            <th>Service Entry Sheet Number</th>
            <th>Period of
            liability</th>
            <th>Amount in ₹</th>
          </tr>
        </thead>
        <tbody>
          {fifthPagetable1.map((well, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>
                <input
                  type="text"
                  value={well.PurchaseOrderNumber}
                  onChange={(e) => handlefifthPageTable1Change(index, 'PurchaseOrderNumber', e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={well.ServiceEntrySheetNumber}
                  onChange={(e) => handlefifthPageTable1Change(index, 'ServiceEntrySheetNumber', e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={well.Periodofliability}
                  onChange={(e) => handlefifthPageTable1Change(index, 'Periodofliability', e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={well.AmountinRs}
                  onChange={(e) => handlefifthPageTable1Change(index, 'AmountinRs', e.target.value)}
                />
              </td>
              <td>
                <button onClick={() => handlefifthPageTable1Remove(index)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={handlefifthPageTable1Add}>Add Row</button>
      <br></br>
       <p>B. Further, the details of liabilities to be booked through Direct FI entry, are as under:</p>
       <table>
        <thead>
          <tr>
            <th>Sl No</th>
            <th>Particulars</th>
            <th>Vendor
            Code</th>
            <th>Cost Centre/WBS</th>
            <th>FR Number</th>
            <th>Amount in ₹</th>
          </tr>
        </thead>
        <tbody>
          {fifthPagetable2.map((well, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>
                <input
                  type="text"
                  value={well.Particulars}
                  onChange={(e) => handlefifthPageTable2Change(index, 'Particulars', e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={well.VendorCode}
                  onChange={(e) => handlefifthPageTable2Change(index, 'VendorCode', e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={well.CostCenter}
                  onChange={(e) => handlefifthPageTable2Change(index, 'CostCenter', e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={well.FRNumber}
                  onChange={(e) => handlefifthPageTable2Change(index, 'FRNumber', e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={well.AmountinRs}
                  onChange={(e) => handlefifthPageTable2Change(index, 'AmountinRs', e.target.value)}
                />
              </td>
              <td>
                <button onClick={() => handlefifthPageTable2Remove(index)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={handlefifthPageTable2Add}>Add Row</button>
      <br></br>
      <p>
      C. Also this is to certify that.
1. No SES is pending in respect of expenditure/liability for want of Budget.
2. All consumption of materials such as POL, Stores and Spares etc. up to <label><input type="text" value={fifthPageDate2} onChange={(e) => setfifthPageDate1(e.target.value)} /></label> has been
accounted for in the SAP system up to <label><input type="text" value={fifthPageDate2} onChange={(e) => setfifthPageDate1(e.target.value)} /></label>.
      </p>
         {/* Sixth Page */}
         <h4 style={{textDecoration:'underline',textAlign:'center'}}>certificate</h4>
         <h3 style={{textAlign:'center'}}>OIL AND NATURAL GAS CORPORATION LIMITED
         TRIPURA ASSET</h3>
         <h3 style={{textAlign:'center'}}>SECTION: SUB SURFACE TEAM</h3>
         <p style={{textAlign:'center'}}>To whomsoever it may concern</p>
         <p style={{textAlign:'center'}}>Certificate of Inventory in Stock/in transit and consumption booking in ICE system.
         </p>
         <p>It is to certify that:-
         </p>
         <p>1. All consumption of inventory up to <label><input type="text" value={sixthPageDate} onChange={(e) => setsixthPageDate(e.target.value)} /></label> has been accounted for in ICE system for the
         period ended <label><input type="text" value={sixthPageDate} onChange={(e) => setsixthPageDate(e.target.value)} /></label></p>
         <p>2. There is no open STOs pending for goods issue as on <label><input type="text" value={sixthPageDate} onChange={(e) => setsixthPageDate(e.target.value)} /></label></p>
         <p style={{textAlign:'right',paddingRight:'100px'}}>signature:__________________</p>
         <p style={{textAlign:'right',paddingRight:'100px'}}>Name:________________________</p>
         <p style={{textAlign:'right',paddingRight:'100px'}}>Designation:__________________</p>
         <p>Date:____________</p>
         <p>(*for some of the storage locations of AGT see indicative list over leaf)</p>

         {/* seventh Page */}
         <h4 style={{textAlign:'center'}}>Development Wells details (Info required for Annual Accounts FY <label><input type="text" value={sevethPageFy} onChange={(e) => setsevethPageFy(e.target.value)} /></label> )</h4>
         <table>
            <thead>
              <tr>
                <th>S No.</th>
                <th>Well Name</th>
                <th>Well No.</th>
                <th>RIG Detail</th>
                <th>PML Area</th>
                <th>Depth</th>
                <th>Date of Spudding</th>
                <th>Date of HT</th>
                <th>Date of Rig Release</th>
                <th>Status of Well</th>
                <th>Status of Connection</th>
              </tr>
            </thead>
            <tbody>
              {wells2.map((well, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>
                    <select value={well.wellName} onChange={e => handleWellChange2(index, 'wellName', e.target.value)}>
                      <option  value="GJLA-16" selected>GJLA-16</option>
                      <option value="BRMR-12">BRMR-12</option>
                    </select>
                  </td>
                  <td><input type="text" value={well.wellNo} onChange={e => handleWellChange2(index, 'wellNo', e.target.value)} /></td>
                  <td><input type="text" value={well.rigDetail} onChange={e => handleWellChange2(index, 'rigDetail', e.target.value)} /></td>
                  <td><input type="text" value={well.pmlArea} onChange={e => handleWellChange2(index, 'pmlArea', e.target.value)} /></td>
                  <td><input type="text" value={well.depth} onChange={e => handleWellChange2(index, 'depth', e.target.value)} /></td>
                  <td><input type="text" value={well.dateOfSpudding} onChange={e => handleWellChange2(index, 'dateOfSpudding', e.target.value)} /></td>
                  <td><input type="text" value={well.dateOfHT} onChange={e => handleWellChange2(index, 'dateOfHT', e.target.value)} /></td>
                  <td><input type="text" value={well.dateOfRigRelease} onChange={e => handleWellChange2(index, 'dateOfRigRelease', e.target.value)} /></td>
                  <td><input type="text" value={well.statusOfWell} onChange={e => handleWellChange2(index, 'statusOfWell', e.target.value)} /></td>
                  <td><input type="text" value={well.statusOfConnection} onChange={e => handleWellChange2(index, 'statusOfConnection', e.target.value)} /></td>
                </tr>
              ))}
            </tbody>
          </table>
          <button onClick={addWellRow2}>Add Well</button>
          <button onClick={deleteLastRow2}>Delete Last Row</button>
          <br />
          <br />
        <button onClick={generatePDF}>Generate PDF</button>
      </div>
    </div>
  );
}

export default App;
