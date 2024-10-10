import { useParams } from "react-router-dom";
import data from "../../data.json";
import { useState } from "react";

function SingleCourse() {
  const [isDownloading, setIsDownloading] = useState(false);

  // Get the course ID from the URL
  const { id } = useParams();

  // Find the course in the data array
  const course = data.find((course) => course.id === parseInt(id));

  const handleDownloadPDF = () => {
    setIsDownloading(true); // Show the loading spinner

    // Simulate a short delay for the download (e.g., fetching the file from server)
    setTimeout(() => {
      const link = document.createElement("a");
      link.href = `${course.downloadPdf}`; // Replace with actual path
      link.download = `${course.title}.pdf`; // File name for download
      link.click();

      setIsDownloading(false); // Hide the loading spinner
    }, 2000); // Simulating a 2 second download delay
  };

  if (!course) {
    return <h2>Course not found!</h2>;
  }

  return (
    <div className="single-course-container">
      <h1 className="course-title">{course.title}</h1>
      <p className="course-description">{course.courseDetails.defination}</p>

      {course.courseDetails && (
        <div className="course-details">
          <h2>Key Concepts:</h2>
          <ul>
            {course.courseDetails.keyConcept.map((c) => (
              <li key={c.id}>
                <h4>{c.concept}</h4>
                <p>{c.examples === "" ? "" : `Example: ${c.examples}`}</p>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Button to download the PDF */}
      <button className="download-btn" onClick={handleDownloadPDF} disabled={isDownloading}>
        {isDownloading ? "Downloading..." : "Download PDF"}
      </button>
    </div>
  );
}

export default SingleCourse;
