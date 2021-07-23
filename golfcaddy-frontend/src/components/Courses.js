/* Yksinkertaisesti vain listaus radoista, ja mahdollisuus lisätä niitä */
import test_courses from '../ratoja'
const Courses = ({ exitCourses }) => {
    return (
        <div className='Courses'>
            <h1>Courses</h1>
            <div className='courseListingDiv'>
                {test_courses.map(c => (
                    <div key={c.name}>{c.name}</div>
                ))}
            </div>

            <button>add new course</button>

            <button className='backButton' onClick={exitCourses}>
                back
            </button>
        </div>
    )
}

export default Courses
