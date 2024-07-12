import { ProductDatasource } from "../../domain/datasources/product.datasource";
import { RegisterProductDto } from "../../domain/dtos/product/register-product.dto";
import { UpdateProductDto } from "../../domain/dtos/product/update-product.dto";
import { ProductEntity } from "../../domain/entities/product.entity";
import { CustomError } from "../../domain/errors/custom.error";
import { ProductSequelize } from "../database/models/Product";
import { InstitutionDatasourceImpl } from "./institution.datasource.impl";
import { v4 as uuidv4 } from "uuid"

export class ProductDatasourceImpl extends ProductDatasource {
    async createProduct(registerProductDto: RegisterProductDto): Promise<ProductEntity> {
        try {
            const {name,abbreviation,has_iva,institution_id,price,productType} = registerProductDto;

            const institution = new InstitutionDatasourceImpl().getById(institution_id);
            if(!institution)throw CustomError.notFound("Institution not found");

            const [product,created] = await ProductSequelize.findOrCreate({
                where:{
                    abbreviation:abbreviation
                },
                defaults:{
                    name:name,
                    uuid:uuidv4(),
                    abbreviation:abbreviation,
                    has_iva:has_iva,
                    institution_id:institution_id,
                    price:price,
                    productType:productType
                }
            })

            return new ProductEntity(
                product.id,
                product.uuid,
                product.name,
                product.abbreviation,
                product.productType,
                product.price,
                product.has_iva,
                product.institution_id,
                product.createdAt,
                product.updatedAt,
                product.deletedAt
            )
        } catch (error) {            
            if (error instanceof CustomError) {
                throw error;
            }
            throw CustomError.internalSever();
        }
    }
    async deleteProduct(id: number): Promise<ProductEntity> {
        try {
            const product = await this.getProductById(id);
            if (!product) throw CustomError.notFound("Product not found");
            await ProductSequelize.destroy({
                where:{
                    id:id
                }
            })
            return product;
        } catch (error) {
            if (error instanceof CustomError) {
                throw error;
            }
            throw CustomError.internalSever();
        }
    }
    async getProductById(id: number): Promise<ProductEntity | null> {
        try {
            const product = await ProductSequelize.findByPk(id);
            if (!product) return null;
            return new ProductEntity(
                product.id,
                product.uuid,
                product.name,
                product.abbreviation,
                product.productType,
                product.price,
                product.has_iva,
                product.institution_id,
                product.createdAt,
                product.updatedAt,
                product.deletedAt
            )
        } catch (error) {
            if (error instanceof CustomError) {
                throw error;
            }
            throw CustomError.internalSever();
        }
    }
    async getProductByUuid(uuid: string): Promise<ProductEntity | null> {
        try {
            const product = await ProductSequelize.findOne({
                where:{
                    uuid:uuid
                }
            })
            if (!product) return null;
            return new ProductEntity(
                product.id,
                product.uuid,
                product.name,
                product.abbreviation,
                product.productType,
                product.price,
                product.has_iva,
                product.institution_id,
                product.createdAt,
                product.updatedAt,
                product.deletedAt
            )
        } catch (error) {
            if (error instanceof CustomError) {
                throw error;
            }
            throw CustomError.internalSever();
        }
    }
    async getProducts(): Promise<ProductEntity[]> {
        try {
            const products = await ProductSequelize.findAll();
            return products.map(product => new ProductEntity(
                product.id,
                product.uuid,
                product.name,
                product.abbreviation,
                product.productType,
                product.price,
                product.has_iva,
                product.institution_id,
                product.createdAt,
                product.updatedAt,
                product.deletedAt
            ))
        } catch (error) {
            if (error instanceof CustomError) {
                throw error;
            }
            throw CustomError.internalSever();
        }
    }
    async updateProduct(updateProductDto: UpdateProductDto): Promise<ProductEntity> {
        try {
            const {
                id,
                name,
                abbreviation,
                has_iva,
                institution_id,
                price,
                productType,
                uuid
            } = updateProductDto;

            let product = await this.getProductById(id);
            if (!product) throw CustomError.notFound(`Product with id ${id} not found`);
            const institution = new InstitutionDatasourceImpl().getById(institution_id);
            if (!institution) throw CustomError.notFound("Institution not found");

            await ProductSequelize.update({
                uuid:uuid,
                name:name,
                abbreviation:abbreviation,
                has_iva:has_iva,
                institution_id:institution_id,
                price:price,
                productType:productType
            },{
                where:{
                    id:product.id
                }
            })

            return new ProductEntity(
                product.id,
                uuid,
                name,
                abbreviation,
                productType,
                price,
                has_iva,
                institution_id,
                product.createdAt,
                product.updatedAt,
                product.deletedAt
            )
        } catch (error) {
            if (error instanceof CustomError) {
                throw error;
            }
            throw CustomError.internalSever();
        }
    }
}