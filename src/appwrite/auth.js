import config from "../config/config";
import { Client, Account, ID } from "appwrite";

export class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(config.appwriteUrl) // Appwrite API endpoint
            .setProject(config.appwriteProjectId); // Your project ID
        this.account = new Account(this.client); // Initialize the Account object
    }

    // Create an account and log in
    async createAccount({ email, password, name }) {
        try {
            console.log("Creating account...");
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if (userAccount) {
                // Call the login method after creating the account
                return this.login({ email, password });
            } else {
                return userAccount; // Handle failed account creation
            }
        } catch (error) {
            console.error("Appwrite service :: createAccount :: error", error.message);
        }
    }

    // Log in user and create a session
    async login({ email, password }) {
        try {
            console.log("Logging in...");
            // Using createEmailSession or createEmailPasswordSession
            return await this.account.createEmailPasswordSession(email, password);
        } catch (error) {
            console.error("Appwrite service :: login :: error", error.message);
        }
    }

    // Get current logged-in user
    async getCurrentUser() {
        try {
            console.log("Fetching current user...");
            const session = await this.account.getSession('current');
            if (session) {
                // If session exists, get user details
                const user = await this.account.get();
                console.log("User fetched:", user);
                return user;
            } else {
                console.log("No active session found.");
                return null;
            }
        } catch (error) {
            console.error("Appwrite service :: getCurrentUser :: error", error.message);
        }

        return null;
    }

    // Log out the current user
    async logout() {
        try {
            console.log("Logging out...");
            await this.account.deleteSessions();
        } catch (error) {
            console.error("Appwrite service :: logout :: error", error.message);
        }
    }
}

const authService = new AuthService();
export default authService;
