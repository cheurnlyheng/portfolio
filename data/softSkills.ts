export type SoftSkill = {
  title: string;
  icon: "camera" | "edit" | "presentation" | "spreadsheet" | "marketing" | "team";
  body: string;
};

export const softSkills: SoftSkill[] = [
  {
    title: "Content Creation and Video Editing",
    icon: "edit",
    body: "I can create posters, social media content, and basic promotional videos using Canva and CapCut. I am comfortable working with layouts, text, animations, transitions, music, and some visual effects.",
  },
  {
    title: "Presentation and Document Design",
    icon: "presentation",
    body: "I can create professional presentation slides, reports, assignments, and business documents using Canva, Microsoft PowerPoint, and Microsoft Word. I focus on clear structure, clean design, and engaging visuals.",
  },
  {
    title: "Spreadsheet and Data Organization",
    icon: "spreadsheet",
    body: "I can use Microsoft Excel to organize data, create tables, perform basic calculations, and prepare simple reports.",
  },
  {
    title: "Digital Marketing",
    icon: "marketing",
    body: "I have experience using Meta Ads Manager to create, manage, and monitor basic advertising campaigns for social media platforms.",
  },
  {
    title: "Communication and Collaboration",
    icon: "team",
    body: "I communicate clearly, work well in teams, manage my time responsibly, and adapt to different project requirements. I can also understand technical documentation and communicate in English.",
  },
];
