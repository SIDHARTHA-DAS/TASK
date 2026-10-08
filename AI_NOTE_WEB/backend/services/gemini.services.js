

  // const Gemini_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent"


  // export const generateGeminiResponse = async (prompt) =>{


  //   try {
  //     const response = await fetch(`${Gemini_URL}?key=${process.env.GEMINI_API_KEY}`,{method:"POST", 
  //     headers: {
  //       "Content-Type" : "application/json"
  //     },
  //     body: JSON.stringify({
  //       contents: [
  //         {
  //           parts: [
  //             {
  //               text: prompt
  //             }
  //           ]
  //         }
  //       ]
  //     })
  //   })

  //   if(!response.ok){
  //     const err = await response.text();
  //     throw new Error(err);
  //   }

  //   const data = await response.json()

  //   const text = data.candidates?.[0]?.content?.parts?.[0]?.text;

  //   if(!text){
  //     throw new Error("No text returned from Gemini");
  //   }

  //   const cleanText = text
  //     .replace(/```json/g, "")
  //     .replace(/```/g, "")
  //     .trim();

  //     return JSON.parse(cleanText)
  //   } catch (error) {
  //     console.log("Gemini fetch error:", error.message);
  //     throw new Error("Gemini API fetch failed");
  //   }
    
  // }




const GEMINI_MODELS = [
  "gemini-3.8-flash",
  "gemini-3.7-flash",
  "gemini-3.5-flash-lite",
];

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const generateWithModel = async (model, prompt) => {
  const GEMINI_URL =
    `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`;

  const response = await fetch(GEMINI_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-goog-api-key": process.env.GEMINI_API_KEY,
    },
    body: JSON.stringify({
      contents: [
        {
          parts: [
            {
              text: prompt,
            },
          ],
        },
      ],
    }),
  });

  const data = await response.json();

  return {
    response,
    data,
  };
};

export const generateGeminiResponse = async (prompt) => {
  try {
    if (!process.env.GEMINI_API_KEY) {
      throw new Error("GEMINI_API_KEY is missing in .env");
    }

    if (!prompt || typeof prompt !== "string") {
      throw new Error("Prompt is required");
    }

    let lastError = null;

    // Try different Gemini models
    for (const model of GEMINI_MODELS) {
      console.log(`Trying Gemini model: ${model}`);

      // Retry same model up to 3 times
      for (let attempt = 1; attempt <= 3; attempt++) {
        try {
          const { response, data } = await generateWithModel(
            model,
            prompt
          );

          // Successful response
          if (response.ok) {
            const text = data?.candidates?.[0]?.content?.parts
              ?.map((part) => part?.text || "")
              .join("")
              .trim();

            if (!text) {
              throw new Error("No text returned from Gemini");
            }

            let cleanText = text
              .replace(/^```json\s*/i, "")
              .replace(/^```\s*/i, "")
              .replace(/\s*```$/i, "")
              .trim();

            // Extract JSON object if Gemini adds extra text
            const firstBrace = cleanText.indexOf("{");
            const lastBrace = cleanText.lastIndexOf("}");

            if (firstBrace !== -1 && lastBrace !== -1) {
              cleanText = cleanText.slice(
                firstBrace,
                lastBrace + 1
              );
            }

            try {
              return JSON.parse(cleanText);
            } catch (parseError) {
              console.error(
                "Gemini JSON parse failed:",
                parseError.message
              );

              console.error("Raw Gemini response:", text);

              throw new Error(
                "Gemini returned invalid JSON"
              );
            }
          }

          // Gemini temporary/server error
          if (
            response.status === 503 ||
            response.status === 429 ||
            response.status >= 500
          ) {
            lastError = new Error(
              data?.error?.message ||
                `Gemini server error (${response.status})`
            );

            console.log(
              `${model} failed - attempt ${attempt}/3`
            );
            console.log("Reason:", lastError.message);

            // Retry with exponential backoff
            if (attempt < 3) {
              const delay = 2000 * Math.pow(2, attempt - 1);

              console.log(
                `Retrying ${model} in ${delay / 1000}s...`
              );

              await sleep(delay);
              continue;
            }

            // Move to next model
            console.log(
              `${model} unavailable. Trying next model...`
            );

            break;
          }

          // Non-retryable error
          const apiMessage =
            data?.error?.message ||
            `Gemini API request failed (${response.status})`;

          const error = new Error(apiMessage);

          error.status = response.status;

          throw error;
        } catch (error) {
          lastError = error;

          // Don't retry JSON parsing / bad request / auth errors
          if (
            error.status &&
            !(
              error.status === 429 ||
              error.status === 503 ||
              error.status >= 500
            )
          ) {
            throw error;
          }

          if (attempt === 3) {
            break;
          }
        }
      }
    }

    throw lastError || new Error("All Gemini models failed");
  } catch (error) {
    console.error(
      "Gemini fetch error:",
      error.message
    );

    throw error;
  }
};