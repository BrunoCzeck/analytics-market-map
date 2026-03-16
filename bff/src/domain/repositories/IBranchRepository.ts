import { Branch } from '../entities';

export interface IBranchRepository {
  findAll(): Promise<Branch[]>;
  findById(id: string): Promise<Branch | null>;
  findByState(uf: string): Promise<Branch[]>;
}
