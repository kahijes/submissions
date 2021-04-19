const Header = ({ course }) => {
    return (
      <h1>{course.name}</h1>
    )
  }
  
  const Total = ({ sum }) => {
    return(
      <p><b>Number of exercises {sum}</b></p>
    ) 
  }
  
  const Part = ({partInfo, id}) => {
    return (
      <p id={id}>
        {partInfo.name} {partInfo.exercises}
      </p>    
    )
  }
  
  const Content = ({ courses }) => {
    return (
      <div>
        {courses.map(part =>
        <Part partInfo={part} key={part.id}/>
        )}
      </div>
    )
  }
  
  const Course = ( {courses, id} ) => {
    const allParts = courses.parts
    const sum = allParts.reduce((s, current) => (s += current.exercises), 0)
    return (
      <div id={id}>
        <Header course={courses} />
        <Content courses={allParts} />
        <Total sum={sum} />
      </div>
    )
  }

  export default Course