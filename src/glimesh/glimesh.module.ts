import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';

import { ChatService } from './chat/chat.service';
import { ApiService } from './api/api.service';
import { AuthService } from './auth/auth.service';
import { AuthFactory } from './glimesh.factory';


@Module({
    imports: [HttpModule, ConfigModule],
    providers: [AuthService, AuthFactory, ChatService, ApiService],
    exports: [AuthFactory, ApiService]
})
export class GlimeshModule { }
