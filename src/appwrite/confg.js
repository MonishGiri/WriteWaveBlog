import config from "../config/config";
import {  ID, Databases, Storage, Query, Client,} from "appwrite";
import axios from "axios";
// import { Users } from 'appwrite'
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
            // this.account = new Account(this.client);
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

        async getPosts(queries = [Query.equal("status","active"),Query.orderDesc("$createdAt")]){
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
                Query.orderDesc("$createdAt"),
                Query.equal('userId', userId)
              ]);
            } catch (error) {
              console.log(`Error fetching posts for user: ${error.message}`);
            }
        }

        async getUserById(userId) {
            try {
                const response = await axios.get(`${config.appwriteUrl}/users/${userId}`, {
                  headers: {
                    'X-Appwrite-Project': config.appwriteProjectId,
                    'X-Appwrite-Key': 'standard_9cde459580be253b5ba1dcd0a2cde59abd9a03d2a44cfb88623f32d1667400b6058dde38ca1569cf6bb5d7d7e27ceaec457dc0be00be535b4b2d4abc622a1fd72d02e824f11076f93a58845eaad7d54246d8229cbb55d54e0152e4976eca5cf46f08b5726df96e9114cf3cc98e33badf7b4be813e6a9be49be321744f1b69e65' ,
                  },
                });
                return response.data;
              } catch (error) {
                console.error('Error fetching user:', error);
                throw error;
              }
        }
}

const service = new Service();
export default service;