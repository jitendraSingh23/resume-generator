import React, { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ResumePDF from "./resumePreview";
import { PersonalInfo, ResumeData, Template } from "@/types/types";
import github from "../assets/github-brands-solid.svg";

const initialResumeData: ResumeData = {
  personalInfo: {
    name: "",
    email: "",
    phone: "",
    location: "",
    portfolio: "",
    linkedin: "",
  },
  summary: "",
  education: [
    {
      school: "",
      degree: "",
      year: "",
      gpa: "",
      courses: [],
    },
  ],
  experience: [
    {
      company: "",
      position: "",
      duration: "",
      description: "",
      achievements: [],
    },
  ],
  skills: [""],
  certifications: [
    {
      name: "",
      issuer: "",
      year: "",
      expiry: "",
    },
  ],
  awards: [
    {
      title: "",
      issuer: "",
      year: "",
      description: "",
    },
  ],
  languages: [
    {
      name: "",
      proficiency: "Professional",
    },
  ],
};

export const ResumeBuilder: React.FC = () => {
  const [formData, setFormData] = useState<ResumeData>(initialResumeData);
  const [selectedTemplate, setSelectedTemplate] = useState<Template>("classic");

  const handleInputChange = <T extends keyof ResumeData>(
    section: T,
    field: string,
    value: string,
    index?: number
  ) => {
    setFormData((prev) => {
      const sectionData = prev[section]; // Extract section data

      if (section === "personalInfo") {
        return {
          ...prev,
          [section]: { ...(prev[section] as PersonalInfo), [field]: value },
        };
      }

      if (section === "summary") {
        return {
          ...prev,
          summary: value,
        };
      }

      if (Array.isArray(sectionData) && typeof index === "number") {
        return {
          ...prev,
          [section]: (sectionData ?? []).map((item, i) =>
            i === index ? { ...item, [field]: value } : item
          ),
        };
      }

      return prev;
    });
  };

  const addNewItem = (
    section:
      | "education"
      | "experience"
      | "skills"
      | "certifications"
      | "awards"
      | "languages"
  ) => {
    setFormData((prev) => ({
      ...prev,
      [section]: [
        ...(prev[section] || []),
        section === "skills"
          ? ""
          : section === "languages"
          ? { name: "", proficiency: "Professional" }
          : {},
      ],
    }));
  };

  const removeItem = (
    section:
      | "education"
      | "experience"
      | "skills"
      | "certifications"
      | "awards"
      | "languages",
    index: number
  ) => {
    setFormData((prev) => ({
      ...prev,
      [section]: prev[section]?.filter((_, i) => i !== index),
    }));
  };

  return (
    <div className="container mx-20 my-10 flex flex-col lg:flex-row w-full justify-center gap-20 ">
      <Card className="w-full lg:w-1/2">
        <CardContent className="space-y-6 p-6">
          {/* Personal Information */}
          <div>
            <h2 className="text-xl font-bold mb-4">Personal Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                placeholder="Full Name"
                value={formData.personalInfo.name}
                onChange={(e) =>
                  handleInputChange("personalInfo", "name", e.target.value)
                }
              />
              <Input
                placeholder="Email"
                type="email"
                value={formData.personalInfo.email}
                onChange={(e) =>
                  handleInputChange("personalInfo", "email", e.target.value)
                }
              />
              <Input
                placeholder="Phone"
                value={formData.personalInfo.phone}
                onChange={(e) =>
                  handleInputChange("personalInfo", "phone", e.target.value)
                }
              />
              <Input
                placeholder="Location"
                value={formData.personalInfo.location}
                onChange={(e) =>
                  handleInputChange("personalInfo", "location", e.target.value)
                }
              />
            </div>
          </div>

          {/* Summary */}
          <div>
            <h2 className="text-xl font-bold mb-4">Professional Summary</h2>
            <Textarea
              placeholder="Write a brief professional summary..."
              value={formData.summary}
              onChange={(e) => handleInputChange("summary", "", e.target.value)}
            />
          </div>

          {/* Education */}
          <div>
            <h2 className="text-xl font-bold mb-4">Education</h2>
            {formData.education.map((edu, index) => (
              <div
                key={index}
                className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4"
              >
                <Input
                  placeholder="School/University"
                  value={edu.school}
                  onChange={(e) =>
                    handleInputChange(
                      "education",
                      "school",
                      e.target.value,
                      index
                    )
                  }
                />
                <Input
                  placeholder="Degree"
                  value={edu.degree}
                  onChange={(e) =>
                    handleInputChange(
                      "education",
                      "degree",
                      e.target.value,
                      index
                    )
                  }
                />
                <Input
                  placeholder="Year"
                  value={edu.year}
                  onChange={(e) =>
                    handleInputChange(
                      "education",
                      "year",
                      e.target.value,
                      index
                    )
                  }
                />
                {formData.education.length > 0 && (
                  <Button
                    variant="destructive"
                    onClick={() => removeItem("education", index)}
                    className=""
                  >
                    Remove
                  </Button>
                )}
              </div>
            ))}
            <Button onClick={() => addNewItem("education")} variant="outline">
              Add Education
            </Button>
          </div>

          {/* Experience */}
          <div>
            <h2 className="text-xl font-bold mb-4">Experience</h2>
            {formData.experience?.map((exp, index) => (
              <div key={index} className="grid grid-cols-1 gap-4 mb-4">
                <Input
                  placeholder="Company"
                  value={exp.company}
                  onChange={(e) =>
                    handleInputChange(
                      "experience",
                      "company",
                      e.target.value,
                      index
                    )
                  }
                />
                <Input
                  placeholder="Position"
                  value={exp.position}
                  onChange={(e) =>
                    handleInputChange(
                      "experience",
                      "position",
                      e.target.value,
                      index
                    )
                  }
                />
                <Input
                  placeholder="Duration"
                  value={exp.duration}
                  onChange={(e) =>
                    handleInputChange(
                      "experience",
                      "duration",
                      e.target.value,
                      index
                    )
                  }
                />
                <Textarea
                  placeholder="Description"
                  value={exp.description}
                  onChange={(e) =>
                    handleInputChange(
                      "experience",
                      "description",
                      e.target.value,
                      index
                    )
                  }
                />
                {(formData.experience?.length ?? 0) > 0 && (
                  <Button
                    variant="destructive"
                    onClick={() => removeItem("experience", index)}
                  >
                    Remove
                  </Button>
                )}
              </div>
            ))}
            <Button onClick={() => addNewItem("experience")} variant="outline">
              Add Experience
            </Button>
          </div>

          {/* Skills */}
          <div>
            <h2 className="text-xl font-bold mb-4">Skills</h2>
            {formData.skills.map((skill, index) => (
              <div key={index} className="flex gap-4 mb-4">
                <Input
                  placeholder="Skill"
                  value={skill}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      skills: prev.skills.map((item, i) =>
                        i === index ? e.target.value : item
                      ),
                    }))
                  }
                />
                {formData.skills.length > 0 && (
                  <Button
                    variant="destructive"
                    onClick={() => removeItem("skills", index)}
                  >
                    Remove
                  </Button>
                )}
              </div>
            ))}
            <Button onClick={() => addNewItem("skills")} variant="outline">
              Add Skill
            </Button>
          </div>

          {/* Certifications */}
          <div>
            <h2 className="text-xl font-bold mb-4">Certifications</h2>
            {formData.certifications?.map((cert, index) => (
              <div
                key={index}
                className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4"
              >
                <Input
                  placeholder="Certification Name"
                  value={cert.name}
                  onChange={(e) =>
                    handleInputChange(
                      "certifications",
                      "name",
                      e.target.value,
                      index
                    )
                  }
                />
                <Input
                  placeholder="Issuing Organization"
                  value={cert.issuer}
                  onChange={(e) =>
                    handleInputChange(
                      "certifications",
                      "issuer",
                      e.target.value,
                      index
                    )
                  }
                />
                <Input
                  placeholder="Year"
                  value={cert.year}
                  onChange={(e) =>
                    handleInputChange(
                      "certifications",
                      "year",
                      e.target.value,
                      index
                    )
                  }
                />

                {(formData.certifications?.length || 0) > 0 && (
                  <Button
                    variant="destructive"
                    onClick={() => removeItem("certifications", index)}
                  >
                    Remove
                  </Button>
                )}
              </div>
            ))}
            <Button
              onClick={() => addNewItem("certifications")}
              variant="outline"
            >
              Add Certification
            </Button>
          </div>

          {/* Awards */}
          <div>
            <h2 className="text-xl font-bold mb-4">Awards & Achievements</h2>
            {formData.awards?.map((award, index) => (
              <div
                key={index}
                className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4"
              >
                <Input
                  placeholder="Award Title"
                  value={award.title}
                  onChange={(e) =>
                    handleInputChange("awards", "title", e.target.value, index)
                  }
                />
                <Input
                  placeholder="Issuing Organization"
                  value={award.issuer}
                  onChange={(e) =>
                    handleInputChange("awards", "issuer", e.target.value, index)
                  }
                />
                <Input
                  placeholder="Year"
                  value={award.year}
                  onChange={(e) =>
                    handleInputChange("awards", "year", e.target.value, index)
                  }
                />
                <Textarea
                  placeholder="Description"
                  value={award.description}
                  onChange={(e) =>
                    handleInputChange(
                      "awards",
                      "description",
                      e.target.value,
                      index
                    )
                  }
                />
                {(formData.awards?.length || 0) > 0 && (
                  <Button
                    variant="destructive"
                    onClick={() => removeItem("awards", index)}
                  >
                    Remove
                  </Button>
                )}
              </div>
            ))}
            <Button onClick={() => addNewItem("awards")} variant="outline">
              Add Award
            </Button>
          </div>

          {/* Languages */}
          <div>
            <h2 className="text-xl font-bold mb-4">Languages</h2>
            {formData.languages?.map((lang, index) => (
              <div
                key={index}
                className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4"
              >
                <Input
                  placeholder="Language"
                  value={lang.name}
                  onChange={(e) =>
                    handleInputChange(
                      "languages",
                      "name",
                      e.target.value,
                      index
                    )
                  }
                />
                <Select
                  value={lang.proficiency}
                  onValueChange={(value) =>
                    handleInputChange("languages", "proficiency", value, index)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select proficiency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Native">Native</SelectItem>
                    <SelectItem value="Fluent">Fluent</SelectItem>
                    <SelectItem value="Professional">Professional</SelectItem>
                    <SelectItem value="Intermediate">Intermediate</SelectItem>
                    <SelectItem value="Basic">Basic</SelectItem>
                  </SelectContent>
                </Select>
                {(formData.languages?.length || 0) > 0 && (
                  <Button
                    variant="destructive"
                    onClick={() => removeItem("languages", index)}
                  >
                    Remove
                  </Button>
                )}
              </div>
            ))}
            <Button onClick={() => addNewItem("languages")} variant="outline">
              Add Language
            </Button>
          </div>

          {/* Template Selection */}
          <div>
            <h2 className="text-xl font-bold mb-4">Select Template</h2>
            <div className="grid grid-cols-3 gap-4">
              {(["modern", "classic", "minimal"] as Template[]).map(
                (template) => (
                  <div
                    key={template}
                    className={`p-4 border rounded cursor-pointer ${
                      selectedTemplate === template ? "border-blue-500" : ""
                    }`}
                    onClick={() => setSelectedTemplate(template)}
                  >
                    {template.charAt(0).toUpperCase() + template.slice(1)}
                  </div>
                )
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="w-full lg:w-1/2 h-fit ">
        <CardHeader className="text-xl font-bold">Preview</CardHeader>
        <CardContent className="px-6 flex justify-center items-center">
          <ResumePDF data={formData} template={selectedTemplate} />
        </CardContent>
        <div className="flex flex-col justify-center items-center my-10">
          <a
            href="https://github.com/jitendraSingh23"
            target="_blank"
            className="text-black border-2 border-black bg-[#ffffff] hover:bg-slate-600 hover:text-white focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2 mb-2"
          >
            <img src={github} alt="git" className="h-5 w-5 mr-2" />
            More Projects
          </a>
        </div>
      </Card>
    </div>
  );
};
