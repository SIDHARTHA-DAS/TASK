import { useEffect, useRef } from "react"
import mermaid from 'mermaid'

// initialize mermaid for all charts 
mermaid.initialize({
  startOnLoad: false,
  theme: "default"
})


//  function for show the diagram 
const cleanMermaidChart = (diagram) =>{
  if (!diagram) return "";

  let clean = diagram
    .replace(/\r\n/g, "\n")
    .trim();


    if(!clean.trim().startsWith("graph")){
      clean = `graph TD\n${clean}`;
    }

    return clean;
};

// function for fix the all nodes in diagram 
const autoFixNodes = (diagram) => {
  let index = 0;
  const used = new Map();

  return diagram.replace(/\[(.*?)\]/g, (match, label)=>{

    const key = label.trim();

    if(used.has(key)) {
      return used.get(key);
    }

    index++;
    const id =  `N${index}`;
    const node = `${id}["${key}"]`;


    used.set(key, node);
    return node;
  })
}


// function to show the diagram in ui perfectly
const MermaidSetup = ({diagram}) => {

  const containerRef = useRef(null)

  useEffect(() => {
  
    if(!diagram || !containerRef.current) return;

    const renderDiagram = async () => {
      try {
        containerRef.current.innerHTML = "";

        const uniqueId = `mermaid-${Math.random().toString(36).substring(2, 9)}`;

        // sanitize before render
        const safeChart = autoFixNodes(cleanMermaidChart(diagram));

        const {svg} = await mermaid.render(uniqueId, safeChart);
        containerRef.current.innerHTML = svg;
      } catch (error) {
        console.error("Mermaid render faild:", error)
      }
    }
  
  renderDiagram();
  }, [diagram])
  

  return (
    <div className="bg-white border rounded-lg p-4 overflow-x-auto">
      <div ref={containerRef}/>
    </div>
  )
}

export default MermaidSetup
