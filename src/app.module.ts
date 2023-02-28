import { CacheModule, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { redisStore } from 'cache-manager-redis-yet';
// import { ClientOpts } from 'redis';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    AuthModule,
    MongooseModule.forRoot(`${process.env.DB_URL}`),
    CacheModule.register({
      host: `${process.env.REDIS_HOST}`,
      store: redisStore,
      port: `${process.env.REDIS_PORT}`,
      isGlobal: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
