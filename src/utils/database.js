// Database integration for Medkit AI - WhatsApp + Web App
// This file handles user data synchronization between platforms

import { MongoClient } from 'mongodb';
import { DB_CONFIG } from '../config/database.js';

class MedkitDatabase {
  constructor() {
    this.client = null;
    this.db = null;
    this.conversationsCollection = null;
  }

  async connect() {
    try {
      this.client = new MongoClient(DB_CONFIG.MONGODB_URI);
      await this.client.connect();
      this.db = this.client.db(DB_CONFIG.DB_NAME);
      this.conversationsCollection = this.db.collection(DB_CONFIG.COLLECTIONS.CONVERSATIONS);
      console.log("✅ Connected to MongoDB");
      return true;
    } catch (error) {
      console.error("❌ MongoDB connection error:", error);
      return false;
    }
  }

  async disconnect() {
    if (this.client) {
      await this.client.close();
    }
  }

  // Get or create user profile (works for both WhatsApp and web)
  async getOrCreateProfile(identifier, platform = 'web') {
    const now = new Date();
    
    // For WhatsApp: identifier is phone number
    // For web: identifier is email or Google ID
    const query = platform === 'whatsapp' 
      ? { sender: identifier }
      : { "profile.email": identifier };

    const doc = await this.conversationsCollection.findOne(query);
    
    if (doc && doc.profile) {
      // Update last_updated
      await this.conversationsCollection.updateOne(
        query,
        { $set: { "profile.last_updated": now } }
      );
      return doc.profile;
    } else {
      // Create new profile
      const newProfile = {
        name: null,
        age: null,
        gender: null,
        location: null,
        profession: null,
        medical_history: [],
        email: platform === 'web' ? identifier : null,
        phone: platform === 'whatsapp' ? identifier : null,
        google_id: null,
        platform: platform,
        created_at: now,
        last_updated: now
      };

      const insertDoc = platform === 'whatsapp' 
        ? { sender: identifier, profile: newProfile, history: [] }
        : { profile: newProfile, history: [] };

      await this.conversationsCollection.insertOne(insertDoc);
      return newProfile;
    }
  }

  // Update profile field
  async updateProfileField(identifier, key, value, platform = 'web') {
    const now = new Date();
    const query = platform === 'whatsapp' 
      ? { sender: identifier }
      : { "profile.email": identifier };

    const update = {
      [`profile.${key}`]: value,
      "profile.last_updated": now
    };

    await this.conversationsCollection.updateOne(query, { $set: update });
    return true;
  }

  // Link WhatsApp and web accounts
  async linkAccounts(whatsappPhone, webEmail) {
    const now = new Date();
    
    // Find both accounts
    const whatsappDoc = await this.conversationsCollection.findOne({ sender: whatsappPhone });
    const webDoc = await this.conversationsCollection.findOne({ "profile.email": webEmail });

    if (whatsappDoc && webDoc) {
      // Merge profiles - keep the more complete one
      const mergedProfile = {
        ...whatsappDoc.profile,
        ...webDoc.profile,
        phone: whatsappPhone,
        email: webEmail,
        last_updated: now
      };

      // Update both documents to point to the same profile
      await this.conversationsCollection.updateOne(
        { sender: whatsappPhone },
        { $set: { profile: mergedProfile } }
      );

      await this.conversationsCollection.updateOne(
        { "profile.email": webEmail },
        { $set: { profile: mergedProfile } }
      );

      return mergedProfile;
    }
    return null;
  }

  // Get user by email (for web app)
  async getUserByEmail(email) {
    const doc = await this.conversationsCollection.findOne({ "profile.email": email });
    return doc ? doc.profile : null;
  }

  // Get user by phone (for WhatsApp)
  async getUserByPhone(phone) {
    const doc = await this.conversationsCollection.findOne({ sender: phone });
    return doc ? doc.profile : null;
  }

  // Add conversation to history
  async addConversation(identifier, message, response, platform = 'web') {
    const now = new Date();
    const conversation = {
      timestamp: now,
      message,
      response,
      platform
    };

    const query = platform === 'whatsapp' 
      ? { sender: identifier }
      : { "profile.email": identifier };

    await this.conversationsCollection.updateOne(
      query,
      { $push: { history: conversation } }
    );
  }

  // Get conversation history
  async getConversationHistory(identifier, platform = 'web') {
    const query = platform === 'whatsapp' 
      ? { sender: identifier }
      : { "profile.email": identifier };

    const doc = await this.conversationsCollection.findOne(query);
    return doc ? doc.history || [] : [];
  }

  // Get profile summary (for display)
  async getProfileSummary(identifier, platform = 'web') {
    const profile = await this.getOrCreateProfile(identifier, platform);
    
    const summary = [];
    if (profile.name) summary.push(`Name: ${profile.name}`);
    if (profile.age) summary.push(`Age: ${profile.age}`);
    if (profile.gender) summary.push(`Gender: ${profile.gender}`);
    if (profile.location) summary.push(`Location: ${profile.location}`);
    if (profile.profession) summary.push(`Profession: ${profile.profession}`);
    if (profile.medical_history && profile.medical_history.length > 0) {
      summary.push(`Medical History: ${profile.medical_history.join(', ')}`);
    }

    return summary.length > 0 ? summary.join(' | ') : 'Profile is empty.';
  }
}

// Export singleton instance
const medkitDB = new MedkitDatabase();
export default medkitDB; 