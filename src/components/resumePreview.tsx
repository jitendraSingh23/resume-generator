import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFViewer,
  Font,
} from "@react-pdf/renderer";
import { ResumeData } from "./../types/types";

Font.register({
  family: "Open Sans",
  fonts: [
    {
      src: "https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-regular.ttf",
    },
    {
      src: "https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-600.ttf",
      fontWeight: 600,
    },
    {
      src: "https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-italic.ttf",
      fontStyle: "italic",
    },
  ],
});

Font.register({
  family: "Roboto",
  fonts: [
    {
      src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-light-webfont.ttf",
      fontWeight: 300,
    },
    {
      src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-regular-webfont.ttf",
      fontWeight: 400,
    },
    {
      src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-medium-webfont.ttf",
      fontWeight: 500,
    },
  ],
});

const styles = {
  modern: StyleSheet.create({
    page: {
      padding: 30,
      fontFamily: "Open Sans",
    },
    header: {
      marginBottom: 20,
      textAlign: "center",
    },
    name: {
      fontSize: 24,
      fontWeight: 600,
      marginBottom: 5,
      color: "#2563eb",
    },
    contact: {
      fontSize: 11,
      color: "#666",
      marginBottom: 3,
    },
    section: {
      marginBottom: 15,
    },
    sectionTitle: {
      fontSize: 14,
      fontWeight: 600,
      marginBottom: 10,
      color: "#000000",
      textTransform: "uppercase",
      borderBottomWidth: 1,
      borderBottomColor: "#e5e7eb",
      paddingBottom: 3,
    },
    experienceItem: {
      marginBottom: 10,
    },
    companyHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 5,
    },
    company: {
      fontSize: 12,
      fontWeight: 600,
    },
    skills: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 5,
    },
    skill: {
      fontSize: 11,
      backgroundColor: "#f3f4f6",
      padding: "4 8",
      borderRadius: 3,
      color: "#2563eb",
    },
  }),

  minimal: StyleSheet.create({
    page: {
      padding: 40,
      fontFamily: "Roboto",
    },
    header: {
      marginBottom: 30,
    },
    name: {
      fontSize: 28,
      fontWeight: 500,

      marginBottom: 8,
      color: "#000",
    },
    contact: {
      fontSize: 10,
      color: "#555",
      marginBottom: 2,
    },
    section: {
      marginBottom: 20,
    },
    sectionTitle: {
      fontSize: 12,
      fontWeight: 500,
      marginBottom: 12,
      color: "#111",
      textTransform: "uppercase",
      letterSpacing: 1,
    },
    experienceItem: {
      marginBottom: 12,
    },
    companyHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 4,
    },
    company: {
      fontSize: 11,
      fontWeight: 500,
    },
    skills: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 8,
    },
    skill: {
      fontSize: 10,
      padding: "3 6",
      color: "#666",
    },
  }),

  classic: StyleSheet.create({
    page: {
      padding: 35,
      fontFamily: "Times-Roman",
    },
    header: {
      marginBottom: 25,
      borderBottomWidth: 2,
      borderBottomColor: "#000",
      paddingBottom: 10,
    },
    name: {
      fontSize: 26,
      marginBottom: 6,
      fontFamily: "Times-Bold",
    },
    contact: {
      fontSize: 11,
      marginBottom: 2,
    },
    section: {
      marginBottom: 18,
    },
    sectionTitle: {
      fontSize: 16,
      fontFamily: "Times-Bold",
      marginBottom: 8,
      borderBottomWidth: 1,
      borderBottomColor: "#999",
      paddingBottom: 2,
    },
    experienceItem: {
      marginBottom: 12,
    },
    companyHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 3,
    },
    company: {
      fontSize: 13,
      fontFamily: "Times-Bold",
    },
    skills: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 6,
    },
    skill: {
      fontSize: 11,
      marginRight: 8,
    },
  }),
};

// Common styles shared between templates
const commonStyles = StyleSheet.create({
  duration: {
    fontSize: 11,
    color: "#666",
  },
  position: {
    fontSize: 11,
    marginBottom: 3,
  },
  description: {
    fontSize: 10,
    color: "#444",
    lineHeight: 1.4,
  },
  education: {
    marginBottom: 8,
  },
  link: {
    color: "#2563eb",
    textDecoration: "underline",
  },
  certifications: {
    marginBottom: 6,
    fontSize: 11,
  },
  awards: {
    marginBottom: 6,
    fontSize: 11,
  },
  languages: {
    fontSize: 11,
    marginBottom: 3,
  },
});

interface ResumePDFProps {
  data: ResumeData;
  template?: "modern" | "minimal" | "classic";
}

const ResumePDF: React.FC<ResumePDFProps> = ({
  data,
  template = "classic",
}) => {
  const templateStyles = styles[template];
  return (
    <PDFViewer style={{ width: "100%", height: "600px" }}>
      <Document>
        <Page size="A4" style={templateStyles.page}>
          {/* Header Section */}
          <View style={templateStyles.header}>
            <Text style={templateStyles.name}>{data.personalInfo.name}</Text>
            <Text style={templateStyles.contact}>
              {data.personalInfo.email} • {data.personalInfo.phone}
            </Text>
            <Text style={templateStyles.contact}>
              {data.personalInfo.location}
            </Text>
          </View>

          {/* Professional Summary */}
          {data.summary && (
            <View style={templateStyles.section}>
              <Text style={templateStyles.sectionTitle}>
                Professional Summary
              </Text>
              <Text style={commonStyles.description}>{data.summary}</Text>
            </View>
          )}

          {/* Experience Section */}
          {data.experience && data.experience.length > 0 && (
            <View style={templateStyles.section}>
              <Text style={templateStyles.sectionTitle}>
                Professional Experience
              </Text>
              {data.experience.map((exp, index) => (
                <View key={index} style={templateStyles.experienceItem}>
                  <View style={templateStyles.companyHeader}>
                    <Text style={templateStyles.company}>{exp.company}</Text>
                    <Text style={commonStyles.duration}>{exp.duration}</Text>
                  </View>
                  <Text style={commonStyles.position}>{exp.position}</Text>
                  <Text style={commonStyles.description}>
                    {exp.description}
                  </Text>
                  {exp.achievements &&
                    exp.achievements.map((achievement, i) => (
                      <Text key={i} style={commonStyles.description}>
                        • {achievement}
                      </Text>
                    ))}
                </View>
              ))}
            </View>
          )}

          {/* Education Section */}
          {data.education && data.education.length > 0 && (
            <View style={templateStyles.section}>
              <Text style={templateStyles.sectionTitle}>Education</Text>
              {data.education.map((edu, index) => (
                <View key={index} style={commonStyles.education}>
                  <Text style={templateStyles.company}>{edu.school}</Text>
                  <Text style={commonStyles.position}>{edu.degree}</Text>
                  <Text style={commonStyles.duration}>{edu.year}</Text>
                </View>
              ))}
            </View>
          )}
          {/* Skills Section */}
          {data.skills && data.skills.length > 0 && (
            <View style={templateStyles.section}>
              <Text style={templateStyles.sectionTitle}>Skills</Text>
              <View style={templateStyles.skills}>
                {data.skills.map((skill, index) => (
                  <Text key={index} style={templateStyles.skill}>
                    {skill}
                  </Text>
                ))}
              </View>
            </View>
          )}
          {/* Certifications Section */}
          {data.certifications && data.certifications.length > 0 && (
            <View style={templateStyles.section}>
              <Text style={templateStyles.sectionTitle}>Certifications</Text>
              {data.certifications.map((cert, index) => (
                <View>
                  <Text key={index} style={commonStyles.certifications}>
                    • {cert.name} - {cert.year}
                  </Text>
                  <Text key={index} style={commonStyles.certifications}>
                    {cert.issuer}
                  </Text>
                </View>
              ))}
            </View>
          )}

          {/* Awards Section */}
          {data.awards && data.awards.length > 0 && (
            <View style={templateStyles.section}>
              <Text style={templateStyles.sectionTitle}>
                Awards & Achievements
              </Text>
              {data.awards.map((award, index) => (
                <View>
                  <Text key={index} style={commonStyles.awards}>
                    • {award.title} - {award.year}
                  </Text>
                  <Text key={index} style={commonStyles.awards}>
                    {award.issuer}
                  </Text>
                  <Text key={index} style={commonStyles.awards}>
                    {award.description}
                  </Text>
                </View>
              ))}
            </View>
          )}

          {/* Languages Section */}
          {data.languages && data.languages.length > 0 && (
            <View style={templateStyles.section}>
              <Text style={templateStyles.sectionTitle}>Languages</Text>
              {data.languages.map((lang, index) => (
                <Text key={index} style={commonStyles.languages}>
                  {lang.name} - {lang.proficiency}
                </Text>
              ))}
            </View>
          )}
        </Page>
      </Document>
    </PDFViewer>
  );
};

export default ResumePDF;
