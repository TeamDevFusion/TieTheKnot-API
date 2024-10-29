import { VendorTypeEntity } from "src/modules/user/entities";
import { In, MigrationInterface, QueryRunner } from "typeorm";

export class VendorTypeSeed1730232158343 implements MigrationInterface {

    vendorTypes = [
        {
            label: "Venues",
            name: "Venue",
            icon: "https://img.icons8.com/?size=100&id=eIFSPeynRDyl&format=png&color=000000",
        },
        {
            label: "Photographers",
            name: "Photographer",
            icon: "https://img.icons8.com/?size=100&id=zA8CKq2IOOWF&format=png&color=000000",
        },
        {
            label: "Videographers",
            name: "Videographer",
            icon: "https://img.icons8.com/?size=100&id=o7Ls0zwvTkO3&format=png&color=000000",
        },
        {
            label: "Florists",
            name: "Florist",
            icon: "https://img.icons8.com/?size=100&id=zE9uwXycbCLv&format=png&color=000000",
        },
        {
            label: "Cakes",
            name: "Cake",
            icon: "https://img.icons8.com/?size=100&id=wDw9A4PRw9SG&format=png&color=000000",
        },
        {
            label: "Bands/DJs",
            name: "Band/DJ",
            icon: "https://img.icons8.com/?size=100&id=hcVamhP3QzTD&format=png&color=000000",
        },
        {
            label: "Makeup Artists",
            name: "Makeup Artist",
            icon: "https://img.icons8.com/?size=100&id=vmqv135kp5Ty&format=png&color=000000",
        },
        {
            label: "Designers",
            name: "Designer",
            icon: "https://img.icons8.com/?size=100&id=5pe7e3Q7l5XO&format=png&color=000000",
        },
        {
            label: "Planners",
            name: "Planner",
            icon: "https://img.icons8.com/?size=100&id=txE3iVQ7RBlC&format=png&color=000000",
        },
        {
            label: "Religious",
            name: "Religious",
            icon: "https://img.icons8.com/?size=100&id=zFMhE88YdSqt&format=png&color=000000",
        },
        {
            label: "Furniture/Rentals",
            name: "Furniture/Rental",
            icon: "https://img.icons8.com/?size=100&id=mkKY8gAastgc&format=png&color=000000",
        },
        {
            label: "Luxury Cars",
            name: "luxury Car",
            icon: "https://img.icons8.com/?size=100&id=qRo6mXkL8iFE&format=png&color=000000",
        },
    ]

    public async up(queryRunner: QueryRunner): Promise<void> {
        const dtos = this.vendorTypes.map(vendorType => ({
            name: vendorType.name,
            label: vendorType.label,
            icon: vendorType.icon,
            status: true,
        } as Partial<VendorTypeEntity>));
        await queryRunner.manager.save(VendorTypeEntity, dtos);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.manager.delete(VendorTypeEntity, { name: In(this.vendorTypes.map(vendorType => vendorType.name)) });
    }

}
