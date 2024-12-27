import { Link } from "react-router-dom";
import { httpsIntercepterService } from "../core/https-service";
import { CourseList } from "../features/courses/components/course-list";

export const Courses = () => {
  return (
    <>
      <div className="row">
        <div className="col-12">
          <div className="d-flex align-items-center justify-content-between mb-5">
            <Link className="btn btn-primary fw-border mt-n1">
              افزودن دوره جدید
            </Link>
          </div>
          <CourseList />
        </div>
      </div>
    </>
  );
};

export const coursesLoader = async () => {
  const response = await httpsIntercepterService.get("/Course/list");
  return response.data;
};
