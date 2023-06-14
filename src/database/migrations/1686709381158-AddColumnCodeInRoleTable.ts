import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm'

export class AddColumnCodeInRoleTable1686709381158
  implements MigrationInterface
{
  name = 'AddColumnCodeInRoleTable1686709381158'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'roles',
      new TableColumn({
        name: 'code',
        type: 'varchar',
        isNullable: false,
        isUnique: true,
      }),
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('roles', 'code')
  }
}
