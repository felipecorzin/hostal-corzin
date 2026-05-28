import { Body, Controller, Post } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { Token } from './dto/token.dto';

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) {}

    @Post('register')
    register(
        @Body()
        registerDto: RegisterDto,
    ) {
        return this.authService.register(registerDto);
    }

    @Post('login')
    login(
        @Body()
        loginDto: LoginDto,
    ) {
        return this.authService.login(loginDto);
    }

    @Post('refresh')
    refresh(@Body() dto: Token) {
        return this.authService.refresh(dto);
    }

    // @Get('profile')
    // @Auth(Role.USER)
    // profile(@ActiveUser() user: UserActiveInterface) {
    //     console.log(user)
    //     return this.authService.profile(user);
    // }
}

