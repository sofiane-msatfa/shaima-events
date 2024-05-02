import { injectable, unmanaged } from 'inversify';
import { Model, Document } from 'mongoose';

@injectable()
abstract class BaseRepository<T extends Document> {
    // constructor(@unmanaged() private model: Model<T>) {}
    abstract model: Model<T>;

    async create(data: Partial<T>): Promise<T> {
        return await this.model.create(data);
    }

    async findById(id: string): Promise<T | null> {
        return await this.model.findById(id).exec();
    }

    async findOne(filter: any): Promise<T | null> {
        return await this.model.findOne(filter).exec();
    }

    async findAll(filter: any): Promise<T[]> {
        return await this.model.find(filter).exec();
    }

    async update(id: string, data: Partial<T>): Promise<T | null> {
        return await this.model.findByIdAndUpdate(id, data, { new: true }).exec();
    }

    async delete(id: string): Promise<boolean> {
        const result = await this.model.findByIdAndDelete(id).exec();
        return !!result;
    }

}

export default BaseRepository;
