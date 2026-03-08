import { Card, Button, Badge } from 'react-bootstrap';

const CourseCard = ({ course }) => {
  const formattedDate = course?.start_date
    ? new Date(course.start_date).toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      })
    : "TBA";

  const courseImages = {
    "mern fullstack": "mern.png",
    "react frontend": "ReactImage.jpg",
    "react native mobile": ""
  };

  const imageName =
    courseImages[course?.course_name?.toLowerCase()] || "default.png";

  return (
    <Card
      className="h-100 border-0 shadow-sm rounded-4 overflow-hidden transition course-card"
      style={{ width: '24rem' }}
    >
      {/* IMAGE SECTION */}
      <div className="course-img-wrapper">
        <Card.Img
          src={`/images/${imageName}`}
          alt={course?.course_name}
          className="course-img"
          onError={(e) => {
            e.target.src = '/images/default.png';
          }}
        />
        <Badge className="course-badge">Active</Badge>
      </div>

      {/* BODY */}
      <Card.Body className="p-4 d-flex flex-column">
        <Card.Title className="fw-bold fs-4 mb-2">
          {course?.course_name || "New Course"}
        </Card.Title>

        <p className="text-muted mb-3">
          <i className="bi bi-calendar-event me-2"></i>
          Starts on: {formattedDate}
        </p>

        <div className="d-flex justify-content-between align-items-center mt-auto">
          <span className="fw-bold text-primary fs-4">
            ₹{course?.fees || '0'}
          </span>

          <Button
            variant="outline-primary"
            className="rounded-pill px-4 py-2 fw-semibold border-2"
          >
            View Details
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default CourseCard;
