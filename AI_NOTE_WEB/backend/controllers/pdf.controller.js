import PDFDocument from "pdfkit";

export const pdfDownload = async (req, res) => {
  try {
    const { result } = req.body;

    if (!result) {
      return res.status(400).json({ error: "No content provided" });
    }

    const doc = new PDFDocument({ margin: 50 });

    // Set headers
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", 'attachment; filename="ExamNotesAI.pdf"');

    // Handle stream error to prevent server crash
    doc.on("error", (err) => {
      console.error("PDFKit Stream Error:", err);
      if (!res.headersSent) {
        res.status(500).send("Error generating PDF");
      }
    });

    // Pipe response stream
    doc.pipe(res);

    // Title
    doc.fontSize(20).text("ExamNotes AI", { align: "center" });
    doc.moveDown();
    
    if (result.importance) {
      doc.fontSize(14).text(`Importance: ${result.importance}`);
      doc.moveDown();
    }

    // Sub Topics
    if (result.subTopics) {
      doc.fontSize(16).text("Sub Topics");
      doc.moveDown(0.5);
      
      // ✅ FIX 1: Corrected 'startTransition' variable reference instead of undefined 'star'
      Object.entries(result.subTopics).forEach(([startTransition, topics]) => {
        doc.moveDown(0.5);
        doc.fontSize(13).text(`${startTransition} Topics:`);

        if (Array.isArray(topics)) {
          topics.forEach((t) => {
            doc.fontSize(12).text(`• ${t}`);
          });
        }
      });
      doc.moveDown();
    }

    // Notes
    if (result.notes) {
      doc.fontSize(16).text("Notes");
      doc.moveDown(0.5);
      doc.fontSize(12).text(result.notes.replace(/[#*]/g, ""));
      doc.moveDown();
    }

    // Revision Points
    if (Array.isArray(result.revisionPoints)) {
      doc.fontSize(16).text("Revision Points");
      doc.moveDown(0.5);
      result.revisionPoints.forEach((p) => {
        doc.fontSize(12).text(`• ${p}`);
      });
      doc.moveDown();
    }

    // Questions
    if (result.questions) {
      doc.fontSize(16).text("Important Questions");
      doc.moveDown(0.5);

      if (Array.isArray(result.questions.short)) {
        doc.fontSize(13).text("Short Questions:");
        result.questions.short.forEach((q) => {
          doc.fontSize(12).text(`• ${q}`);
        });
        doc.moveDown(0.5);
      }

      if (Array.isArray(result.questions.long)) {
        doc.fontSize(13).text("Long Questions:");
        result.questions.long.forEach((q) => {
          doc.fontSize(12).text(`• ${q}`);
        });
        doc.moveDown(0.5);
      }

      if (result.questions.diagram) {
        doc.fontSize(13).text("Diagram Question:");
        doc.fontSize(12).text(result.questions.diagram);
      }
    }

    // End and finalize PDF stream
    doc.end();

  } catch (error) {
    console.error("PDF Generation Controller Error:", error);
    if (!res.headersSent) {
      res.status(500).json({ error: "Failed to generate PDF" });
    }
  }
};


// import PDFDocument from "pdfkit"


// export const pdfDownload = async(req, res) => {
  
//     const {result} = req.body 


//     if(!result) {
//       return res.status(400).json({error: "No content provided"})
//     }

//     const doc =  new PDFDocument({margin: 50})

//     res.setHeader("Content-Type", "application/pdf")
//     res.setHeader("Content-Disposition", 'attachment; filename="ExamNotesAI.pdf"')

//     doc.pipe(res)


//     // Title
//     doc.fontSize(20).text("ExamNotes AI", { align: "center" });
//     doc.moveDown();
//     doc.fontSize(14).text(`Importance: ${result.importance}`);
//     doc.moveDown();


//     // sub topics
//     doc.fontSize(16).text("Sub Topics");
//     doc.moveDown(0.5);
//     Object.entries(result.subTopics).forEach(([startTransition, topics]) => {
//       doc.moveDown(0.5);
//       doc.fontSize(13).text(`${star} Topics:`);

//       topics.forEach((t) => {
//         doc.fontSize(12).text(`• ${t}`);
//       });
//     });


//     doc.moveDown();


//     // notes
//     doc.fontSize(16).text("Notes");
//     doc.moveDown(0.5);
//     doc.fontSize(12).text(result.notes.replace(/[#*]/g, ""));

//     doc.moveDown();


//     // revision points
//     doc.fontSize(16).text("Revision Points");
//     doc.moveDown(0.5);
//     result.revisionPoints.forEach((p) => {
//       doc.fontSize(12).text(`• ${p}`);
//     })


//     doc.moveDown();

//     // questions
//     doc.fontSize(16).text("Important Question");
//     doc.moveDown(0.5);

//     doc.fontSize(13).text("Short Questions:");
//     result.questions.short.forEach((q) => {
//       doc.fontSize(12).text(`• ${q}`)
//     });


//     doc.moveDown(0.5);
//     doc.fontSize(13).text("Long Questions:");
//     result.questions.long.forEach((q) => {
//       doc.fontSize(12).text(`• ${q}`);
//     });

//     doc.moveDown(0.5);
//     doc.fontSize(13).text("Diagram Question:");
//     doc.fontSize(12).text(result.questions.diagram);


//     doc.end();


  
// }