export interface SubSection {
  title: string;
  content: string;
}

export interface Section {
  title: string;
  content: string;
  subSections: SubSection[];
}

 export interface DocsData {
  title: string;
  sections: Section[];
}