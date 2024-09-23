import UserDaoMongoDB from '../dao/mongodb/user.dao.js';
import UserDTO from '../dto/user.dto.js';

const userDao = new UserDaoMongoDB();

export default class UserRepository {
    constructor(){
        this.dao = userDao;
    }

    async getUserById(id) {
        try {
            const user = await this.dao.getById(id);
            return new UserDTO(user);
        } catch (error) {
            throw new Error(error);
        }
    }

    async getAll() {
        try {
            const users = await this.dao.getAll();
            return users.map(user => new UserDTO(user));
        } catch (error) {
            throw new Error(error);
        }
    }
}