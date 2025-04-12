function ProfessionalExperiencePreview({ resumeInfo }: { resumeInfo: any }) {
  console.log(resumeInfo);
  console.log(resumeInfo?.experience);
  const Experience = resumeInfo?.experience;
  //console.log(Experience[0])

  return (
    <div className="my-5">
      <h2
        className="text-center font-bold text-sm mb-2"
        style={{
          color: resumeInfo?.themeColor,
        }}
      >
        Professional Experience
      </h2>
      <hr
        style={{
          borderColor: resumeInfo?.themeColor,
        }}
      />

      {resumeInfo?.experience.map((experience: any, index: number) => {
        return (
          <div key={index} className="my-3">
            <h2
              className="text-sm font-bold"
              style={{
                color: resumeInfo?.themeColor,
              }}
            >
              {experience?.title}
            </h2>
            <h2 className="text-xs flex justify-between">
              {experience?.companyName}, {experience?.city}, {experience?.state}
              <span>
                {experience?.startDate} -{" "}
                {experience?.currentlyWorking ? "Present" : experience?.endDate}
              </span>
            </h2>
            <p className="text-xs my-1">{experience?.workSummery}</p>
          </div>
        );
      })}
    </div>
  );
}

export default ProfessionalExperiencePreview;
