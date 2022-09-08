import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, ParseBoolPipe, ParseIntPipe, Post, Put, Query, Req, Res, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { Request, Response } from 'express';
import { CreateUserDto } from 'src/users/dtos/CreateUser.dto';
import { AuthGuard } from 'src/users/guards/auth.guard';
import { ValidateCreateUserPipePipe } from 'src/users/pipes/validate-create-user-pipe.pipe';
import { UserService } from 'src/users/services/user/user.service';

@Controller('user')
export class UserController {
    constructor(private userService: UserService) { }

    // * single get method
    @Get()
    @UseGuards(AuthGuard)
    getUsers() {
        return this.userService.fetchUser();
    }

    // * get method with name 
    @Get('post')
    getUsersPost() {
        return [
            {
                userName: "mans", email: "mary@gmail.com", posts:
                    [
                        {
                            id: 1,
                            title: "electric"
                        },
                        {
                            id: 2,
                            title: "electric"
                        },
                    ],
            },
        ]
    }

    // * get method with nested name 
    @Get('post/comment')
    getUsersPostComments() {
        return [
            {
                id: 1,
                title: "comment",
                comments: [],
            },

        ]
    }

    // [ > ] way 1 -----> post method like old code similar to typescript
    @Post('user/adduser')
    createUser(@Req() request: Request, @Res() response: Response) {
        response.send('created')
    }

    // [ > ] way 2 -----> post method based nest
    @Post('postuser')
    @UsePipes(new ValidationPipe())
    postUser(@Body(ValidateCreateUserPipePipe) userData: CreateUserDto) {

        return this.userService.createUser(userData)

    }

    // * get api with params
    // @Get(':id')
    // getUserById(@Param('id', ParseIntPipe) id: number) {
    //     return { id }
    // }

    // * get api with multiple params
    @Get(':id/:postId')
    getUserBymanyId(@Param('id') id: string, @Param('postId') postId: string) {

        return { id, postId }
    }

    // * get with query params
    @Get('final')
    getData(@Query('find', ParseBoolPipe) find: boolean) {
        console.log(find)
        return [
            {
                userName: "mans", email: "mary@gmail.com", posts:
                    [
                        {
                            id: 1,
                            title: "electric"
                        },
                    ],
            },
        ]
    }

    // * get with params validation
    @Get(':id')
    getUserById(@Param('id', ParseIntPipe) id: number) {
        const user = this.userService.fetchUserById(id)
        if (!user) {
            throw new HttpException('User not found', HttpStatus.BAD_REQUEST)
        }
        return user;
    }


    // [ . ] update method edit user
    @Put(':id')
    update(@Param('id') id: string, @Body() updateCatDto: CreateUserDto) {
        return `This action updates a #${id}`;
    }

    // [ - ] delete method with params
    @Delete(':id')
    remove(@Param('id') id: string) {
        return `This action removes a #${id}`;
    }
}
