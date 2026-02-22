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

export const EMAIL_RECIPIENTS = ["office@windwardaviation.com"];

export const EMAIL_FROM = "Rescue 10 AAR <air1@windwardaviation.com>";

export interface FormData {
  date: string;
  pilotName: string;
  hoistOperator: string;
  crewMembers: string;
  sections: Record<string, string>;
}
