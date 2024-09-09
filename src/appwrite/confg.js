import config from "../config/config";
import {  ID, Databases, Storage, Query, Client } from "appwrite";

export class Service{

        client = new Client();
        databases;
        bucket;

        constructor(){
            this.client
                .setEndpoint(config.appwriteUrl)
                .setProject(config.appwriteProjectId);
            this.databases = new Databases(this.client);
            this.bucket = new Storage(this.client);
        }

        async createPost({title, slug, content, featuredImage, status, userId}){
            try {
                console.log("confg content value: ",content)
                return await this.databases.createDocument(
                    config.appwriteDatabaseId,
                    config.appwriteCollectionId,
                    slug, 
                    {
                        title, 
                        status,
                        content,
                        userId,
                        featuredImage
                    }
                );
            } catch (error) {
                console.log("AppWrite Service :: createPost :: error",error);
            }
        }

        async updatePost(slug, {title, content, featuredImage, status}){
            try {
                return await this.databases.updateDocument(
                    config.appwriteDatabaseId, 
                    config.appwriteCollectionId,
                    slug,
                    {
                        title,
                        content,
                        featuredImage,
                        status
                    }
                );
            } catch (error) {
                console.log("AppWrite service :: updatePost:: error",error);
            }
        }
    
        async deletePost(slug){
            try {
                await this.databases.deleteDocument(
                    config.appwriteDatabaseId,
                    config.appwriteCollectionId,
                    slug,
                )
                return true;
            } catch (error) {
                console.log("Appwrite service :: deletePost :: error",error);
                return false;
            }
        }

        async getPost(slug){
            try {
                return await this.databases.getDocument(
                    config.appwriteDatabaseId,
                    config.appwriteCollectionId,
                    slug
                )
            } catch (error) {
                console.log("Appwrite service :: getPost :: error",error);
                return false;
            }
        }

        async getPosts(queries = [Query.equal("status","active")]){
            try {
                return await this.databases.listDocuments(
                    config.appwriteDatabaseId,
                    config.appwriteCollectionId,
                    queries,
                )
            } catch (error) {
                console.log("Appwrite service :: getPosts :: error",error);
                return false;
            }
        }

        // file upload service
        async uploadFile(file){
            try {
                return await this.bucket.createFile(
                    config.appwriteBucketId,
                    ID.unique(),
                    file
                )
            } catch (error) {
                console.log("Appwrite service :: uploadFile :: error",error);
                return false;
            }
        }

        async deleteFile(fileId){
            try {
                await this.bucket.deleteFile(
                    config.appwriteBucketId,
                    fileId
                )
                return true;
            } catch (error) {
                console.log("Appwrite service :: deleteFile :: error",error);
                return false;
            }
        }

        getFilePreview(fileId){
            return this.bucket.getFilePreview(
                config.appwriteBucketId,
                fileId
            )
        }

        async  getPostsByUser(userId) {
            try {
              return await this.databases.listDocuments(config.appwriteDatabaseId, config.appwriteCollectionId, [
                Query.equal('userId', userId)
              ]);
            } catch (error) {
              throw new Error(`Error fetching posts for user: ${error.message}`);
            }
          }
}

const service = new Service();
export default service;