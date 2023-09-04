export function generateIcon(preferredJourneyMode:string){
    if(preferredJourneyMode === "fastest") return "north"
    if(preferredJourneyMode === "least-changes") return "switch_access_shortcut_add"
    if(preferredJourneyMode === "least-walking") return "directions_walk"

    return ""
}
