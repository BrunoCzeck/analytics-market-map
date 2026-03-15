import { Branch } from '../entities/Branch';

export interface IBranchRepository {
  findAll(): Promise<Branch[]>;
  findById(id: string): Promise<Branch | null>;
  findByState(uf: string): Promise<Branch[]>;
}
