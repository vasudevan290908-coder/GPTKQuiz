# Architecture Overview

## 1. Core Services & Cloud Architecture
* **Frontend Layer:** Built using React with TypeScript, HTML, and Tailwind CSS.
* **Authentication Engine:** **Firebase Auth**
  * Provides 1-click Google / Gmail single sign-on.
  * Handles secure email/password credential verification without requiring manual custom JWT server infrastructure.
* **Live Synchronization Engine:** **Firebase Realtime Database**
  * Instant, sub-second screen updates across connected clients.
  * When a lecturer edits a lecture, syllabus, or grades, student interfaces update dynamically in real time without refreshing.
* **Database & Persistence Layer:** Firebase Realtime Database for live collaborative data, backed by MySQL for relational academic records.
* **Hosting & Delivery:** GitHub Pages (100% free serverless hosting).

## 2. Authentication & Verification Flow
* **Step 1 (Client):** User clicks "Continue with Google" or enters credentials.
* **Step 2 (Auth Request):** Client issues authentication request to Firebase Auth.
* **Step 3 (Token Generation):** Firebase securely validates credentials and generates an authenticated session token.
* **Step 4 (Client Receives Session):** Secure token is stored in client session state.
* **Step 5 (Verification):** When accessing protected lecturer or student data nodes, security rules verify permissions.
* **Step 6 (Access Control):** Validated session grants access; unauthorized requests are rejected immediately.

## 3. Realtime Live Update Flow
* Lecturer modifies class syllabus or coursework in the portal.
* Changes are written directly to Firebase Realtime Database.
* Firebase automatically pushes delta updates over persistent WebSocket channels to all listening student screens instantly.
