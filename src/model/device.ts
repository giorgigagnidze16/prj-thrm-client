export const Location =
    [
        "BEDROOM",
        "KITCHEN",
        "BATHROOM",
        "GARAGE",
        "LIVING_ROOM"
    ]

export type Thermostat = {
    id?: number,
    name: string,
    location: string,
    threshold: number,
    temperature?: number,
    isCritical?: boolean,
    critical?: boolean
}