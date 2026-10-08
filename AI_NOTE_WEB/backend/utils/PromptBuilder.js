// export const buildPrompt = ({
//   topic,
//   classLevel,
//   examType,
//   revisionMode,
//   includeDiagram,
//   includeChart
// }) => {
//   return `
//   You are a STRICT JSON generator for an exam preparation system.

//   VERY IMPORTANT:
//   - Output MUST be valid JSON
//   - Your response will be parsed using JSON.parse()
//   - INVALID JSON will cause system failure
//   - Use ONLY double quotes "
//   - NO comments, NO trailing commas
//   - Escape line breaks useing \\n
//   - Do NOT use emojis inside text values

//   TASK: 
//   Convert the give topic into exam-focused notes.

//   Topic: ${topic}
//   Classs Level: ${classLevel || "Not specified"}
//   Exam Type: ${examType || "General"}
//   Revision Mode: ${revisionMode ? "ON" : "OFF"}
//   Include Diagram: ${includeDiagram ? "YES" : "NO"}
//   Include Charts: ${includeChart ? "YES" : "NO"}

//   GLOBAL CONTENT RULES:
//   - Use clear, simple, exam-oriented language
//   - Notes MUST be Markdown formatted
//   - Heading and bullet points only

//   REVISION MODE RULES (CRITICAL):
//   - If REVISION MODE is ON:
//     - Notes must be VERY SHORT
//     - Only bullet points
//     - One-line answers only
//     - definitions, formulas, keywords
//     - No paragraphs
//     - No explanations
//     - Content must feel like
//       - last-day revision
//       - 5-minute exam cheat sheet
//     - revisionpoints MUST summarize ALL important facts

//   If REVISION MODE is OFF:
//     - Notes must be DETATILED but exam-focused
//     - Each topic should include:
//       - definition
//       - short explanation
//       - examples (if applicable)
//     - Paragraph length: max 2-4 lines
//     - no storytelling, no extra theory

//   IMPORTANCE RULES:
//   - Divide sub-topics into THREE categories:
//     - ⭐ Very Important Topics
//     - ⭐⭐ Important Topics
//     - ⭐⭐⭐ Frequently Asked Topics
//   - All three categories MUST be present
//   - Base importance on exaam frequency and weightage

//   DIAGRAM RULES:
//   - If INCLUDE DIAGRAM is YES:
//     - diagram.data MUST be a SINGLE STRING
//     - Valid Mermaid syntax only
//     - Must start with: graph TD
//     - Wrap EVERY node label in square brackets [ ]
//     - Do NOT use special characters inside labels
//   - If INCLUDE DIAGRAM is NO:
//     - diagram.data MUST be ""

//   CHART RULES (RECHARTS):
//   - if INCLUDE CHARTS is YES:
//     - charts array MUST NOT be empty
//     - Generate at least ONE chart
//     - Choose chart based on topic type:
//       - THEORY topic -> bar or pie (importance / weightage)
//       - PROCESS topic -> bar or line (steps / stages)
//     - Use numerice values ONLY
//     - Labels must be short and exam-oriented
//   - If INCLUDE CHARTS is NO:
//     - charts MUST be []

//   CHART TYPES ALLOWED:
//   - bar
//   - line
//   - pie

//   CHART OBJECT FORMAT:
//   {
//     "type" : "bar | line | pie",
//     "title" : "string",
//     "data": [
//       {"name": "string", "value": 10}
//     ]
//   }

//   STRICT JSON FORMAT (DO NOT CHANGE):

//   {
//     "subTopics": {
//       "⭐" : [],
//       "⭐⭐": [],
//       "⭐⭐⭐": []
//     },
//     "importance" : "⭐ | ⭐⭐ | ⭐⭐⭐",
//     "notes": "string",
//     "revisionPoints": [],
//     "questions": {
//       "short": [],
//       "long" : [],
//       "diagram" : ""
//     },
//     "diagram" : {
//     "type": "flowchart | graph | process",
//     },
//     "charts": []
//   }

//   RETURN ONLY VALID JSON.
//   `;
// }


export const buildPrompt = ({
  topic,
  classLevel,
  examType,
  revisionMode,
  includeDiagram,
  includeChart
}) => {
  return `
  You are a STRICT JSON generator for an exam preparation system.

  CRITICAL REQUIREMENTS:
  - Respond WITH PURE VALID JSON ONLY.
  - DO NOT wrap response in markdown (\`\`\`json).
  - Use double quotes " for keys and string values.
  - Properly escape quotes and newlines inside JSON strings (e.g. \\n).

  TASK: 
  Convert the given topic into exam-focused notes.

  Topic: ${topic}
  Class Level: ${classLevel || "Not specified"}
  Exam Type: ${examType || "General"}
  Revision Mode: ${revisionMode ? "ON" : "OFF"}
  Include Diagram: ${includeDiagram ? "YES" : "NO"}
  Include Charts: ${includeChart ? "YES" : "NO"}

  GLOBAL CONTENT RULES:
  - Clear, simple, exam-oriented language
  - Markdown formatted inside "notes" field (headings and bullets)

  REVISION MODE RULES:
  - If REVISION MODE is ON:
    - Notes must be VERY SHORT, bullet points, one-line answers, definitions, formulas.
    - No paragraphs, no explanations.
    - revisionPoints MUST summarize all key facts.
  - If REVISION MODE is OFF:
    - Detailed exam-focused notes. Max 2-4 lines per paragraph.

  IMPORTANCE RULES:
  - Divide sub-topics into THREE categories:
    - "⭐": Very Important Topics
    - "⭐⭐": Important Topics
    - "⭐⭐⭐": Frequently Asked Topics

  DIAGRAM RULES:
  - If INCLUDE DIAGRAM is YES:
    - diagram.data MUST be a valid Mermaid TD string starting with "graph TD". Wrap labels in square brackets.
  - If INCLUDE DIAGRAM is NO:
    - diagram.data MUST be ""

  CHART RULES:
  - If INCLUDE CHARTS is YES:
    - charts array MUST contain at least one chart object with type ("bar", "line", or "pie"), title, and data array with objects having "name" and numeric "value".
  - If INCLUDE CHARTS is NO:
    - charts MUST be []

  STRICT OUTPUT JSON STRUCTURE (Must match exactly):
  {
    "subTopics": {
      "⭐": [],
      "⭐⭐": [],
      "⭐⭐⭐": []
    },
    "importance": "⭐",
    "notes": "string content",
    "revisionPoints": [],
    "questions": {
      "short": [],
      "long": []
    },
    "diagram": {
      "type": "flowchart",
      "data": ""
    },
    "charts": []
  }
  `;
};