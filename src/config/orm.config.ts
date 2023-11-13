import  { ConfigService } from '@nestjs/config'
import { TypeOrmModuleOptions } from '@nestjs/typeorm'
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions'

 type ConfigType = TypeOrmModuleOptions & PostgresConnectionOptions;
 type ConnectionOptions = ConfigType;

 export const ORMCOnfig = async( ConfigService: ConfigService): Promise<ConnectionOptions> => ({
    type: 'postgres',
    host: ConfigService.get('DATABASE_HOST'),
    port: ConfigService.get('DATABASE_PORT'),
    username: ConfigService.get('DATABASE_USERNAME'),
    password: ConfigService.get('DATABASE_PWD'),
    database: ConfigService.get('DATABASE_NAME'),
    entities: ['dist/**/*.entity.ts'],
    synchronize: false, // ONLY IN THE DEVELOPMENT - BRISALO NAM BO IZ BAZE CE DAMO TRUE
    ssl: true,
    extra: {
        ssl: {
            rejectUnathorized: false,
        },
    },
 })