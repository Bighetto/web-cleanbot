import { ResultsCounterExecutionRestModel } from "./results.counter.execution.rest.model";

export interface FindCsvStatusRestModel {
    idCsv: number;
    status: string;
    results: ResultsCounterExecutionRestModel;
  }