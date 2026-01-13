// Converts "YYYY-MM-DDTHH:mm" (from datetime-local) to ISO string
export function toIsoUtc(datetimeLocal: string): string {
    if (!datetimeLocal) return "";
    // Make it "YYYY-MM-DDTHH:mm:00"
    const withSeconds = datetimeLocal.length === 16 ? `${datetimeLocal}:00` : datetimeLocal;
    // Interpret as local time, convert to UTC ISO
    const d = new Date(withSeconds);
    return d.toISOString();
}

// Converts ISO -> "YYYY-MM-DDTHH:mm" for datetime-local inputs
export function isoToDatetimeLocal(iso: string): string {
    if (!iso) return "";
    const d = new Date(iso);
    const pad = (n: number) => String(n).padStart(2, "0");
    const yyyy = d.getFullYear();
    const mm = pad(d.getMonth() + 1);
    const dd = pad(d.getDate());
    const hh = pad(d.getHours());
    const min = pad(d.getMinutes());
    return `${yyyy}-${mm}-${dd}T${hh}:${min}`;
}
