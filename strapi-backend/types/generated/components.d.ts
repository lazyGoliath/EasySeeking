import type { Schema, Struct } from '@strapi/strapi';

export interface EducationEducation extends Struct.ComponentSchema {
  collectionName: 'components_education_educations';
  info: {
    displayName: 'education';
    icon: 'moon';
  };
  attributes: {
    degree: Schema.Attribute.String;
    description: Schema.Attribute.Text;
    endDate: Schema.Attribute.String;
    major: Schema.Attribute.String;
    startDate: Schema.Attribute.String;
    universityName: Schema.Attribute.String;
  };
}

export interface ExperienceExperience extends Struct.ComponentSchema {
  collectionName: 'components_experience_experiences';
  info: {
    displayName: 'experience';
    icon: 'code';
  };
  attributes: {
    city: Schema.Attribute.String;
    companyName: Schema.Attribute.String;
    currentlyWorking: Schema.Attribute.Boolean;
    endDate: Schema.Attribute.String;
    positionTitle: Schema.Attribute.String;
    startDate: Schema.Attribute.String;
    state: Schema.Attribute.String;
    workSummary: Schema.Attribute.Text;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'education.education': EducationEducation;
      'experience.experience': ExperienceExperience;
    }
  }
}
