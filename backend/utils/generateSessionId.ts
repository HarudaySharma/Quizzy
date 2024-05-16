import { uuid } from "uuidv4";

export default function generateSessionId () {
    const sessionId = uuid();
    return sessionId;
}
