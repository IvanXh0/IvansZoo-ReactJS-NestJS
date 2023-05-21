import { AnimalsModule } from './animals/animals.module';
import { ConfigModule } from '@nestjs/config';
import { ZookeepersModule } from './zookeepers/zookeepers.module';
import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [AnimalsModule, ZookeepersModule, ConfigModule.forRoot(), AuthModule, UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
