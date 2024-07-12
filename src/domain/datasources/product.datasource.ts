import { RegisterProductDto } from "../dtos/product/register-product.dto";
import { UpdateProductDto } from "../dtos/product/update-product.dto";
import { ProductEntity } from "../entities/product.entity";

export abstract class ProductDatasource {
    abstract getProducts(): Promise<ProductEntity[]>;
    abstract getProductById(id: number): Promise<ProductEntity | null>;
    abstract getProductByUuid(uuid: string): Promise<ProductEntity | null>;
    abstract createProduct(product: RegisterProductDto): Promise<ProductEntity>;
    abstract updateProduct(product: UpdateProductDto): Promise<ProductEntity>;
    abstract deleteProduct(id: number): Promise<ProductEntity>;
}