import { MigrationInterface, QueryRunner } from 'typeorm';
import { UserEntity } from '../../modules/user/entities';
import configuration from '../../core/configs/configuration';
import { AuthService } from 'hichchi-nestjs-auth';
import { Role } from '../../core/enums/role.enum';

export class InitialSeed1730134067800 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const { password, salt } = AuthService.generatePassword(configuration().app.defaultPassword);
        const dto: Partial<UserEntity> = {
            email: "admin@ttk.com",
            firstName: "Super",
            lastName: "Admin",
            fullName: "Super Admin",
            role: Role.ADMIN,
            password,
            salt,
        }
        await queryRunner.manager.save(UserEntity, dto);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("DELETE FROM user WHERE username='admin@ttk.com';");
    }

}
