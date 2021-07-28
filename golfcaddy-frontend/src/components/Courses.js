/* Yksinkertaisesti vain listaus radoista, ja mahdollisuus lisätä niitä */
import test_courses from '../ratoja'
import { useState } from 'react'
import NewCourse from './NewCourse'
const Courses = ({ exit }) => {
    const [showAddNewCourse, setShowAddNewCourse] = useState(false)
    // Poistutaan radan lisäämis näkymästä
    const exitAddNewCourse = () => {
        setShowAddNewCourse(false)
    }
    return showAddNewCourse ? (
        <NewCourse exit={exitAddNewCourse}></NewCourse>
    ) : (
        <div className='Courses'>
            <h1>Courses</h1>
            <div className='courseListingDiv'>
                {test_courses.map(c => (
                    <div key={c.name}>{c.name}</div>
                ))}
            </div>

            <button onClick={() => setShowAddNewCourse(!showAddNewCourse)}>
                add new course
            </button>

            <button className='backButton' onClick={exit}>
                back
            </button>
        </div>
    )
}

export default Courses
