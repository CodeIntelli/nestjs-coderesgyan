import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { CreateUserProfileDto } from 'src/users/dtos/CreateProfile.dto';
import { CreateUserDto } from 'src/users/dtos/CreateUser.dto';
import { UpdateUserDto } from 'src/users/dtos/UpdateUser.dto';
import { UsersService } from 'src/users/services/users/users.service';

@Controller('user')
export class UsersController {

    constructor(private userService: UsersService) {
    }

    @Get()
    async getUsers() {
        const user = await this.userService.findUser();
        return user;
    }

    @Post()
    createUser(@Body() createUserDto: CreateUserDto) {
        this.userService.createUser(createUserDto)
    }

    @Put(':id')
    async updateUserById(
        @Param('id') id,
        @Body() updateUserDto: UpdateUserDto) {
        await this.userService.updateUser(id, updateUserDto)
    }

    @Delete(':id')
    async deleteUserById(@Param('id') id: any) {
        await this.userService.deleteUser(id);
    }

    @Post('profiles/:id')
    createUserProfile(
        @Param('id') id: any, @Body() CreateUserProfileDto: CreateUserProfileDto) {
        return this.userService.createUserProfile(id, CreateUserProfileDto)
    }

}
