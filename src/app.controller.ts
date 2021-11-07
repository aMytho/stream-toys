import { Controller, Get, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppService } from './app.service';
import { ApiService } from './glimesh/api/api.service';
import { AuthService } from './glimesh/auth/auth.service';

@Controller()
export class AppController {
    constructor(
        private readonly appService: AppService,
        private settingsService: ConfigService,
        @Inject('ASYNC_CONNECTION')
        private authService: AuthService,
        private apiService: ApiService
    ) { }

    @Get()
    getHello(): string {
        return this.appService.getHello();
    }

    @Get('/settings')
    getSettings(): string {
        return this.settingsService.get('paimonSecretID');
    }

    @Get("auth")
    async getAuth() {
        return await this.apiService.getStreamStatus();
    }
}
