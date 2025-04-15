function ProfessionalExperiencePreview({ resumeInfo }: { resumeInfo: any }) {
  console.log(resumeInfo);
  console.log("Printing Experience preview : ", resumeInfo?.experience);
  
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
                {experience?.startDate} to {" "}
                {experience?.currentlyWorking ? "Present" : experience?.endDate}
              </span>
            </h2>
            <p className="text-xs my-1">{experience?.workSummary}</p>
          </div>
        );
      })}
    </div>
  );
}

export default ProfessionalExperiencePreview;
