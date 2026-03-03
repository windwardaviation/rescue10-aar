export interface AARSection {
  id: string;
  icon: string;
  title: string;
  description: string;
}

export const AAR_SECTIONS: AARSection[] = [
  {
    id: "incident-summary",
    icon: "📋",
    title: "Incident Summary",
    description:
      "Brief recap of the call: time of dispatch, location, nature of the incident, and overall outcome.",
  },
  {
    id: "equipment-preparedness",
    icon: "🔧",
    title: "Equipment Preparedness",
    description:
      "Were all required equipment and gear available, functional, and appropriate for the mission?",
  },
  {
    id: "logistics-coordination",
    icon: "📍",
    title: "Logistics & Operational Coordination",
    description:
      "Evaluation of scene access, patient location, drop/pick-up points, and coordination with the first-in company and EMS personnel.",
  },
  {
    id: "communications",
    icon: "📡",
    title: "Communications",
    description:
      "Assessment of internal and external communications, including Fire Dispatch, REACH, Coast Guard, intercom use, and any radio issues.",
  },
  {
    id: "rescue-scene-management",
    icon: "🚁",
    title: "Rescue Scene Management",
    description:
      "Review of scene safety, personnel roles, aircraft positioning, and patient handling.",
  },
  {
    id: "environmental-conditions",
    icon: "🌦️",
    title: "Environmental Conditions",
    description:
      "Impact of terrain, vegetation, weather, lighting, or other environmental challenges on the operation.",
  },
  {
    id: "issues-corrective-actions",
    icon: "⚠️",
    title: "Identified Issues & Corrective Actions",
    description:
      "Document any equipment, communication, or procedural failures. Outline corrective steps and follow-up actions required.",
  },
];

export const EMAIL_RECIPIENTS = [
  "Alexander.Parker@co.maui.hi.us",
  "Timothy.Herrick@co.maui.hi.us",
  "Kristopher.Sakamoto@co.maui.hi.us",
  "Lee.Theros@co.maui.hi.us",
  "Kaulana.Kino@co.maui.hi.us",
  "Patrick.Fukuda@co.maui.hi.us",
  "Lawrence.Joyo@co.maui.hi.us",
  "Alma.Aiwohi@co.maui.hi.us",
  "Peter.Vanderpoel@co.maui.hi.us",
  "laakea.chang@co.maui.hi.us",
  "Dennis.swain@co.maui.hi.us",
  "Kyle.Williams@co.maui.hi.us",
  "Brandon.Sturm@co.maui.hi.us",
  "Simon.Quirk@co.maui.hi.us",
  "Kanoa.Shannon@co.maui.hi.us",
  "greatbaldeagle1@gmail.com",
  "petevorhes@gmail.com",
  "ops@windwardaviation.com",
  "jacob@windwardaviation.com",
  "office@windwardaviation.com",
  "Reza.Azman@co.maui.hi.us",
];

export const EMAIL_FROM = "Rescue 10 AAR <air1@windwardaviation.com>";

export interface FormData {
  date: string;
  pilotName: string;
  hoistOperator: string;
  crewMembers: string;
  sections: Record<string, string>;
}
