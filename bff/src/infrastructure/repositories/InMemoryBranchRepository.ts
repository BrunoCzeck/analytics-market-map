import { Branch } from '../../domain/entities/Branch';
import { IBranchRepository } from '../../domain/repositories/IBranchRepository';
import { branchesMock } from '../mock-data/branches';

export class InMemoryBranchRepository implements IBranchRepository {
  private branches: Branch[] = branchesMock;

  async findAll(): Promise<Branch[]> {
    return this.branches;
  }

  async findById(id: string): Promise<Branch | null> {
    return this.branches.find(b => b.id === id) ?? null;
  }

  async findByState(uf: string): Promise<Branch[]> {
    return this.branches.filter(b => b.state === uf);
  }
}
