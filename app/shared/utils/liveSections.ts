import { LiveJourney } from "~/stores/liveJourney";

type NavigationStepTriple = {
  sectionId: number;
  actionId: number;
  intermediateStopId: number;
};

/**
 * Function to calculate the next possible step in navigation sections
 * @param {NavigationStepTriple} currentStep
 * @param {HereApiRoute['sections']} sections
 * @returns {NavigationStepTriple|null} - returns null if no next step is found
 */

export function getNextStep(
  currentStep: NavigationStepTriple,
  sections: LiveJourney["sections"],
): NavigationStepTriple | null {
  const { sectionId, actionId, intermediateStopId } = currentStep;
  const currentSection = sections[sectionId];

  if (currentSection === false) {
    throw new Error("Section is falsy");
  }

  // Iterate over all action
  if (currentSection.actions && currentSection.actions.length > actionId + 1) {
    return {
      sectionId,
      actionId: actionId + 1,
      intermediateStopId,
    };
  }

  // Iterate over all intermediate stops
  if (
    currentSection.intermediateStops &&
    currentSection.intermediateStops.length > intermediateStopId + 1
  ) {
    return {
      sectionId,
      actionId,
      intermediateStopId: intermediateStopId + 1,
    };
  }

  // Iterate over all sections and skip falsy sections
  let nextSectionId = sectionId + 1;
  while (sections[nextSectionId] === false) {
    nextSectionId++;
  }

  // If there is no next section, return null
  if (sections.length === nextSectionId + 1) {
    return null;
  }

  return {
    sectionId: nextSectionId,
    actionId: 0,
    intermediateStopId: -1,
  };
}
