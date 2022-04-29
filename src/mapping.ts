import {
  Contract,
  NewReport,
  ReportingLockChanged,
  TimeBasedRewardsChanged,
  TipAdded
} from "../generated/Contract/Contract"
import { NewReportEntity } from "../generated/schema"

export function handleNewReport(event: NewReport): void {
  let report = new NewReportEntity(event.block.timestamp.toHex());
  report._nonce = event.params._nonce;
  report._reward = event.params._reward;
  //Gives us the original query info in json object form
  //So long as its a legacy query
  report._queryData = event.params._queryData;
  report._queryId = event.params._queryId;
  //Unix Timestamp of reporting event
  report._time = event.params._time;
  //Value that reporter responded to queryData with
  report._value = event.params._value;
  //Reporter address
  report._reporter = event.params._reporter;
  report.txnHash = event.transaction.hash;

  report.save()
  // Note: If a handler doesn't require existing field values, it is faster
  // _not_ to load the entity from the store. Instead, create it fresh with
  // `new Entity(...)`, set the fields that should be updated and save the
  // entity back to the store. Fields that were not set or unset remain
  // unchanged, allowing for partial updates to be applied.

  // It is also possible to access smart contracts from mappings. For
  // example, the contract that has emitted the event can be connected to
  // with:
  //
  // let contract = Contract.bind(event.address)
  //
  // The following functions can then be called on this contract to access
  // state variables and other data:
  //
  // - contract.getBlockNumberByTimestamp(...)
  // - contract.getCurrentReward(...)
  // - contract.getCurrentValue(...)
  // - contract.getReportTimestampByIndex(...)
  // - contract.getReporterByTimestamp(...)
  // - contract.getReporterLastTimestamp(...)
  // - contract.getReportingLock(...)
  // - contract.getReportsSubmittedByAddress(...)
  // - contract.getTimeBasedReward(...)
  // - contract.getTimeOfLastNewValue(...)
  // - contract.getTimestampCountById(...)
  // - contract.getTimestampIndexByTimestamp(...)
  // - contract.getTipsById(...)
  // - contract.getTipsByUser(...)
  // - contract.getValueByTimestamp(...)
  // - contract.reportingLock(...)
  // - contract.timeBasedReward(...)
  // - contract.timeOfLastNewValue(...)
  // - contract.tips(...)
  // - contract.tipsInContract(...)
  // - contract.verify(...)
}

export function handleReportingLockChanged(event: ReportingLockChanged): void {}

export function handleTimeBasedRewardsChanged(
  event: TimeBasedRewardsChanged
): void {}

export function handleTipAdded(event: TipAdded): void {}
