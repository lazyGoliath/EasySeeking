function ProfessionalExperiencePreview({resumeInfo}:{resumeInfo:any}) {
  console.log(resumeInfo);
  console.log(resumeInfo?.experience);
  const Experience = resumeInfo?.experience
  console.log(Experience[0])

  
  return (
    <div className='my-6'>
      <h2 className='text-center font-bold text-sm mb-2'
        style={{
          color:resumeInfo?.themeColor
        }}>
        Professional Experience
      </h2>
      <hr style={{
        borderColor:resumeInfo?.themeColor
      }} />

      {resumeInfo?.experience.map((experience : any, index : number) =>{
        return(
          <div key={index}>
          <h2>
            {experience?.title}
          </h2>
        </div>
        )
      })}
    </div>
  )
}

export default ProfessionalExperiencePreview