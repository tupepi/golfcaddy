import test_courses from '../ratoja'
const Courses = ({ exitCourses }) => {
    return (
        <div className='Courses'>
            <h2>Courses</h2>
            <div className='courseListingDiv'>
                {test_courses.map(c => (
                    <div key={c.name}>{c.name}</div>
                ))}
            </div>
            <button>add new course</button>
            <button onClick={exitCourses}>back</button>
        </div>
    )
}

export default Courses
