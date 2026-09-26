import mongoose from "mongoose";
import {
  UserModel,
  ChallengeModel,
  TeamModel,
  MessageModel,
  CSRSponsorshipModel,
  SubscriptionModel,
  ProjectModel,
  NotificationModel,
} from "./models";
import {
  INITIAL_CHALLENGES,
  INITIAL_USERS,
  INITIAL_CSR_SPONSORSHIPS,
  INITIAL_SUBSCRIPTIONS,
} from "../src/data/mockData";

export interface MongoConnectionState {
  isConnected: boolean;
  databaseName: string;
  uriConfigured: boolean;
  error?: string;
  lastChecked?: string;
}

/**
 * Retrieves the configured MongoDB target database name
 */
export function getTargetDatabaseName(rawUri?: string): string {
  const envDbName = process.env.MONGODB_DB_NAME;

  if (envDbName && envDbName.trim()) {
    return envDbName.trim();
  }

  if (rawUri) {
    try {
      const trimmed = rawUri.trim();
      const match = trimmed.match(/^mongodb(?:\+srv)?:\/\/[^/]+\/([^?]+)/);
      if (match && match[1] && match[1] !== "admin" && match[1] !== "test") {
        return decodeURIComponent(match[1]);
      }
    } catch {
      // Fallback
    }
  }

  return "CIVIORA_SIH";
}

let connectionState: MongoConnectionState = {
  isConnected: false,
  databaseName: getTargetDatabaseName(),
  uriConfigured: false,
};

/**
 * Normalizes connection string to ensure target MongoDB database is selected
 */
export function getFormattedMongoUri(): { uri: string | undefined; dbName: string } {
  const raw = process.env.MONGODB_URI;

  if (!raw || raw.trim() === "") {
    return { uri: undefined, dbName: getTargetDatabaseName() };
  }

  let uri = raw.trim();
  const targetDbName = getTargetDatabaseName(uri);

  if (uri.startsWith("mongodb+srv://") || uri.startsWith("mongodb://")) {
    const urlParts = uri.split("?");
    const baseUrl = urlParts[0];
    const queryParams = urlParts[1] ? `?${urlParts[1]}` : "?retryWrites=true&w=majority";

    const lastSlashIdx = baseUrl.lastIndexOf("/");
    const protocolEndIdx = baseUrl.indexOf("://") + 3;

    if (lastSlashIdx < protocolEndIdx) {
      uri = `${baseUrl}/${targetDbName}${queryParams}`;
    } else {
      const pathPart = baseUrl.substring(lastSlashIdx + 1);
      if (!pathPart || pathPart === "test" || pathPart === "admin") {
        uri = `${baseUrl.substring(0, lastSlashIdx)}/${targetDbName}${queryParams}`;
      }
    }
  }

  return { uri, dbName: targetDbName };
}

/**
 * Connects to MongoDB Atlas using Mongoose and auto-seeds initial demo data if database is empty
 */
export async function connectToDatabase(): Promise<MongoConnectionState> {
  const { uri, dbName } = getFormattedMongoUri();
  connectionState.databaseName = dbName;
  connectionState.lastChecked = new Date().toISOString();

  if (!uri) {
    connectionState.isConnected = false;
    connectionState.uriConfigured = false;
    connectionState.error = "MONGODB_URI environment variable is not configured.";
    console.warn("⚠️  [MongoDB] MONGODB_URI is not set. Please configure MONGODB_URI in settings/environment variables.");
    return connectionState;
  }

  connectionState.uriConfigured = true;

  try {
    if (mongoose.connection.readyState === 1) {
      connectionState.isConnected = true;
      connectionState.error = undefined;
      return connectionState;
    }

    console.log(`🔄 [MongoDB] Connecting to MongoDB Atlas database '${dbName}'...`);
    await mongoose.connect(uri, {
      dbName: dbName,
      serverSelectionTimeoutMS: 5000,
    });

    connectionState.isConnected = true;
    connectionState.error = undefined;
    console.log(`✅ [MongoDB] Connected successfully to MongoDB Atlas database: ${dbName}`);

    await autoSeedInitialData();

    return connectionState;
  } catch (err: any) {
    connectionState.isConnected = false;
    connectionState.error = err.message || "MongoDB connection failed.";
    console.error("❌ [MongoDB] Connection error:", err.message);
    return connectionState;
  }
}

export function getDatabaseState(): MongoConnectionState {
  const readyState = mongoose.connection.readyState;
  connectionState.isConnected = readyState === 1;
  connectionState.databaseName = getTargetDatabaseName();
  connectionState.lastChecked = new Date().toISOString();
  return connectionState;
}

/**
 * Seeds initial demo records ONLY when collections are empty, tagging them with isDemo: true
 */
async function autoSeedInitialData() {
  try {
    const challengeCount = await ChallengeModel.countDocuments();
    if (challengeCount === 0) {
      console.log("🌱 [MongoDB] Seeding initial challenge records...");
      const seededChallenges = INITIAL_CHALLENGES.map((c: any) => ({
        ...c,
        customId: c.id,
        isDemo: true,
        isRealSubmission: c.isRealSubmission ?? false,
      }));
      await ChallengeModel.insertMany(seededChallenges);
      console.log(`✅ [MongoDB] Seeded ${seededChallenges.length} initial challenges.`);
    }

    const userCount = await UserModel.countDocuments();
    if (userCount === 0) {
      console.log("🌱 [MongoDB] Seeding initial verified role demo users...");
      const seededUsers = INITIAL_USERS.map((u: any) => ({
        ...u,
        customId: u.id,
      }));
      await UserModel.insertMany(seededUsers);
      console.log(`✅ [MongoDB] Seeded ${seededUsers.length} role demo users.`);
    }

    const csrCount = await CSRSponsorshipModel.countDocuments();
    if (csrCount === 0) {
      const seededCSR = INITIAL_CSR_SPONSORSHIPS.map((c: any) => ({
        ...c,
        customId: c.id,
      }));
      await CSRSponsorshipModel.insertMany(seededCSR);
    }

    const subCount = await SubscriptionModel.countDocuments();
    if (subCount === 0) {
      const seededSub = INITIAL_SUBSCRIPTIONS.map((s: any) => ({
        ...s,
        customId: s.id,
      }));
      await SubscriptionModel.insertMany(seededSub);
    }

    const teamCount = await TeamModel.countDocuments();
    if (teamCount === 0) {
      await TeamModel.insertMany([
        {
          customId: "team-01",
          name: "AgriMesh Innovators",
          universityName: "Birla Institute of Technology (BIT) Mesra",
          department: "Department of Electrical & Electronics Engineering",
          leaderId: "usr-student-demo",
          leaderName: "Aryan Tiwari",
          leaderEmail: "student@civiora.gov.in",
          members: [
            { name: "Aryan Tiwari", email: "student@civiora.gov.in", role: "Team Leader & IoT Architect" },
            { name: "Priya Sharma", email: "priya.s@bitmesra.ac.in", role: "Solar Circuit Designer" },
            { name: "Rohit Verma", email: "rohit.v@bitmesra.ac.in", role: "Mobile App Developer" },
          ],
          skills: ["Embedded Systems", "IoT Sensors", "Solar Inverter Design", "Agronomy"],
          challengeId: "CH-2026-001",
          challengeTitle: "Smart Solar-Powered Micro-Irrigation for Smallholder Tribal Farmers",
          status: "active",
        },
        {
          customId: "team-02",
          name: "AquaPure Innovators",
          universityName: "IIT (ISM) Dhanbad",
          department: "Department of Environmental Science & Engineering",
          leaderId: "usr-student-02",
          leaderName: "Aman Verma",
          leaderEmail: "aman.v@iitism.ac.in",
          members: [
            { name: "Aman Verma", email: "aman.v@iitism.ac.in", role: "Lead Chemical Engineer" },
            { name: "Kavita Das", email: "kavita.d@iitism.ac.in", role: "Water Quality Analyst" },
          ],
          skills: ["Chemical Engineering", "Water Quality Analytics", "Membrane Technology"],
          challengeId: "CH-2026-002",
          challengeTitle: "Low-Cost Portable Arsenic & Fluoride Water Filtration Unit",
          status: "active",
        },
      ] as any[]);
    }

    const msgCount = await MessageModel.countDocuments();
    if (msgCount === 0) {
      await MessageModel.insertMany([
        {
          customId: "msg-01",
          challengeId: "CH-2026-001",
          senderId: "usr-cit-01",
          senderName: "Rameshwar Munda (Citizen Submitter)",
          senderRole: "citizen",
          text: "Namaskar team! The water level in our Angara village borewell is around 45 feet currently. Looking forward to testing your solar pump sensor kit.",
          read: true,
          isRead: true,
          timestamp: new Date(Date.now() - 86400000 * 3).toISOString(),
        },
        {
          customId: "msg-02",
          challengeId: "CH-2026-001",
          senderId: "usr-student-demo",
          senderName: "Aryan Tiwari (Student Team Lead)",
          senderRole: "student",
          text: "Namaskar Rameshwar ji! Our team at BIT Mesra has built the telemetry prototype board. Dr. Alok Ranjan (Faculty Mentor) has verified our circuit design. We are coming to Hesal village this Saturday with Tata Steel Tech engineers for calibration!",
          read: true,
          isRead: true,
          timestamp: new Date(Date.now() - 86400000 * 2).toISOString(),
        },
        {
          customId: "msg-03",
          challengeId: "CH-2026-001",
          senderId: "usr-faculty-demo",
          senderName: "Dr. Alok Ranjan (Faculty Mentor)",
          senderRole: "faculty",
          text: "I have reviewed the LoRa frequency allocation and moisture threshold calculations. Please ensure the waterproof IP67 casing is securely fastened during the field installation.",
          read: true,
          isRead: true,
          timestamp: new Date(Date.now() - 86400000 * 1).toISOString(),
        },
      ] as any[]);
    }
  } catch (err: any) {
    console.warn("⚠️ [MongoDB] Auto-seeding warning:", err.message);
  }
}
