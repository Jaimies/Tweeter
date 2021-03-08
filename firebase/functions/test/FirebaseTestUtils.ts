import {initializeAdminApp} from "@firebase/rules-unit-testing"

export const appOptions = {projectId: "tweeter-dfa01"}
const app = initializeAdminApp(appOptions)

export function getFirestore() {
    return app.firestore()
}
