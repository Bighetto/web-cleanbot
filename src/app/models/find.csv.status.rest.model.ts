import { ResultsCounterExecutionRestModel } from "./results.counter.execution.rest.model";

export interface FindCsvStatusRestModel {
    idCsv: string;
    status: string;
    results: ResultsCounterExecutionRestModel;
  }