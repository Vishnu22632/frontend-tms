import axios from "axios";

const tms_api_url = "http://localhost:9595/api/users";

class UserService{
    // Fetch all users
    getUsers(){
        return axios.get(tms_api_url);  
    }

    // save a user
    saveUser(user){
        return axios.post(tms_api_url,user);
    }

    // Update a user
    updateUser(id,user){
        return axios.put(`${tms_api_url}/${id}`,user);
    }

     // Delete a user
     deleteUser(id) {
       return axios.delete(`${tms_api_url}/${id}`);
     }
}

export default new UserService();