import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CasesModule } from './cases/cases.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Case } from './cases/cases.entity';
import { DataSource } from 'typeorm';
import { UsersModule } from './users/users.module';
import { User } from './users/users.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        // modify db connection for production to use postgres
        if (process.env.NODE_ENV === 'production') {
          return {
            type: 'postgres',
            url: process.env.DATABASE_URL || config.get<string>('DATABASE_URL'),
            entities: [Case, User],
            ssl: {
              rejectUnauthorized: false,
            },
            migrationsRun: false,
            synchronize: true,
          };
        }

        // otherwise use development sqlite db
        return {
          type: 'sqlite',
          database: config.get<string>('DB_NAME'),
          synchronize: true,
          entities: [Case, User],
        };
      },
    }),
    CasesModule,
    UsersModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
