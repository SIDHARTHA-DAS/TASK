/* eslint-disable preserve-caught-error */


import axios from "axios";
import { serverUrl } from "../App";
import { setUserData } from "../redux/userSlice";

export const getCurrentUser = async (dispatch) => {
  try {
    const result = await axios.get(serverUrl + "/api/user/currentuser", {
      withCredentials: true,
    });
    console.log(result.data);
    dispatch(setUserData(result.data));
  } catch (error) {
    console.error("getCurrentUser error:", error.response?.data || error.message);
  }
};

export const generateNotes = async (payload) => {
  try {
    const result = await axios.post(
      serverUrl + "/api/notes/generate-notes",
      payload,
      { withCredentials: true }
    );
    console.log(result.data);
    return result.data;
  } catch (error) {
    console.error("generateNotes error:", error.response?.data || error.message);
    throw error; // Re-throw error so UI can handle loading/error states properly
  }
};



export const downloadPdf = async (result) => {
  try {
    const response = await axios.post(
      serverUrl + "/api/pdf/generate-pdf",
      { result },
      {
        responseType: "blob",
        withCredentials: true,
      }
    );

    const blob = new Blob([response.data], {
      type: "application/pdf",
    });

    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "ExamNotesAI.pdf";
    document.body.appendChild(link); // Append temporarily
    link.click();

    // Clean up memory
    link.remove();
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Download Error:", error);
    throw new Error("PDF download failed");
  }
};










// import axios from "axios"
// import {serverUrl} from "../App"
// import { setUserData } from "../redux/userSlice"


// export const getCurrentUser = async (dispatch) =>{
//   try {
//     const result = await axios.get(serverUrl + "/api/user/currentuser", {withCredentials: true})
//     console.log(result.data)
//     dispatch(setUserData(result.data))
//   } catch (error) {
//     console.log(error)
//   }
// }


// export const generateNotes = async (payload) =>{
//   try {
//     const result = await axios.post(serverUrl + "/api/notes/generate-notes" , payload , {withCredentials: true})
//     console.log(result.data)
//     return result.data
//   } catch (error) {
//     console.log(error)
//   }
// }



// export const downloadPdf = async (result) =>{
//   try {
//     const response = await axios.post(serverUrl + "/api/pdf/generate-pdf", {result}, {
//       responseType:"blob", withCredentials:true
//     })
//     const blob = new Blob([response.data], {
//       type: "application/pdf"
//     })

//     const url = window.URL.createObjectURL(blob);
//     const link = document.createElement("a");
//     link.href = url;
//     link.download = "ExamNotesAI.pdf";
//     link.click();

//     window.URL.revokeObjectURL(url);
//   } catch (error) {
//     console.log(error)
//     throw new Error("PDF download failed");
//   }
// }
