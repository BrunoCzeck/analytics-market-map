import { Branch } from '../../domain/entities/branch';
import { IBranchRepository } from '../../domain/repositories/IBranchRepository';

interface GetBranchesInput {
  state?: string;
  since?: string; // Filtra pela data (Formato: ISO)
}

export class GetBranches {
  constructor(private readonly branchRepository: IBranchRepository) {}

  async execute(input: GetBranchesInput = {}): Promise<Branch[]> {
    let branches = input.state
      ? await this.branchRepository.findByState(input.state)
      : await this.branchRepository.findAll();

    if (input.since) {
      const sinceDate = new Date(input.since);
      branches = branches.filter(b => new Date(b.openedAt) >= sinceDate);
    }

    return branches;
  }
}
