import { v4 } from "uuid";
export default function generateSessionId() {
    const sessionId = v4();
    return sessionId;
}
