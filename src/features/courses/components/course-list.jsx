import { useLoaderData } from "react-router-dom";
import { CourseItem } from "./course-item";

export const CourseList = () => {
  const loadedCourses = useLoaderData(); //use data who fecth in parent component(courses)
  return (
    <>
      <div className="row">
        {loadedCourses.map((course) => {
          return (
            <>
              <div className="col-3" key={course.id}>
                <CourseItem {...course} />
              </div>
            </>
          );
        })}
      </div>
    </>
  );
};
