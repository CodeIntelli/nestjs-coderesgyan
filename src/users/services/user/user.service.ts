import { Injectable } from '@nestjs/common';
import { CreateUserType } from 'src/users/utils/types';

@Injectable()
export class UserService {
    private fakeUsers = [
        { username: 'Anson', email: 'anson@anson.com', language: 'en', tech: 'node' },
        { username: 'Cory', email: 'cory@anson.com', language: 'en', tech: 'node' },
        { username: 'Greg', email: 'greg@anson.com', language: 'hi', tech: 'node' },
    ];
    fetchUser() {
        return this.fakeUsers;
    }

    createUser(userDetails: CreateUserType) {
        this.fakeUsers.push(userDetails);
        return;
    }

    fetchUserById(id: number) {
        return { id, usename: "rinkal", email: "rinkal@gmail.com" }
    }

}
