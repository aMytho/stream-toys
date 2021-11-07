import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { GlimeshModule } from './glimesh/glimesh.module';
@Module({
  imports: [ConfigModule.forRoot(), GlimeshModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
