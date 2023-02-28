import { CacheModule, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { redisStore } from 'cache-manager-redis-yet';
// import { ClientOpts } from 'redis';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forRoot(
      'mongodb+srv://rajul:83lDka3VoQHpNzTl@redisotp.tubjznt.mongodb.net/Authentication',
    ),
    CacheModule.register({
      host: 'localhost', //default host
      store: redisStore,
      port: 6379, //default port,
      isGlobal: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
