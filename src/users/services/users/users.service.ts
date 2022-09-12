import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile } from 'src/typeorm/entities/Profile';
import { User } from 'src/typeorm/entities/User';
import { createUserParams, updateUserParams } from 'src/utils/types';
import { Repository } from 'typeorm';
import { CreateUserProfileParams } from '../../../utils/types';

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
        @InjectRepository(Profile) private profileRepository: Repository<Profile>
    ) { }

    async findUser() {
        return this.userRepository.find({ relations: ['profile'] });

    }

    createUser(userDetails: createUserParams) {
        const newUser = this.userRepository.create({ ...userDetails, createdAt: new Date() });
        return this.userRepository.save(newUser);
    }

    updateUser(id, updateUserDetails: updateUserParams) {
        return this.userRepository.update(id, updateUserDetails);
    }

    deleteUser(id: any) {
        return this.userRepository.delete(id);
    }

    async createUserProfile(id, CreateUserProfileDetails: CreateUserProfileParams) {
        const user = await this.userRepository.findOne(id)
        if (!user) {
            throw new HttpException('User not found,can not create a profile', HttpStatus.BAD_REQUEST)
        }

        const newUser = this.profileRepository.create(CreateUserProfileDetails);
        const userprofile = await this.profileRepository.save(newUser)
        user.profile = userprofile;
        return this.userRepository.save(user);
    }

}
