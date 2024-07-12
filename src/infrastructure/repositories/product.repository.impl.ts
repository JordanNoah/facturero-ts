import { ProductDatasource } from "../../domain/datasources/product.datasource";
import { RegisterProductDto } from "../../domain/dtos/product/register-product.dto";
import { UpdateProductDto } from "../../domain/dtos/product/update-product.dto";
import { ProductEntity } from "../../domain/entities/product.entity";
import { ProductRepository } from "../../domain/repositories/product.repository";

export class ProductRepositoryImpl implements ProductRepository {
    constructor(
        private readonly productDatasource: ProductDatasource
    ) {}

    async getProducts(): Promise<ProductEntity[]> {
        return this.productDatasource.getProducts();
    }

    async getProductById(id: number): Promise<ProductEntity | null> {
        return this.productDatasource.getProductById(id);
    }

    async getProductByUuid(uuid: string): Promise<ProductEntity | null> {
        return this.productDatasource.getProductByUuid(uuid);
    }

    async createProduct(product: RegisterProductDto): Promise<ProductEntity> {
        return this.productDatasource.createProduct(product);
    }

    async updateProduct(product: UpdateProductDto): Promise<ProductEntity> {
        return this.productDatasource.updateProduct(product);
    }

    async deleteProduct(id: number): Promise<ProductEntity> {
        return this.productDatasource.deleteProduct(id);
    }
}